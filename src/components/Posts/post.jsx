import { getAllUserLikes } from "../../services/likesService"
import { getPostById } from "../../services/postsService"
import "./posts.css"
import { useState, useEffect } from "react"

export const Post = ({post}) => {
    const [currentPost, setPost] = useState({})
    const [allLikes, setAllLikes] = useState([])
    const [filteredLikes, setFilteredLikes] = useState([])
 
    useEffect(() => {
     getPostById(post.id).then((postDataArray) => {
         setPost(postDataArray)
     })
     getAllUserLikes().then((userLikesArray) => {
         setAllLikes(userLikesArray)
     })
    },[post])
 
    useEffect(() => {
     if (allLikes.length > 0) {
         const likes = allLikes.filter(like => like.postId === currentPost.id)
         setFilteredLikes(likes)
     } 
     },[allLikes,currentPost])
 
    return (
        <div className="post">
            <div>
                <div className="post-info">{post.title}</div>
            </div>
                <div className="post-info">
                    <div>Topic: {post.topic.name}</div>
                    <div>Likes: {filteredLikes.length} </div>
                </div>
        </div>
    )
}