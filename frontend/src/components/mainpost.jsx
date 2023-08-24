import { Link } from "react-router-dom"

export default function MainPost( {post, profile_picture, display_name, id} ){
    const {post_id,topic_id,title,date_created,created_by,content} = post
    // const {id,display_name,profile_picture} = userData
    
    // console.log("post.jsx:",post)
    return(
        <>
        {console.log({profile_picture})}
            <div className="main-post">   
                <div className="main-post inside-main-post">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{flex: 1}}>
                            <h1 style={{ textAlign: 'left', color: 'black', textDecoration: 'underline', margin: '0' }}>
                                {title}
                            </h1>
                        </div>
                            
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'right' }}>
                            <Link to={`/user/${id}/`} style={{ textAlign: 'center', textDecoration:'none' }}>
                                <img src={profile_picture} alt="Image" style={{ width:'150px', height: 'auto' }} />
                            </Link>
                            <Link to={`/user/${id}/`} style={{ textAlign: 'center', textDecoration:'none' }}>{display_name}</Link>
                        </div>

                    </div>
                    <div style={{ padding:'20px',margin:'50px 20px 0px 20px', border:'solid black 2px', backgroundColor:'darkkhaki'}}>
                        <p style={{color:'black'}}>{content}</p>
                        <p style={{display:"block",textAlign:'right', fontSize:'12px',paddingRight:'10px'}}>{date_created}</p>
                    </div>
                    
                </div>
            </div>
        </>
    
    )
}


