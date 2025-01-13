import { getAllPosts } from "../../services/postsService";
import { useState, useEffect } from "react"
import { Post } from "./post"
import { Sidebar } from "./Sidebar"

export const PostsList = () => {
    const [allPosts, setAllPosts] = useState([]);
    const [searchTopic, setSearchTopic] = useState([])
    const [allFilteredPosts, setFilteredPosts] = useState([])
    const [searchTerm, setSearchTerm] = useState("")

    const fetchAndSetPostData = () => {
        getAllPosts().then((postsArray) => {
            setAllPosts(postsArray)
            setFilteredPosts(postsArray)
    })}
console.log(allPosts)
    //Runs after the initial render and executes the fetchAndSetPostData function to setAllPosts and setFilteredPosts to the postsArray
    useEffect(() => {
        fetchAndSetPostData()
        },[]);
    
    //Runs when a search term is entered into the search bar to find posts with similar post titles
    useEffect(() => {
        const foundPosts = allPosts.filter(post => post.title.toLowerCase().includes(searchTerm.toLowerCase()))
        setFilteredPosts(foundPosts)
    },[searchTerm, allPosts])
   
    //Runs when a search topic is selected from the dropdown bar to update searchTopic to the selected topic.
    useEffect(() => {
        if(searchTopic.length !== 0){
            const foundPostBySearchTopic = allPosts.filter(post => post.topic.name === searchTopic)
            setFilteredPosts(foundPostBySearchTopic)
        } else { 
            setFilteredPosts(allPosts)
        }
        
    
        
    },[searchTopic, allPosts])

    return <>
        <h1>All Posts</h1>
        <Sidebar setSearchTerm={setSearchTerm} setSearchTopic={setSearchTopic} />
        <div className="posts">
            {allFilteredPosts.map((postObj => {
                return (
                    <Post post={postObj} key={postObj.id}/>
                )
            }))}
        </div>
    </>
}