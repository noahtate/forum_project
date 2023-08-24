import { Link } from "react-router-dom";

export default function Reply({ reply }) {
    const { content, date_created, created_by, created_by_id, profile_picture } = reply;
  
    return (
      <div className="main-post">
        <p style={{ textAlign: 'left', marginBottom:'10px'}}>
            <Link style={{textDecoration:'none'}} to={"/user/"+String(created_by_id)+"/"} >{created_by}</Link>
        </p>
        <div className="reply" style={{ fontSize: '16px', display: 'flex', alignItems: 'center' }}>
          <Link style={{textDecoration:'none'}} to={"/user/"+String(created_by_id)+"/"} ><img src={profile_picture} alt="Image" width="100px" height="100px"/></Link>
  
          <div style={{ marginLeft: '10px', border: 'solid black 2px', backgroundColor: 'darkkhaki', flex: '1' }}>
            <p style={{ textAlign: 'left', padding: '10px' }}>{content}</p>
  
            <p style={{ textAlign: 'right', fontSize: '12px', padding: '10px' }}>date posted: {date_created}</p>
          </div>
        </div>
      </div>
    );
  }
  

