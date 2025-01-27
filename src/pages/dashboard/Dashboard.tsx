import { useAuthContext } from "@/services/auth/AuthContext"

function Dashboard() {
    const { user } = useAuthContext()
    
    return (
        <>
            <h1>Dashboard</h1>
            {user?.displayName ? <h3>Welcome { user?.displayName }</h3> : '' }
            <p>{user?.email}</p>
        </>
    )
}

export default Dashboard