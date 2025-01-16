import { useState, useEffect } from "react"
import { getAllTopics } from "../../services/topicsService"
import { getUserById } from "../../services/userService"
import { createNewPost } from "../../services/postsService"
import { useNavigate } from "react-router-dom"

export const NewPost = ( {currentUser} ) => {
    const [newTitleEntry, setNewTitleEntry] = useState("")
    const [newBodyEntry, setNewBodyEntry] = useState("")
    const [topicSelection, setTopicSelection] = useState()
    const [user, setUser] = useState()
    const [allTopics, setAllTopics] = useState([])

    const navigateToMyFavoritePosts = useNavigate()

    useEffect(() => {
        getAllTopics().then((topicsArray) => {
            setAllTopics(topicsArray)
        })
        getUserById(currentUser?.id).then((userData) => {
            setUser(userData)
        })    
    },[currentUser])

    const handleTopicChangeEvent = (event) => {
        setTopicSelection(event.target.value)
    }
    const handleNewPostSave = (event) => {
        if(newTitleEntry !== "" && newBodyEntry !== "" && topicSelection > 0){
            event.preventDefault()
            const newPost = {
                title: newTitleEntry,
                userId: user.id,
                body: newBodyEntry,
                date: new Date(),
                topicId: topicSelection
            }
            createNewPost(newPost).then(() => {
                navigateToMyFavoritePosts('/myposts')
            })
        } else {
            console.log("Not all required fields are completed.")
        }
       
    }
 
    if(!user){
        return null
    }

    return <>
        <form className="new=post">
            <h2>Create a New Post</h2>
            <fieldset>
                <div className="form-group">
                    <label>Topic: </label>
                    <select onChange={handleTopicChangeEvent} required>
                        <option value="">Select Topic</option>
                            {allTopics.map(topicObj => {
                                return (
                        <option value={topicObj.id} key={topicObj.id}>{topicObj.name}</option>
                    )
                })}
            </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label>Title: </label>
                    <input
                        type="text"
                        value={newTitleEntry}
                        onChange={(event) => {
                            setNewTitleEntry(event.target.value)
                        }}
                        required
                        className="form-control"
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label>Body: </label>
                    <input
                        type="text"
                        value={newBodyEntry}
                        onChange={(event) => {
                            setNewBodyEntry(event.target.value)
                        }}
                        required
                        className="form-control"
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <button 
                        className="form-btn btn-primary"
                        onClick={handleNewPostSave}
                    >Save New Post</button>

                </div>
            </fieldset>
        </form>
    </>
}