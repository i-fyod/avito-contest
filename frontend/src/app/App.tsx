import "@mantine/core/styles.css";
import { Link, Outlet } from "react-router-dom";

export default function App() {
  return (
    <div>
      <nav>
        <Link to="/">Home</Link> | <Link to="/test">Test</Link>
      </nav>
      <Outlet />
    </div>
  );
}
