export const getAllPosts = () => {
    return fetch("http://localhost:8088/posts?_expand=user&_expand=topic").then(res => res.json())
}

export const getPostById = (postId) => {
    return fetch(`http://localhost:8088/posts/${postId}?_expand=user&_expand=topic`).then(res => res.json())
}

export const createNewPost = (newEntry) => {
    return fetch("http://localhost:8088/posts?_expand=user&_expand=topic", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newEntry)
    })
}