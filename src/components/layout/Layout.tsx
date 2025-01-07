import Nav from "@/components/nav/Nav"
import { Outlet } from "react-router-dom"

function Layout() {
    return (
        <>
            <Nav />
            <div className="content p-4">
                <Outlet />
            </div>
        </>
    )
}

export default Layout