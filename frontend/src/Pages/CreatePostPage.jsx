import { useNavigate } from "react-router-dom"
import Navbar from "../components/Navbar"
import { fetchTopics, fetchPosts, createPost, logInUser } from "../components/api"
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom"


import { useUser } from "../components/usercontext";
import NewPost from "../components/newpost";

export default function CreatePostPage(){
    const { user, setUser } = useUser();
    const {topic_id} = useParams();
    const [topics, setTopics] = useState([]);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const logIn = async (e) => {
        e.preventDefault();
        let response = await logInUser({email, password});
        console.log("response in login:",response);
        let token = response.token;
        let user = response.display_name;
        let user_id = response.user_id
        console.log(token)
        localStorage.setItem("token", token);
        setUser({"user":user, "user_id":user_id});
        navigate("/home/");
    };

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
    }, []);

    return(
    <div style={{ marginTop: '50px' }}>
      <Navbar/>
      <h1 style={{marginLeft:'100px', marginTop:'50px'}}>Welcome to the Forum</h1>
      <div style={{textAlign: 'left', marginLeft:'100px', marginRight:'100px',marginTop:'20px'}}>
        <p>This is a forum for whatever, here's a nice wall of text for you to look at. I could use lorem ipsum but i don't feel like googling it and copying and pasting. i just now remembered that if you type ipsum and tab it then it will auto generate some lorem ipsum but... whatever. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eius deserunt nihil laudantium reiciendis necessitatibus. Facere distinctio, sed fuga adipisci laboriosam, beatae maiores quam voluptatum provident autem in quis. Aut, blanditiis!</p>
      </div>
      <NewPost props = {topic_id}/>
      {/* <div className="main-post" style={{backgroundColor:'grey'}}>
            <form className="main-post inside-main-post" style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
                <h3>log in:</h3>
                <input
                style={{ margin: '5px' }}
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />

                
                <button onClick={logIn} style={{maxWidth:'70px'}}>log in</button>
            </form>
      </div> */}
    </div>
    )
}