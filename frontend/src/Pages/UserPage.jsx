import { Link,useSearchParams,useParams, useNavigate } from "react-router-dom"
import Navbar from "../components/Navbar"
import { fetchTopics, fetchPosts, createPost, fetchUserPrivate, fetchUserToken } from "../components/api"
import { useState, useEffect } from "react";
import Topic from "../components/topic";
import { useUser } from "../components/usercontext";
import Bio from "../components/bio";


export default function UserPage(){
  const { user, setUser } = useUser();
  const [searchParams, setSearchParams] = useSearchParams()
  const [userDataLoaded,setUserDataLoaded] = useState(false)
  const [userData,setUserData] = useState({});
  const { user_id } = useParams();
  const navigate = useNavigate();


  async function loadCurrentUser(id=null){
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

  async function loadUser(id){
    if(!userData?.id && !user_id){
      try{
        const userData = await fetchUserToken();
        setUserData(userData);
        console.log("User data:",userData)
      } catch (error) {
        console.log("Failed to retrieve the user data:", error.response.status)
      }
    } else{
      try{
        const userData = await fetchUserPrivate(id);
        setUserData(userData);
        console.log("User data:",userData)
      } catch (error) {
        if(error.includes("token is null")){
          alert("You must be signed in to view a profile.")
          navigate("/login/");          
        }else{
          console.log("Failed to retrieve the user data:", error.response.status)
        }
      }
    }
  }

  useEffect(() => {
    loadCurrentUser();
  }, [user]);

  useEffect(() => {
    loadUser(user_id);
  }, []);

  return(
    <div style={{ marginTop: '50px' }}>
      <Navbar/>
      <h1 style={{marginLeft:'100px', marginTop:'50px'}}>Welcome to the Forum</h1>
      <div style={{textAlign: 'left', marginLeft:'100px', marginRight:'100px',marginTop:'20px'}}>
        <p>This is a forum for whatever, here's a nice wall of text for you to look at. I could use lorem ipsum but i don't feel like googling it and copying and pasting. i just now remembered that if you type ipsum and tab it then it will auto generate some lorem ipsum but... whatever. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eius deserunt nihil laudantium reiciendis necessitatibus. Facere distinctio, sed fuga adipisci laboriosam, beatae maiores quam voluptatum provident autem in quis. Aut, blanditiis!</p>
      </div>
      <h2 style={{textAlign: 'center'}}>{userData.display_name}'s profile!</h2>
      {userData?.id ? (
                <Bio post={{title:userData.display_name,date_created:userData.date_joined,content:userData.bio}} profile_picture={userData.profile_picture} id={userData.id} display_name={userData.display_name}/>
            ) : (
                <p>Loading...</p>
      )}
    </div>
  )
}