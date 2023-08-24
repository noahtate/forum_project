import { useNavigate } from "react-router-dom"
import { createPost } from "./api"
import { useState } from "react";


export default function NewPost({ props }){
    const topic_id = props
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const navigate = useNavigate();
// NEW POST NEEDS:
// -text box input
// -button to submit
// -call createPost api function
// verify user is logged in (api should handle this, but...)
// ???
// profit


    const submit = async (e) => {
        console.log("submitting post:",topic_id,content)
        e.preventDefault();
        try{
            let response = await createPost({"topic_id":topic_id, "content":content, "title":title});
            console.log("create post response:",response);
            navigate(`/topics/${topic_id}/${response.new_post}/?page=1`);
        }catch (error){
            if(typeof(error) == 'string' && error.includes("token is null")){
                alert("You must be signed in to submit a new post.")
            }else{
                console.error(error)
            }

        }

    };

    return(
    <div>
      <div className="main-post" style={{backgroundColor:'grey'}}>
            <form className="main-post inside-main-post" style={{display:'flex', flexDirection:'column', alignItems:'left', paddingTop:"0px"}}>
                {/* <h2>{topic}</h2> */}
                <h3>Create a new post</h3>
                <input
                placeholder="Title..."
                style={{marginBottom:'5px'}}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                ></input>
                <textarea
                style={{ minHeight:'100px', minWidth:'99%', resize: 'vertical'}}
                placeholder="..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                />
                <button type="button" onClick={submit} style={{maxWidth:'70px'}}>Submit</button>
            </form>
      </div>
    </div>
    )
}