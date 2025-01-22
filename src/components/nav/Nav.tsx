import AuthService from "@/services/auth"
import { User } from "firebase/auth"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

const navContent = {
    main: [
        {
            title: 'Home',
            url: '/',
        },
        {
            title: 'About',
            url: '/about',
        },
        {
            title: 'Contact',
            url: '/contact',
        }
    ]
}

function Nav() {
    const [user, setUser] = useState<User | null>(null)

    const getUserNav = () => {
        if (user) return <Link key='Account' to='/account'>Account</Link>

        return (
            <>
                <Link key='Log in' to='/login'>Log in</Link>
                <Link key='Create Account' to='/create-account'>Create Account</Link>
            </>
        )
    }

    useEffect(() => {
        const fetchUser = async () => {
            const currentUser = await AuthService.getUser()
            console.log('currentUser :>> ', currentUser)
            setUser(currentUser)
        }

        fetchUser()
    }, [])
    return (
        <>
            <nav className="flex gap-4 p-4">
                {navContent.main.map(item => (
                    <Link key={item.title} to={item.url}>{item.title}</Link>
                ))}

                { getUserNav() }
            </nav>

        </>
    )
}

export default Nav