import React from "react"
import squareLOGO from "../squareLOGO.png";

export default function Header({newUser, setNewUser, username, setUsername, password, setPassword}){
    function switchToLogin(){
        setNewUser(false)
    }
    function switchToSignup(){
        setNewUser(true)
    }
  return (
    <header className="p-2 text-bg-dark">
    <div className="container">
      <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
        <a href="/" className="d-flex align-items-center mb-2 mb-lg-0 mx-4 text-white text-decoration-none">
            <img src={squareLOGO} style={{width: "2.8rem"}}></img>
          </a>

        <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
          <li><a href="#" className="nav-link px-2 text-white" style={{fontSize: "1.2rem"}}>Hot 🔒</a></li>
          <li><a href="#" className="nav-link px-2 text-white" style={{fontSize: "1.2rem"}}>Trending 🔒</a></li>
          <li><a href="#" className="nav-link px-2 text-white" style={{fontSize: "1.2rem"}}>Near Me 🔒</a></li>
        </ul>

        <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search">
          <input type="search" className="form-control form-control-dark text-bg-dark" placeholder="Search..." aria-label="Search"/>
        </form>

        <div className="text-end">
          <button type="button" className={newUser ? "btn btn-outline-warning me-2" : "btn btn-warning me-2"} onClick={switchToLogin}>Login</button>
          <button type="button" className={newUser ? "btn btn-warning me-2" : "btn btn-outline-warning me-2"} onClick={switchToSignup}>Signup</button>
        </div>
      </div>
    </div>
  </header>
  )
};

