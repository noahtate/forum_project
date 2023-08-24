import { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom";

export default function Bio( {post, profile_picture, display_name, id} ){
    const {title,date_created,content} = post;
    const [showEditBio, setShowEditBio] = useState(false);
    const [bioContent, setBioContent] = useState("");
    const navigate = useNavigate();

    // const {id,display_name,profile_picture} = userData
    
    // console.log("post.jsx:",post)
    const editBio = async (e) => {
        setShowEditBio(!showEditBio)
        console.log("editing bio: ",id,bioContent)
        // e.preventDefault();
        try{
            let response = await editBio({"id":id,"content":bioContent});
            console.log("create post response:",response);
            navigate(`/user/${id}/`);
        }catch (error){
            if(typeof(error) == 'string' && error.includes("token is null")){
                alert("You must be signed in to submit a new post.")
            }else{
                console.error(error)
            }

        }

    };

    useEffect(()=>{
        setBioContent(content);
    },[]);

    return(
        <>
        {console.log({profile_picture})}
            <div style={{minHeight:'1000px', marginBottom:'50px'}} className="main-post">   
                <div style={{minHeight:'950px'}} className="main-post inside-main-post">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{flex: 1}}>
                            <h1 style={{ textAlign: 'left', color: 'black', textDecoration: 'underline', margin: '0' }}>
                                {title}
                            </h1>
                        </div>
                            
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'right' }}>
                            <img src={profile_picture} alt="Image" style={{ width:'150px', height: 'auto' }} />
                            <Link to={`/user/${id}/`} style={{ textAlign: 'center', textDecoration:'none' }}>{display_name}</Link>
                        </div>

                    </div>
                    <div style={{ padding:'20px',margin:'50px 20px 0px 20px', border:'solid black 2px', backgroundColor:'darkkhaki'}}>
                        <h4>Bio:</h4>
                        {showEditBio ? (
                            <form>
                            <textarea
                            style={{ minHeight:'100px', minWidth:'99%', resize: 'vertical'}}
                            // placeholder={content}
                            value={bioContent}
                            onChange={(e) => setBioContent(e.target.value)}
                            />
                            <button onClick={editBio} style={{display:"block", marginLeft:'auto',textAlign:'right', paddingRight:'10px'}}>save</button>
                            </form>
                            ) : (
                            <>
                                <p>{bioContent}</p>
                                <button onClick={() => setShowEditBio(!showEditBio)} style={{display:"block", marginLeft:'auto',textAlign:'right', paddingRight:'10px'}}>edit</button>
                            </>
                               
                            )}                        
                        {/* <p style={{color:'black'}}>{content}</p> */}
                        <h5 style={{display:"block",textAlign:'right', fontSize:'12px',paddingRight:'10px'}}>Account created: {date_created}</h5>
                    </div>
                </div>
            </div>
        </>
    
    )
}


