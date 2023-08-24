import axios from 'axios';

// Define the base URL of your API
const baseURL = 'http://127.0.0.1:8000/api/v1/';

// Create an Axios instance with the base URL
const api = axios.create({
  baseURL: baseURL,
});

// Define your API endpoints
const endpoints = {
  topics: 'topics/',
  posts: 'posts/',
  // Add more endpoints as needed
};

function getToken(){
  if(localStorage.getItem("token") != null){
    api.defaults.headers.common["Authorization"] = `Token ${localStorage.getItem("token")}`
  }else{
    let errormessage = `Error: Auth token is null`;
    console.error(errormessage)
    throw errormessage
  }
}
function deleteToken(){
  localStorage.removeItem("token");
  delete api.defaults.headers.common["Authorization"];
}

// Example function to fetch topics
async function fetchTopics() {
  try {
    const response = await api.get(`topics/`); //home is dumb and it's the backend trying to be the front end, need to fix.
    console.log("topics:",response.data)
    return response.data; // Assuming the response contains data in JSON format
  } catch (error) {
    console.error('Error fetching topics:', error);
    throw error;
  }
}


async function fetchPosts(topic_id,page=null){
    try{
        if(page){
          const response = await api.get(`topics/${topic_id}/${page}`);
          console.log(`from api- fetching posts from topics/${topic_id}/...`)
          console.log(`from api- response data: ${response.data}`)
          return response.data
        }else{
          const response = await api.get(`topics/${topic_id}/`);
          console.log(`from api- fetching posts from topics/${topic_id}/...`)
          console.log(`from api- response data: ${response.data}`)
          return response.data
        }
        
    } catch (error){
        console.error("from api- Error fetching posts: ", error);
        throw error;
    }
}

async function fetchReplies(topic_id,post_id,page=null){
  try{
      if(page){
        const response = await api.get(`topics/${topic_id}/${post_id}/${page}`);
        console.log(`from api- fetching replies from topics/${topic_id}/${post_id}/${page}...`)
        console.log(`from api- response data: ${response.data}`)
        return response.data
      }else{
        console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX NO PAGE SENT TO FETCH REPLIES API XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
        const response = await api.get(`topics/${topic_id}/${post_id}/`);
        console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX NO PAGE SENT TO FETCH REPLIES API XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")

        console.log(`from api- fetching replies from topics/${topic_id}/${post_id}/...`)
        console.log(`from api- response data: ${response.data}`)
        return response.data
      }
      
  } catch (error){
      console.error("from api- Error fetching posts: ", error);
      throw error;
  }
}

async function fetchUser(user_id){
  try{
      console.log("user id:",user_id)
      const response = await api.get(`user/${user_id}/public/`);
      console.log(`from api- fetching user data from user/${user_id}/public/...`)
      console.log(`from api- response data: ${response.data}`)
      return response.data
  } catch (error){
      console.error("from api- Error fetching  user data: ", error, "userid: ",user_id);
      throw error;
  }
}

async function fetchUserPrivate(user_id){
  try{
      getToken();
      console.log("user id:",user_id)
      const response = await api.get(`user/${user_id}/`);
      console.log(`from api- fetching user data from user/${user_id}/...`)
      console.log(`from api- response data: ${response.data}`)
      return response.data
  } catch (error){
      // console.error("from api- Error fetching  user data: ", error, "userid: ",user_id);
      throw error;
  }
}

async function fetchUserToken(){
  try{
      getToken();
      if(api.defaults.headers.common["Authorization"].includes("undefined")){
        throw error;
      }
      const response = await api.get(`user/token/`);
      console.log(`from api- fetching user data from user/token/ ...`)
      console.log(`from api- response data: ${response.data}`)
      return response.data
  } catch (error){
      console.error("from api- Error fetching  user data: ", error);
      throw error;
  }
}

async function logInUser(body){
  try{
      deleteToken();
      console.log("user:",body.email)
      const response = await api.post(`user/login/`,{
        "email":body.email, 
        "password":body.password
      });
      console.log(`from api- logging in from user/signup/...`)
      console.log(`from api- response data: ${response.data}`)
      console.log(`Token ${response.token}`)
      return response.data
  } catch (error){
      console.error("from api- Error fetching logging in: ", error);
      throw error;
  }
}

async function logOutUser(){
  try{
      const response = await api.post(`user/logout/`);
      if (response.status === 204) {
        deleteToken();
      }
      console.log(`from api- logging out from user/logout/...`)
      console.log(`from api- response data: ${response.data}`)
      console.log(`Token ${response.token}`)
      return response.data
  } catch (error){
      console.error("from api- Error logging out: ", error);
      throw error;
  }
}

async function createUser(data) {
  console.log("creating user:",data.display_name,data.email)
  try {
    const response = await api.post(`/user/signup/`, {
      "display_name":data.display_name,
      "email":data.email,
      "password":data.password,
    });
    console.log("New user created- response:",response.data)
    return response.data; // Assuming the response contains data in JSON format
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}

async function createPost(data) {
  console.log("creating post:",data.post_id,data.reply)
  try {
    const userData = await fetchUserToken();
    const user = userData.id;
    getToken();
    const response = await api.post(`/topics/${data.topic_id}/post/`, {
      "topic_id":data.topic_id,
      "content":data.content,
      "title":data.title,
      "user":user
    });
    console.log("New post response:",response.data)
    return response.data; // Assuming the response contains data in JSON format
  } catch (error) {
    console.error('Error creating post:', error);
    throw error;
  }
}

// Example function to create a post
async function createReply(data) {
  console.log("creating post:",data.post_id,data.reply)
  try {
    const userData = await fetchUserToken();
    const user = userData.id;
    getToken();
    const response = await api.post(`post/`, {
      // "topic_id":topic_id,
      "post_id":data.post_id,
      "content":data.reply,
      "user":user
    });
    return response.data; // Assuming the response contains data in JSON format
  } catch (error) {
    console.error('Error creating post:', error);
    throw error;
  }
}

async function editBio(data) {
  console.log("edit bio: ",data.id,data.bio)
  try {
    const response = await api.post(`/user/bio/`, {
      "id":data.id,
      "bio":data.bio
    });
    console.log("bio edited - response:",response.data)
    return response.data; // Assuming the response contains data in JSON format
  } catch (error) {
    console.error('Error editing bio:', error);
    throw error;
  }
}

// Export the functions for use in your components
export { fetchTopics, fetchPosts, fetchReplies, fetchUser, fetchUserPrivate, fetchUserToken, logInUser, logOutUser, createUser, createPost, createReply, editBio };
