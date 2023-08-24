import { useNavigate } from "react-router-dom"
import Navbar from "../components/Navbar"
import { fetchTopics, fetchPosts, createPost, createUser } from "../components/api"
import { useState, useEffect } from "react";
import Topic from "../components/topic";

import { useUser } from "../components/usercontext";

export default function LoginPage(){
    const { user, setUser } = useUser();

    const [topics, setTopics] = useState([]);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [firstName, setFirstName] = useState("");
    const navigate = useNavigate();

    const signUp = async (e) => {
        e.preventDefault();
        let response = await createUser({"display_name":displayName,email, password});
        console.log("response in signup:",response);
        let token = response.token;
        let user = response.display_name;
        let user_id = response.user_id
        console.log(token)
        localStorage.setItem("token", token);
        setUser({"user":user, "user_id":user_id});
        navigate("/home/");
    };

    // useEffect(() => {
    //   async function loadTopics() {
    //     try {
    //       const topicsData = await fetchTopics();
    //       setTopics(topicsData);
    //     } catch (error) {
    //       // Handle error
    //     }
    //   }
  
    //   loadTopics();
    // }, []);

    return(
    <div style={{ marginTop: '50px' }}>
      <Navbar/>
      <h1 style={{marginLeft:'100px', marginTop:'50px'}}>Welcome to the Forum</h1>
      <div style={{textAlign: 'left', marginLeft:'100px', marginRight:'100px',marginTop:'20px'}}>
        <p>This is a forum for whatever, here's a nice wall of text for you to look at. I could use lorem ipsum but i don't feel like googling it and copying and pasting. i just now remembered that if you type ipsum and tab it then it will auto generate some lorem ipsum but... whatever. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eius deserunt nihil laudantium reiciendis necessitatibus. Facere distinctio, sed fuga adipisci laboriosam, beatae maiores quam voluptatum provident autem in quis. Aut, blanditiis!</p>
      </div>
      <div className="main-post" style={{backgroundColor:'grey'}}>
            <form className="main-post inside-main-post" style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
                <h3>Signup:</h3>
                <input
                style={{ margin: '5px' }}
                placeholder="first name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                />
                <input
                style={{ margin: '5px' }}
                placeholder="display name"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                required
                />           
                <input
                style={{ margin: '5px' }}
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                />
     

                <input
                style={{ margin: '5px' }}
                placeholder="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                />

                <button onClick={signUp} style={{maxWidth:'70px'}}>Submit</button>
            </form>
      </div>
    </div>
    )
}