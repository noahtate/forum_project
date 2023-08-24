import { Link, useParams, useSearchParams } from "react-router-dom"
import Navbar from "../components/Navbar"
import { fetchTopics, fetchPosts, fetchReplies, createPost, fetchUser } from "../components/api"
import { useState, useEffect } from "react";
import Reply from "../components/reply";
import MainPost from "../components/mainpost";
import { useUser } from "../components/usercontext";
import NewReply from "../components/newreply";

export default function PostPage(){
    const { user, setUser } = useUser();
    const [replies, setReplies] = useState([]);
    const [userDataLoaded,setUserDataLoaded] = useState(false)
    const [userData,setUserData] = useState({});
    const [repliesLoading, setRepliesLoading] = useState(false);
    const [repliesLoaded, setRepliesLoaded] = useState(false);
    const [searchParamsChanged, setSearchParamsChanged] = useState(false);
    const [pages, setPages] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const { topic_id, post_id } = useParams();
    let currentPage = "1";
    // useEffect to load the posts under the topic id.

    function generatePageNums() {
      const maxElements = 5; // Number of page links to display
      const currentPage = Number(searchParams.get("page"));
    
      // Calculate the range of pages to display on each side of the current page
      let leftRange = Math.floor(maxElements / 2);
      let rightRange = maxElements - leftRange - 1;
    
      // Calculate the starting page for the paginator
      let startPage = currentPage - leftRange;
      if (startPage < 1) {
        startPage = 1;
      }
    
      // Calculate the ending page for the paginator
      let endPage = currentPage + rightRange;
      if (endPage > replies.total_pages) {
        endPage = replies.total_pages;
      }
    
      // Adjust the starting and ending pages if necessary to maintain maxElements
      if (endPage - startPage + 1 < maxElements) {
        if (endPage === replies.total_pages) {
          startPage = Math.max(1, endPage - maxElements + 1);
        } else if (startPage === 1) {
          endPage = Math.min(replies.total_pages, startPage + maxElements - 1);
        }
      }
    
      let listOfPageNumbers = [];
      for (let iterator = startPage; iterator <= endPage; iterator++) {
        listOfPageNumbers.push(iterator);
      }
      return listOfPageNumbers;
    }
    
//fires an api call to the backend to get the replies to the post using the post id
    async function loadReplies() {
      try {
        if(String(searchParams).includes("page")){
          const repliesData = await fetchReplies(topic_id,post_id,"?"+searchParams);
          console.log(`awaiting fetchreplies for topics/${topic_id}/${post_id}`)
          setReplies(repliesData);
          console.log(`setreplies with :${repliesData}`)
        }else{
          const repliesData = await fetchReplies(topic_id,post_id);
          console.log(`awaiting fetchreplies for topics/${topic_id}/${post_id}`)
          setReplies(repliesData);
          console.log(`setreplies with :${repliesData}`)
        }
        
      } catch (error) {
        // Handle error
        console.log("Failed to fetchreplies:",error)
      }
    }
//loads the user data for the poster in the same way.
    async function loadUser(user_id){
      try{
        const userData = await fetchUser(user_id);
        setUserData(userData);
      } catch (error) {
        console.log("Failed to retrieve the user data:", error)
      }
    }

    // async function loadMainPost(topic_id) {
    //   try {
    //     const postsData = await fetchPosts(topic_id);
    //     console.log(`awaiting fetchposts for ${topic_id}`)
    //     setPosts(postsData);
    //     console.log(`setPosts with :${postsData}`)
    //   } catch (error) {
    //     // Handle error
    //     console.log("Failed to fetch posts:",error)
    //   }
    // }

    useEffect(() => {
      if(repliesLoaded === false){
        console.log("entering first if")
        loadReplies();
        setRepliesLoading(true);
      }
      if(repliesLoading && replies.data){
        console.log("entering second if")
        console.log("should be loaded...",replies.data)
        setRepliesLoaded(true)
        setRepliesLoading(false)
      }
      if(searchParamsChanged){
        console.log("entering third if")
        console.log("***********************************************************old replies:",replies)
        loadReplies();
        setSearchParamsChanged(false);
        setRepliesLoaded(false);
        setRepliesLoading(true);
      }
      if(repliesLoaded){
        loadUser(replies.post.created_by)
        console.log("replies loaded.",replies)
      }
      setPages(generatePageNums());
      console.log("page list",pages)
      console.log("userData",userData)
      // console.log("LOADED. replies:a",replies);
    }, [replies,searchParams]);

    useEffect(() => {
      currentPage = searchParams.get("page")
      if(repliesLoaded){
        if(userData.length == 0){
          if(repliesLoaded){
            loadUser(replies.post.created_by)
          }
        }else{
          console.log("hi",userData);
          setUserDataLoaded(true);
        }
      }
      
    }, [userData]);

    return(
    <div style={{ marginTop: '50px' }}>
      <Navbar/>
      <h1 style={{marginLeft:'100px', marginTop:'50px'}}>Welcome to the Forum</h1>
      <h2 style={{textAlign: 'center'}}>POST: {post_id}</h2>

      {userData?.id && userDataLoaded && repliesLoaded ? (
                <MainPost post={replies.post} profile_picture={userData.profile_picture} id={userData.id} display_name={userData.display_name}/>
            ) : (
                <p>Loading...</p>
            )}
      
      {repliesLoaded  &&
      <ul style={{listStyle:'none',marginLeft:'0px'}}>
        {console.log("replies: ",replies)}
        {replies.data.map(reply => (
          <li 
          key={reply.id} 
          style={{
            maxWidth: '50vw',
            fontSize: 'xx-large',
            padding: '25px',
            margin: 'auto',
            border: 'solid black 2px',
            backgroundColor: 'tan',
          }}>
            <Reply reply={reply}/>
          </li>
        ))}
        <NewReply props={{post_id, topic_id, currentPage}}/>
      </ul>}
      {/* VVVVVVVVVVVVVVVVVVVVVV pagination VVVVVVVVVVVVV */}
      <div style={{ display: 'flex', justifyContent: 'center' }} class="pagination">
          <ul>
              <li className={searchParams.get("page") == 1 ? 'disabled' : 'active'}><Link onClick={() => setSearchParamsChanged(true)} to={searchParams.get("page") > 1 ? `?page=${searchParams.get("page") - 1}` : `?page=${searchParams.get("page")}`}>Prev</Link></li>
              {pages.map(page => (
                <li 
                key={page}>
                  <Link style={searchParams.get("page") === String(page) ? {color: '#999999', backgroundColor:"yellow"} : {}} onClick={() => setSearchParamsChanged(true)} to={`?page=${page}`}>{page}</Link>
                </li> 
              ))}
              <li className={Number(searchParams.get("page")) + 1 > replies.total_pages ? 'disabled' : 'active'}><Link onClick={() => setSearchParamsChanged(true)} to={searchParams.get("page") >= replies.total_pages ? `?page=${searchParams.get("page")}` : `?page=${String(Number(searchParams.get("page")) + 1)}`}>Next</Link></li>
          </ul>
      </div>
    </div>
    )
}