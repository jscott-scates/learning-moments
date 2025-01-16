import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { getPostById } from "../../services/postsService"
import { getUserById } from "../../services/userService"
import { createUserLikeEntry, deleteUserLike, getAllUserLikes } from "../../services/likesService"


export const PostDetails = ({ currentUser }) => {
    const [post, setPost] = useState([])  //creates a useState to set the post to the selected post.
    const [user, setUser] = useState()  //creates a useState to set the user to the currently active user.
    const [allUserLikes, setAllUserLikes] = useState([])    //creates a useState to set all user likes array
    const [filteredLikes, setFilteredLikes] = useState([])  //creates a useState to set the filteredUserLikes.
    const { currentPostId } = useParams()         //uses the params set in the ApplicationView module for the PostDetails to pass in the postId

    const fetchAndSet = () => {
        getPostById(currentPostId).then((postDataArray) => {
            setPost(postDataArray)
        })
        getUserById(currentUser.id).then((userData) => {
            setUser(userData)
        })
        getAllUserLikes().then((postLikes => {
            setAllUserLikes(postLikes)
        }))
    }

    //Following the initial render, getsPostById and getsUserById and sets each respectively.
    useEffect(() => {
        if (currentUser) {
            console.log(currentUser)
            fetchAndSet()
        }

    }, [currentUser])

    useEffect(() => {
        if (allUserLikes.length > 0) {
            const postLikes = allUserLikes.filter(userLike => userLike.postId === Number(currentPostId))
            setFilteredLikes(postLikes)
        }
    }, [allUserLikes, currentPostId])

    const handleLike = async () => {
        const userLikeEntry = {
            userId: user.id,
            postId: post.id
        }
        console.log("clicked")
        await createUserLikeEntry(userLikeEntry);
        fetchAndSet()
    }

    const handleUnlike = () => {
        const findUserLike = filteredLikes.find((userLike) => userLike.userId === user.id)
        deleteUserLike(findUserLike.id)
        fetchAndSet()
    }
    

    const didUserLikePost = () => {
        const userLikePost = filteredLikes.filter(userLike => userLike.userId === user.id)
        return userLikePost.length
    }

    if(!user){
        return null
    }

    return <>
        <article className="post">
            <header className="post-header">
                {post.title}
            </header>
            <section className="post-details">
                <div>
                    <span className="post-info">Author: </span>
                    {post.user?.fullName}
                    <span className="post-info">Topic: </span>
                    {post.topic?.name}
                </div>
            </section>
            <section className="post-body">
                {post.body}
            </section>
            <footer className="post-footer">
                Likes {filteredLikes.length}
                {post.date}
                <div className="btn-container">
                    {user.id !== post.userId && (
                     <>
                     { !didUserLikePost() && <button onClick={handleLike}>Like Post</button>}
                     { !!didUserLikePost() && <button onClick={handleUnlike}>Unlike Post</button>}  {/* Casting Not, Not as a boolean */}
                     </> 
                    )}
                    {user.id === post.userId && <button>Edit Post</button>}
                </div>
            </footer>
        </article>
    </>

}



