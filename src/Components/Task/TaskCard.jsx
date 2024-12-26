import styles from "../Task/TaskCard.module.css";
export default function TaskCard({ task }) {
  return (
    <div className={styles.task__container}>
      <h4>Goal:{task.goal}</h4>
      <p>
        Created At: <b>{task.createdDate}</b>
      </p>
      <p>
        Deadline At: <b>{task.deadlineDate}</b>
      </p>
    </div>
  );
}
