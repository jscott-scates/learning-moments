export const getAllUserLikes = () => {
    return fetch(`http://localhost:8088/userLikes`).then(res => res.json())
}

export const createUserLikeEntry = (newEntry) => {
    return fetch(`http://localhost:8088/userLikes`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newEntry)
    }).then((res) => res.json())
}

export const deleteUserLike = (userLikeId) => {
    return fetch(`http://localhost:8088/userLikes/${userLikeId}`,{
        method: "DELETE"
    }).then((res) => res.json())
}