import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import "./navbar.css"

export const Navbar = () => {
    const navigate = useNavigate()

    return <ul className="navbar">
        <li className="navbar-item">
            <Link to="/allposts">All Posts</Link>
        </li>
        <li className="navbar-item">
            <Link to="/myposts">My Posts</Link>
        </li>
        <li className="navbar-item">
            <Link to="tbd">Favorites</Link>
        </li>
        <li className="navbar-item">
            <Link to="/newpost">New Post</Link>
        </li>
        <li className="navbar-item">
            <Link to="tbd">Profile</Link>
        </li>
        {localStorage.getItem("learning_user") ? (
        <li>
            <Link
                to=""
                onClick={() => {
                    localStorage.removeItem("learning_user")
                    navigate("/login", { replace: true })
                }}
            >
            Logout
            </Link>
        </li>
        ) : (
        ""
        )}
    </ul>
}