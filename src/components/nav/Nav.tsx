import { useAuthContext } from "@/services/auth/AuthContext"
import { Link } from "react-router-dom"

const navContent = {
    main: [
        { title: 'Home', url: '/' },
        { title: 'About', url: '/about' },
        { title: 'Contact', url: '/contact' }
    ]
}

function Nav() {
    const { user, signOut } = useAuthContext()
    const handleClickSignOut = async () => { await signOut() }

    const getUserNav = () => {
        if (user) return (
            <>
                <Link key='Dashboard' to='/dashboard'>Dashboard</Link>
                <button className='btn' onClick={handleClickSignOut}>Sign out</button>
            </>
        )

        return (
            <>
                <Link key='Log in' to='/login'>Log in</Link>
                <Link key='Create Account' to='/create-account'>Create Account</Link>
            </>
        )
    }

    return (
        <>
            <nav className="flex gap-4 p-4 items-center">
                {navContent.main.map(item => (
                    <Link key={item.title} to={item.url}>{item.title}</Link>
                ))}

                {/* additional navs based on whether there is a user logged in */}
                { getUserNav() }
            </nav>

        </>
    )
}

export default Nav