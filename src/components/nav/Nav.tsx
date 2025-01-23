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
    // TODO: make user a context to share state across the app
    const [user, setUser] = useState<User | null>(null)

    const handleClickSignOut = () => {
        AuthService.signOut()
        setUser(null)
    }


    const getUserNav = () => {
        console.log('getUserNav :>> ')
        if (user) return (
            <>
                <Link key='Account' to='/account'>Account</Link>
                <button className='btn' onClick={handleClickSignOut}>Sign out</button>
            </>
        )

        return (
            <>
                <Link key='Log in' to='/login'>Log in</Link>
                {/* TODO: Create Account Page */}
                <Link key='Create Account' to='/create-account'>Create Account</Link>
            </>
        )
    }

    useEffect(() => {
        const fetchUser = async () => {
            const currentUser = await AuthService.getUser()
            setUser(currentUser)
        }

        fetchUser()
    }, [])
    return (
        <>
            <nav className="flex gap-4 p-4 items-center">
                {navContent.main.map(item => (
                    <Link key={item.title} to={item.url}>{item.title}</Link>
                ))}

                { getUserNav() }
            </nav>

        </>
    )
}

export default Nav