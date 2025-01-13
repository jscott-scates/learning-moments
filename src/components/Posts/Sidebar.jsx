import { getAllTopics } from "../../services/topicsService"
import {useState, useEffect} from "react"

export const Sidebar = ({setSearchTerm, setSearchTopic}) => {
    const [topics, setTopics] = useState([])

    useEffect(()=> {
        getAllTopics().then((topicsArray) => {
            setTopics(topicsArray)
        })
    },[])
   
    const handleSearchTopicChangeEvent = (event) => {
        setSearchTopic(event.target.value)
    }

    return (
        <div className="searchbar">
            <select onChange={handleSearchTopicChangeEvent}>
                <option value="">Search by Topic</option>
                {topics.map(topicObj => {
                    return (
                        <option value={topicObj.name} key={topicObj.id}>{topicObj.name}</option>
                    )
                })}
            </select>
            <input 
                type="text"
                placeholder="Search Posts"
                className="post-search"
                onChange={(event) => setSearchTerm(event.target.value)}
            />
        </div>
    )
}