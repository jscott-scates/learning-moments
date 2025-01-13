import "./posts.css"

export const Post = ({post}) => {
    return (
        <div className="post">
            <div>
                <div className="post-info">{post.title}</div>
            </div>
                <div className="post-info">
                    <div>Topic: {post.topic.name}</div>
                    <div>Likes: ### </div>
                </div>
        </div>
    )
}