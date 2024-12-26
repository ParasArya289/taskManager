import axios from "axios";
import { useAuth } from "../Context/authContext";
import { useEffect, useState } from "react";
import TaskCard from "../Components/Task/TaskCard";
function Dashboard() {
  const { token } = useAuth();
  const [loading, setLoading] = useState(false);
  const [tasks, setTasks] = useState([]);
  const fetchUserTasks = async (token) => {
    try {
      setLoading(true);
      const res = await axios.get(
        "https://taskmanager-7vum.onrender.com/tasksforuser",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTasks(res.data);
      console.log(res.data);
    } catch (error) {
      console.error("Error:", error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchUserTasks(token);
  }, []);
  return (
    <div>
      {loading && <div>Loading...</div>}
      {!tasks.length && <div>No Tasks Assigned</div>}
      {tasks.map((task) => (
        <TaskCard task={task} key={task.id} />
      ))}
    </div>
  );
}
export default Dashboard;
