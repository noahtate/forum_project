import { Link } from "react-router-dom"
import { useUser } from "../components/usercontext";

export default function Navbar(){
    const { user, setUser } = useUser();

    return(
    <div>
      <div className="navbar navbar navbar-fixed-top">
        <div className="navbar-inner">
          <div className="container">
            <button type="button" className="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse">
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <Link className="brand" to="/home/">Forum</Link>
            {/* <a className="brand" href="./index.html">Forum</a> */}
            <div className="nav-collapse collapse">
              <ul className="nav">
                <li className="">
                  <Link to="/home/">Home</Link>
                </li>
                <li className="">
                  <Link to={user?.user_id ? "/user/"+String(user.user_id)+"/":"/login/"}>Profile</Link>
                </li>
                <li className="">
                  <Link  to={user?.user_id ? "/logout/":"/login/"}>{user?.user_id ? "Log out":"Log in"}</Link>
                </li>
                <li className="">
                  <Link to="/example/">Example page</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
        {/* <button>
            <Link to="/example">To the example</Link>
        </button> */}
    </div>
    )
}