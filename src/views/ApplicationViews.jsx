import { Navbar } from "../components/navbar/Navbar"
import { PostsList } from "../components/Posts/PostsList"
import { Routes, Route, Outlet } from "react-router-dom"
import { useState, useEffect } from "react"
import { PostDetails } from "../components/Posts/PostDetails"
import { NewPost } from "../components/Posts/NewPost"

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
                <Route index element={<PostsList />}/>
                <Route path="/posts/:currentPostId" element={<PostDetails currentUser={currentUser}/>}/>
                <Route path="/newpost" element={<NewPost />}/>
                <Route path="/allposts" element={<PostsList />}/>
            </Route>
        </Routes>
    </>
}