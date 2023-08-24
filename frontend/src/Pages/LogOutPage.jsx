
import { useNavigate } from "react-router-dom"
import Navbar from "../components/Navbar"
import { fetchTopics, fetchPosts, createPost, logOutUser } from "../components/api"
import { useState, useEffect } from "react";
import { useUser } from "../components/usercontext";

export default function LogOutPage(){
    const { user, setUser } = useUser();

    const [topics, setTopics] = useState([]);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const logOut = async (e) => {
      // e.preventDefault();
      let response = await logOutUser();
      console.log(response)
      setUser(null);
      console.log(user)
    };
  
    useEffect(() => {
      logOut();
    }, []);

    return(
    <div style={{ marginTop: '50px' }}>
      <Navbar/>
      <h1 style={{marginLeft:'100px', marginTop:'50px'}}>Welcome to the Forum</h1>
      <div style={{textAlign: 'left', marginLeft:'100px', marginRight:'100px',marginTop:'20px'}}>
        <p>This is a forum for whatever, here's a nice wall of text for you to look at. I could use lorem ipsum but i don't feel like googling it and copying and pasting. i just now remembered that if you type ipsum and tab it then it will auto generate some lorem ipsum but... whatever. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eius deserunt nihil laudantium reiciendis necessitatibus. Facere distinctio, sed fuga adipisci laboriosam, beatae maiores quam voluptatum provident autem in quis. Aut, blanditiis!</p>
      </div>
      <div className="main-post" style={{backgroundColor:'grey'}}>
        <h1 className="main-post inside-main-post">Logged out.</h1>
      </div>
    </div>
    )
}