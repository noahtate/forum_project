import { Link } from "react-router-dom"
export default function Post( {post} ){
    const {post_id,topic_id,title,date_created,created_by,num_replies} = post
    
    // console.log("post.jsx:",post)
    return(
        <>
            <div className="main-post inside-main-post">  
                <div className="post">
                    <div></div>
                    <Link style={{color:'green', textDecoration:'none'}} to={`/topics/${topic_id}/${post_id}/?page=1`}>{title.length > 155 ? `${title.slice(0, 155)}...` : title}</Link>
                    <span style={{display:"block",textAlign:'right', fontSize:'16px'}}>posted: {date_created}</span>
                    <span style={{display:"block",textAlign:'right', fontSize:'16px'}}>posted by: {created_by}</span>
                    <span style={{display:"block",textAlign:'right', fontSize:'16px'}}>replies: {num_replies}</span>

                </div>
            </div>
        </>
    
    )
}