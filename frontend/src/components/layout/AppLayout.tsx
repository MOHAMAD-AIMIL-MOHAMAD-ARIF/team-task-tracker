import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

function AppLayout() {
    return (
        <div className="app-shell">
            <Header />

            <div className="app-body">
                <Sidebar />

                <main className="app-main">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

export default AppLayout;