import { Link } from "react-router-dom"
import Navbar from "../components/Navbar"
import { fetchTopics, fetchPosts, fetchUserPrivate, fetchUserToken, createPost } from "../components/api"
import { useState, useEffect } from "react";
import Topic from "../components/topic";
import { useUser } from "../components/usercontext";

export default function HomePage(){
    const { user, setUser } = useUser();
    const [topics, setTopics] = useState([]);
   
    async function loadUser(id=null){
      if(user==null){
        try{
          const userData = await fetchUserToken();
          setUser({"user":userData.display_name, "user_id":userData.id});
          console.log("User data:",userData)
        } catch (error) {
          console.log("Failed to retrieve the user data:", error)
        }
      }
    }

    useEffect(() => {
      async function loadTopics() {
        try {
          const topicsData = await fetchTopics();
          setTopics(topicsData);
        } catch (error) {
          // Handle error
        }
      }
      loadTopics();
      loadUser();
    }, [user]);

    return(
    <div style={{ marginTop: '50px' }}>
      <Navbar/>

      <h1 style={{marginLeft:'100px', marginTop:'50px'}}>Welcome to the Forum</h1>
      <h4 style={{textAlign:'right' ,marginRight:'100px', marginTop:'50px'}}>welcome {user ? `${user.user}`: "guest"}</h4>
      <div style={{textAlign: 'left', marginLeft:'100px', marginRight:'100px',marginTop:'20px'}}>
        <p>This is a forum for whatever, here's a nice wall of text for you to look at. I could use lorem ipsum but i don't feel like googling it and copying and pasting. i just now remembered that if you type ipsum and tab it then it will auto generate some lorem ipsum but... whatever. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eius deserunt nihil laudantium reiciendis necessitatibus. Facere distinctio, sed fuga adipisci laboriosam, beatae maiores quam voluptatum provident autem in quis. Aut, blanditiis!</p>
      </div>
      <div className="main-post" style={{backgroundColor:'grey'}}>
          <h2 style={{textAlign: 'center'}}>Topics</h2>
          <ul style={{listStyle:'none',marginLeft:'0px'}}>
            {topics.map(topic => (
              <li 
              key={topic.id} 
              style={{
                maxWidth: '50vw',
                fontSize: 'xx-large',
                padding: '25px',
                margin: 'auto',
                border: 'solid black 2px',
                backgroundColor: 'tan',
              }}>
                <Topic topic={topic}/>
                {/* <Link   to={`topics/${topic.id}`}>{topic.title}</Link>
                <span style={{ marginRight: '20px' }}> post count:{topic.num_posts}</span> */}
              </li>
              // <li key={topic.id}>{topic.title}</li>
            ))}
          </ul>
            {/* <button>
                <Link to="/example">To the example</Link>
            </button> */}
        </div>
    </div>
    )
}