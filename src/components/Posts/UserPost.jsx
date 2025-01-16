import { deletePost, getPostById } from "../../services/postsService"
import "./posts.css"
import { useState, useEffect } from "react"

export const UserPost = ({post}) => {
    const [currentPost, setPost] = useState({})

    const fetchAndSet = () => {
        getPostById(post.id).then((postDataArray) => {
            setPost(postDataArray)
        })
    }
 
    useEffect(() => {
        fetchAndSet()
    },[])
 
    return (
        <div className="post">
            <div>
                <div className="post-info">{post.title}
                <button onClick={(event)=> {
                    event.preventDefault()
                    deletePost(post.id)
                    fetchAndSet()
                }}>Delete</button>
                </div>
                
            </div>
        </div>
    )
}