import { Navbar } from "../components/navbar/Navbar"
import { PostsList } from "../components/Posts/PostsList"
import { Routes, Route, Outlet } from "react-router-dom"
import { useState, useEffect } from "react"
import { PostDetails } from "../components/Posts/PostDetails"
import { NewPost } from "../components/Posts/NewPost"
import { MyPosts } from "../components/Posts/MyPosts"

export const ApplicationViews = () => {
    const [currentUser, setCurrentUser] = useState()

    useEffect(() => {
        const localLearningUser = localStorage.getItem("learning_user")
        const learningUserObj = JSON.parse(localLearningUser)
        setCurrentUser(learningUserObj)
    },[])

    return <>
        <Routes>
            <Route 
                path="/"
                element={
                    <>
                        <Navbar />
                        <Outlet />                 
                    </>
                }
            >
                <Route index element={<PostsList currentUser={currentUser} />}/>
                <Route path="/posts/:currentPostId" element={<PostDetails currentUser={currentUser}/>}/>
                <Route path="/newpost" element={<NewPost currentUser={currentUser} />}/>
                <Route path="/allposts" element={<PostsList />}/>
                <Route path="/myposts" element={<MyPosts currentUser={currentUser}/>}/>
            </Route>
        </Routes>
    </>
}