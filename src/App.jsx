import Header from "./components/Header";
import SignUp from "./components/SignUp";
import "./App.css";
import { useState } from "react";
import UserSafeHouse from "./components/UserSafeHouse";

function App() {
  const [newUser, setNewUser] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentlyLoggedInUser, setCurrentlyLoggedInUser] = useState({})
  return (
    <>
      <Header
        newUser={newUser}
        setNewUser={setNewUser}
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
      />
      {!loggedIn && (
        <SignUp
          newUser={newUser}
          setNewUser={setNewUser}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          message={message}
          setMessage={setMessage}
          loggedIn={loggedIn}
          setLoggedIn={setLoggedIn}
          currentlyLoggedInUser={currentlyLoggedInUser}
          setCurrentlyLoggedInUser={setCurrentlyLoggedInUser}
        />
      )}
      {loggedIn && <UserSafeHouse 
          newUser={newUser}
          setNewUser={setNewUser}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          message={message}
          setMessage={setMessage}
          loggedIn={loggedIn}
          setLoggedIn={setLoggedIn}
          currentlyLoggedInUser={currentlyLoggedInUser}
          setCurrentlyLoggedInUser={setCurrentlyLoggedInUser}/>}
    </>
  );
}

export default App;
