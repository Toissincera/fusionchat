import React, { useEffect, useState } from "react";
import "./SignUp.css";
import bg1 from "../jean-philippe-delberghe-75xPHEQBmvA-unsplash.jpg";

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://wkzqswjftjfuzbgsqzkb.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndrenFzd2pmdGpmdXpiZ3NxemtiIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTY2OTcyMjMsImV4cCI6MjAxMjI3MzIyM30.5dPCjCB-vwpT2LjOzXuWLy-Vz0gCf-l6ZWuOfllBmks"
);
export default function SignUp({
  newUser,
  setNewUser,
  username,
  setUsername,
  password,
  setPassword,
  message,
  setMessage,
  loggedIn,
  setLoggedIn,
  currentlyLoggedInUser,
  setCurrentlyLoggedInUser,
}) {
  async function handleSignUp() {
    if (username.trim() === "") {
      return;
    }

    const { data: existingUser } = await supabase
      .from("users")
      .select("username")
      .eq("username", username);

    if (existingUser[0] && existingUser[0].username == username) {
      setMessage("Sorry, the username is already taken.");
    } else {
      const userID = Math.floor(Math.random() * 100000000000000);
      const { data: newUserAdded, error } = await supabase
        .from("users")
        .insert({ userID, username, password });
      if (error) {
        setMessage("Error during sign up. Please try again.");
      } else {
        setMessage(
          `Welcome, ${username}! You have successfully signed up. You may now login.`
        );
        setUsername("");
        setPassword("");
        setNewUser(false);
        setCurrentlyLoggedInUser({
          userID: userID,
          username: username,
          password: password,
        });
        // Redirect to login here if Link
      }
    }
  }
  async function handleLogIn() {
    if (username.trim() === "") {
      return;
    }
    if (password.trim() === "") {
      return;
    }
    const { data: currentUser, error } = await supabase
      .from("users")
      .select("*")
      .eq("username", username)
      .eq("password", password);
    if (
      currentUser[0].username == username &&
      currentUser[0].password == password
    ) {
      setLoggedIn(true);
      setCurrentlyLoggedInUser(currentUser[0]);
    } else {
      setMessage("Couldn't log in. Recheck credentials, maybe?");
    }
  }

  return (
    <div
      style={{
        backgroundImage: `url(${bg1})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <div className="container col-xl-10 col-xxl-8 px-4 py-5">
        <div className="row align-items-center g-lg-5 py-5">
          <div className="col-lg-7 text-center text-lg-start">
            <h1
              className="display-4 fw-bold lh-1 text-body-emphasis mb-3"
              style={{ fontFamily: "Lato", fontWeight: "700" }}
            >
              Fusion
              <br /> for friends
            </h1>
            <p className="col-lg-10 fs-4">
              Fusion provides a serverless, Supabase powered, postgreSQL built
              architecture <br />
              for sharing memes and stuff <br />
              Oh and get in Jack, we are bringing private rooms back
            </p>
          </div>
          {newUser ? (
            <div className="col-md-10 mx-auto col-lg-5">
              <div className="p-4 p-md-5 border rounded-3 bg-body-tertiary">
                <div className="form-floating mb-3">
                  <input
                    className="form-control"
                    placeholder="name@example.com"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <label htmlFor="floatingInput">Username</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <label htmlFor="floatingPassword">Password</label>
                </div>
                <button
                  className="w-100 btn btn-lg btn-warning"
                  onClick={handleSignUp}
                >
                  Sign Up
                </button>
                {message !== "" ? <div className="lead">{message}</div> : null}
              </div>
            </div>
          ) : (
            <div className="col-md-10 mx-auto col-lg-5">
              <div className="p-4 p-md-5 border rounded-3 bg-body-tertiary">
                <div className="form-floating mb-3">
                  <input
                    className="form-control"
                    placeholder="name@example.com"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <label htmlFor="floatingInput">Username</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <label htmlFor="floatingPassword">Password</label>
                </div>
                <button
                  className="w-100 btn btn-lg btn-warning"
                  onClick={handleLogIn}
                >
                  Log In
                </button>
                {message !== "" ? <div className="lead">{message}</div> : null}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
