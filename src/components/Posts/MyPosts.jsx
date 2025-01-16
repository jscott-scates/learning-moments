import { useState, useEffect } from "react"
import { getAllPosts } from "../../services/postsService"
import { getUserById } from "../../services/userService"
import { Link } from "react-router-dom"
import { UserPost } from "./UserPost"


export const MyPosts = ({ currentUser }) => {
    const [allPosts, setAllPosts] = useState([])
    const [filteredPosts, setFilteredPosts] = useState([])
    const [user, setUser] = useState()

    useEffect(() => {
        getAllPosts().then((postsArray) => {
            setAllPosts(postsArray)
        })
        if (currentUser) {
            getUserById(currentUser?.id).then((userData) => {
                setUser(userData)
            })
        }

    }, [currentUser])

    useEffect(() => {
        const foundUserPosts = allPosts.filter(post => post.user?.id === user?.id)
        setFilteredPosts(foundUserPosts)
    }, [allPosts, user])

    return <>
        <h1>My Posts</h1>
        <div className="posts">
            {filteredPosts.map((postObj => {
                return (
                    <Link to={`/posts/${postObj.id}`} key={postObj.id}>
                        <UserPost post={postObj} />
                    </Link>
                )
            }))}
        </div>
    </>
}