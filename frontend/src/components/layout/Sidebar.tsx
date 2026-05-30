import { NavLink } from "react-router-dom";

function Sidebar() {
    return (
        <aside className="app-sidebar">
            <nav>
                <NavLink to="/">Dashboard</NavLink>
                <NavLink to="/tasks">Tasks</NavLink>
                <NavLink to="/projects">Projects</NavLink>
                <NavLink to="/login">Login</NavLink>
            </nav>
        </aside>
    );
}

export default Sidebar;