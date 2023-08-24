import { useNavigate } from "react-router-dom"
import { createReply } from "./api"
import { useState } from "react";


export default function NewReply({ props }){
    const {post_id, topic_id, currentPage} = props
    const [reply, setReply] = useState("");
    const navigate = useNavigate();
// NEW POST NEEDS:
// -text box input
// -button to submit
// -call createPost api function
// verify user is logged in (api should handle this, but...)
// ???
// profit


    const submit = async (e) => {
        console.log("submitting post:",post_id,reply)
        e.preventDefault();
        try{
            let response = await createReply({post_id, reply});
            console.log("post response:",response);
            window.location.reload();
            // navigate(`/topics/${topic_id}/${post_id}/?page=${1}`);
        }catch (error){
            if(error.includes("token is null")){
                alert("You must be signed in to submit a reply.")
            }
        }

    };

    return(
    <div>
      <div className="main-post" style={{backgroundColor:'grey'}}>
            <form className="main-post inside-main-post" style={{display:'flex', flexDirection:'column', alignItems:'left', paddingTop:"0px"}}>
                <h3>Reply:</h3>
                <textarea
                style={{ minHeight:'100px', minWidth:'99%', resize: 'vertical'}}
                placeholder="..."
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                />
                <button onClick={submit} style={{maxWidth:'70px'}}>Submit</button>
            </form>
      </div>
    </div>
    )
}