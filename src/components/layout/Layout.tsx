import Nav from "@/components/nav/Nav"
import { Outlet } from "react-router-dom"

function Layout() {
    return (
        <div className="h-max">
            <Nav />
            <Outlet />
        </div>
    )
}

export default Layout