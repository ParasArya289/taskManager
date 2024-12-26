import { NavLink } from "react-router-dom";

function Home() {
  return <div>
    <NavLink to={"/dashboard"}>Dashboard</NavLink>
  </div>;
}
export default Home;
