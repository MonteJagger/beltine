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
        },
        {
            title: 'Log in',
            url: '/login',
        },
        {
            title: 'Create Account',
            url: '/create-account'
        }
    ],
    secondary: [
        {
            title: 'Log in',
            url: '/login',
        }
    ]
}

function Nav() {

    return (
        <>
            <nav className="flex gap-4 p-4">
                {navContent.main.map((item, index) => (
                <Link key={index} to={item.url}>{item.title}</Link>
            ))}
            </nav>

        </>
    )
}

export default Nav