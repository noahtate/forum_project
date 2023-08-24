import { Link, useParams, useSearchParams } from "react-router-dom"
import Navbar from "../components/Navbar"
import { fetchTopics, fetchPosts, createPost } from "../components/api"
import { useState, useEffect } from "react";
import { useUser } from "../components/usercontext";
import Post from "../components/post";
import NewReply from "../components/newreply";

export default function TopicPage(){
    const { user, setUser } = useUser();
    const [posts, setPosts] = useState([]);
    const [postsLoading, setPostsLoading] = useState(false)
    const [postsLoaded, setPostsLoaded] = useState(false)
    const [searchParamsChanged, setSearchParamsChanged] = useState(false)
    const [pages, setPages] = useState([])
    const [searchParams, setSearchParams] = useSearchParams();
    const { topic_id, post_id } = useParams();
 
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
      if (endPage > posts.total_pages) {
        endPage = posts.total_pages;
      }
    
      // Adjust the starting and ending pages if necessary to maintain maxElements
      if (endPage - startPage + 1 < maxElements) {
        if (endPage === posts.total_pages) {
          startPage = Math.max(1, endPage - maxElements + 1);
        } else if (startPage === 1) {
          endPage = Math.min(posts.total_pages, startPage + maxElements - 1);
        }
      }
    
      let listOfPageNumbers = [];
      for (let iterator = startPage; iterator <= endPage; iterator++) {
        listOfPageNumbers.push(iterator);
      }
      return listOfPageNumbers;
    }
    

    async function loadPosts() {
      try {
        if(searchParams){
          const postsData = await fetchPosts(topic_id,"?"+searchParams);
          console.log(`awaiting fetchposts for ${topic_id}`)
          setPosts(postsData);
          console.log(`setPosts with :${postsData}`)
        }else{
          const postsData = await fetchPosts(topic_id);
          console.log(`awaiting fetchposts for ${topic_id}`)
          setPosts(postsData);
          console.log(`setPosts with :${postsData}`)
        }
        
      } catch (error) {
        // Handle error
        console.log("Failed to fetch posts:",error)
      }
    }
    useEffect(() => {
      if(postsLoaded === false){
        loadPosts();
        setPostsLoading(true);
      }
      if(postsLoading && posts.data){
        console.log("should be loaded...",posts.data)
        setPostsLoaded(true)
        setPostsLoading(false)
      }
      if(searchParamsChanged === true){
        loadPosts();
        setSearchParamsChanged(false);
        setPostsLoaded(false);
        setPostsLoading(true);
      }
      setPages(generatePageNums());
      console.log("page list",pages)
      console.log("LOADED. posts:",posts);
    }, [posts,searchParams]);

    return(
    <div style={{ marginTop: '50px' }}>
      <Navbar/>
      <h1 style={{marginLeft:'100px', marginTop:'50px'}}>Welcome to the Forum</h1>
      <div style={{textAlign: 'left', marginLeft:'100px', marginRight:'100px',marginTop:'20px'}}>
        <p>This is a forum for whatever, here's a nice wall of text for you to look at. I could use lorem ipsum but i don't feel like googling it and copying and pasting. i just now remembered that if you type ipsum and tab it then it will auto generate some lorem ipsum but... whatever. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eius deserunt nihil laudantium reiciendis necessitatibus. Facere distinctio, sed fuga adipisci laboriosam, beatae maiores quam voluptatum provident autem in quis. Aut, blanditiis!</p>
      </div>
      <div style={{display:"flex", alignContent: "flex-start", justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
        <h2 style={{textAlign: 'center'}}>Posts</h2>
        <button style={{margin:'10px'}}><Link to={`/${topic_id}/post/`}>Create Post</Link></button>
      </div>


      {postsLoaded  &&
        <ul style={{listStyle:'none',marginLeft:'0px'}}>
        {console.log("Posts: ",posts)}
        {posts.data.map(post => (
          <li className="main-post  "
          key={post.id} 
          style={{
            maxWidth: '50vw',
            fontSize: 'xx-large',
            padding: '25px',
            margin: 'auto',
          }}>
            <Post post={post}/>
          </li>
        ))}
      </ul>}

      {/* VVVVVVVVV pagination VVVV */}
      <div style={{ display: 'flex', justifyContent: 'center' }} class="pagination">
          <ul>
              <li className={searchParams.get("page") == 1 ? 'disabled' : 'active'}><Link onClick={() => setSearchParamsChanged(true)} to={searchParams.get("page") > 1 ? `?page=${searchParams.get("page") - 1}` : `?page=${searchParams.get("page")}`}>Prev</Link></li>
              {pages.map(page => (
                <li 
                key={page}>
                  <Link style={searchParams.get("page") === String(page) ? {color: '#999999', backgroundColor:"yellow"} : {}} onClick={() => setSearchParamsChanged(true)} to={`?page=${page}`}>{page}</Link>
                </li> 
              ))}
              <li className={Number(searchParams.get("page")) + 1 > posts.total_pages ? 'disabled' : 'active'}><Link onClick={() => setSearchParamsChanged(true)} to={searchParams.get("page") >= posts.total_pages ? `?page=${searchParams.get("page")}` : `?page=${String(Number(searchParams.get("page")) + 1)}`}>Next</Link></li>
          </ul>
      </div>
    </div>
    )
}