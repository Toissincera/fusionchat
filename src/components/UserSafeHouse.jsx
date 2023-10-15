import React, { useEffect, useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import { createClient } from "@supabase/supabase-js";
import bg1 from "../pavlos-vaenas-usx_IFxo-MQ-unsplash.jpg";
import bg2 from "../resul-mentes-DbwYNr8RPbg-unsplash.jpg";

const supabase = createClient(
  "https://wkzqswjftjfuzbgsqzkb.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndrenFzd2pmdGpmdXpiZ3NxemtiIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTY2OTcyMjMsImV4cCI6MjAxMjI3MzIyM30.5dPCjCB-vwpT2LjOzXuWLy-Vz0gCf-l6ZWuOfllBmks"
);

export default function UserSafeHouse({
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
  const [addNewPublic, setAddNewPublic] = useState("");
  const [sessionsList, setSessionsList] = useState([]);
  const [existingChat, setExistingChat] = useState([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [currentlyTalkingToUsername, setCurrentlyTalkingToUsername] =
    useState("");
  const [currentlyTalkingToSessionID, setCurrentlyTalkingToSessionID] =
    useState("");
  const [showingChat, setShowingChat] = useState(false);

  async function handleAddNewPublic() {
    if (addNewPublic.trim() === "") return;

    const { data: addNewPublicDATA, error: addNewPublicError } = await supabase
      .from("users")
      .select("*")
      .eq("username", addNewPublic);

    if (!addNewPublicDATA) return;

    const sessionID = Math.floor(Math.random() * 100000000000000);
    const { data: addNewChatDATA, error: addNewChatError } = await supabase
      .from("sessions")
      .insert({
        sessionID: sessionID,
        sessionAdminID: currentlyLoggedInUser.userID,
        sessionAdminUsername: currentlyLoggedInUser.username,
        sessionGuestUsername: addNewPublicDATA[0].username,
        sessionGuestID: addNewPublicDATA[0].userID,
      });
    const messageID = Math.floor(Math.random() * 100000000000000);
    const { data, error: sendNewMessageError } = await supabase
      .from("messages")
      .insert({
        messageID: messageID,
        sessionID: sessionID,
        senderUsername: currentlyLoggedInUser.username,
        receiverUsername: addNewPublic,
        chatMessage: "Hey! I just added ya on Fusion. It's fusing time.",
      });
    setAddNewPublic("");
    console.log(sessionsList);
    console.log(addNewChatDATA);
    setSessionsList([
      ...sessionsList,
      {
        sessionID: sessionID,
        sessionAdminID: currentlyLoggedInUser.userID,
        sessionAdminUsername: currentlyLoggedInUser.username,
        sessionGuestUsername: addNewPublicDATA[0].username,
        sessionGuestID: addNewPublicDATA[0].userID,
      },
    ]);
  }

  useEffect(() => {
    (async () => {
      const { data: friendListDATA, error: friendListError } = await supabase
        .from("sessions")
        .select("*")
        .or(
          `sessionAdminUsername.eq.${currentlyLoggedInUser.username},sessionGuestUsername.eq.${currentlyLoggedInUser.username}`
        );

      setSessionsList(friendListDATA);
    })();
    return () => {};
  }, []);

  async function handleExistingChat(item) {
    let { data: existingChatDATA, error: existingChatError } = await supabase
      .from("messages")
      .select("*")
      .eq("sessionID", item.sessionID);

    setExistingChat(existingChatDATA);
    setCurrentlyTalkingToUsername(
      item.sessionAdminUsername == currentlyLoggedInUser
        ? item.sessionGuestUsername
        : item.sessionAdminUsername
    );
    setCurrentlyTalkingToSessionID(item.sessionID);
  }

  async function sendNewMessage() {
    const messageID = Math.floor(Math.random() * 100000000000000);
    const { data, error: sendNewMessageError } = await supabase
      .from("messages")
      .insert({
        messageID: messageID,
        sessionID: currentlyTalkingToSessionID,
        senderUsername: currentlyLoggedInUser.username,
        // receiverUsername:
        //   existingChat[0].senderUsername == currentlyLoggedInUser.username
        //     ? existingChat[0].receiverUsername
        //     : existingChat[0].senderUsername,
        receiverUsername: currentlyTalkingToUsername,
        chatMessage: currentMessage,
      });
    if (sendNewMessageError) {
      console.log(sendNewMessageError);
    }
    existingChat.push({
      messageID: messageID,
      sessionID: currentlyTalkingToSessionID,
      senderUsername: currentlyLoggedInUser.username,
      receiverUsername: currentlyTalkingToUsername,
      chatMessage: currentMessage,
    });
    setCurrentMessage("");
  }

  // /////___________________________________________________________________________________________/////
  return (
    <main
      className="d-flex flex-nowrap"
      style={{
        height: "90vh",
        backgroundImage: `url(${bg2})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <div
        className="d-flex flex-column flex-shrink-0 bg-dark"
        style={{ width: "4.5rem", height: "90vh" }}
      >
        <ul
          className="nav nav-pills nav-flush flex-column mb-auto text-center bg-dark"
          style={{ cursor: "pointer" }}
        >
          <li className="nav-item p-2 py-4 opacity-25">
            <i
              className="bi bi-house h4"
              style={{
                fontSize: "2rem",
                color: "yellow",
                height: "2rem",
                width: "2rem",
              }}
            ></i>
          </li>
          <li
            className="nav-item p-2 py-4 pointer"
            onClick={() => {
              setShowingChat((prev) => !prev);
            }}
          >
            <i
              // className="bi bi-chat h4"
              className={`bi h-4 ${showingChat ? "bi-chat-fill" : "bi-chat"}`}
              style={{
                fontSize: "2rem",
                color: "yellow",
                height: "2rem",
                width: "2rem",
              }}
            ></i>
          </li>
          <li className="nav-item p-2 py-4 opacity-25">
            <i
              className="bi bi-chat-heart h4"
              style={{
                fontSize: "2rem",
                color: "yellow",
                height: "2rem",
                width: "2rem",
              }}
            ></i>
          </li>
          <li className="nav-item p-2 py-4 opacity-25">
            <i
              className="bi bi-gear-fill h4"
              style={{
                fontSize: "2rem",
                color: "yellow",
                height: "2rem",
                width: "2rem",
              }}
            ></i>
          </li>
        </ul>
        <div className="dropdown border-top">
          <a
            href="#"
            className="d-flex align-items-center justify-content-center p-3 link-body-emphasis text-decoration-none dropdown-toggle"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i
              className="bi bi-person-fill-gear h4"
              style={{
                fontSize: "2rem",
                color: "yellow",
                height: "2rem",
                width: "2rem",
              }}
            ></i>
          </a>
          <ul
            className="dropdown-menu text-small shadow text-warning bg-black"
            style={{}}
          >
            <li>
              <a
                className="dropdown-item text-warning bg-black"
                href="#"
              >
                What's New
              </a>
            </li>
            <li>
              <a
                className="dropdown-item text-warning bg-black"
                href="#"
              >
                Add account
              </a>
            </li>
            <li>
              <a
                className="dropdown-item text-warning bg-black"
                href="#"
              >
                Profile
              </a>
            </li>

            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <a
                className="dropdown-item text-warning bg-black"
                href="#"
              >
                Sign out
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div
        className="b-example-divider b-example-vr"
        style={{ height: "80vh" }}
      ></div>

      {/* //////////////                    MIDDLE MENU                     /////////////////////// */}

      <div style={{ display: showingChat ? "none" : "flex" }}>
        <div
          className="d-flex flex-column align-items-stretch flex-shrink-0"
          style={{
            width: "300px",
            height: "80vh",
            overflow: "scroll",
          }}
        >
          <div
            href="/"
            className="d-flex align-items-center flex-shrink-0 link-body-emphasis text-decoration-none border-bottom"
          >
            <a
              href="/"
              className="d-block p-3 link-body-emphasis text-decoration-none"
              data-bs-toggle="tooltip"
              data-bs-placement="right"
              data-bs-original-title="Icon-only"
            >
              <svg
                className="bi pe-none"
                width="40"
                height="32"
              ></svg>
              <span className="visually-hidden"></span>
            </a>

            <span className="lead fs-3">Public Rooms</span>
          </div>

          <div className="list-group list-group-flush border-bottom scrollarea">
            <a
              href="#"
              className="list-group-item list-group-item-action active py-3 lh-sm"
              aria-current="true"
            >
              <div className="d-flex w-100 align-items-center justify-content-between">
                <div className="col-12 col-lg-12 mb-3 mb-lg-0 me-lg-3 d-flex">
                  <button
                    type="button"
                    className="btn btn-outline-warning me-2 col-6"
                    onClick={handleAddNewPublic}
                  >
                    Create with...
                  </button>
                  <input
                    className="col-5 form-control form-control-dark text-bg-dark border border-warning text-warning"
                    style={{ width: "8rem" }}
                    onChange={(e) => setAddNewPublic(e.target.value)}
                    value={addNewPublic}
                  />
                </div>
              </div>
            </a>

            <div></div>

            {sessionsList.map((item, indexxx) => (
              <div
                className="list-group-item list-group-item-action py-3 lh-sm"
                key={indexxx}
                onClick={() => handleExistingChat(item)}
                style={{ cursor: "pointer", background: "none" }}
              >
                <div className="d-flex w-100 align-items-center justify-content-between">
                  <div className="mb-1 p-2">
                    {item.sessionAdminUsername ==
                      currentlyLoggedInUser.username && (
                      <div>{item.sessionGuestUsername}</div>
                    )}
                    {item.sessionGuestUsername ==
                      currentlyLoggedInUser.username && (
                      <div>{item.sessionAdminUsername}</div>
                    )}
                    {item.sessionID}
                  </div>
                </div>
              </div>
            ))}
            {/* TYPE HERE   blogggggggginfooodata */}
            {/* /////////////////              END OF MIDDLE MENU        ///////////////////// */}
          </div>
        </div>
      </div>

      <div
        style={{
          backgroundImage: `url(${bg1})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          width: "100%",
          height: "90vh",
          border: "2px dashed blue",
          overflow: "scroll",
        }}
        className="d-flex flex-column p-3"
      >
        {existingChat.map((text, insex) => (
          <div
            className="d-flex"
            style={{
              justifyContent:
                text.senderUsername == currentlyLoggedInUser.username
                  ? "flex-end"
                  : "flex-start",
            }}
            key={insex}
          >
            <div className="p-2 m-2 rounded bg-dark text-warning w-50">
              {" "}
              {text.chatMessage}
            </div>
          </div>
        ))}

        <div style={{ flexGrow: 1 }}></div>
        <div className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3 d-flex p-1">
          <input
            type="text"
            className="form-control form-control-warning text-bg-dark text-warning w-80 mx-1"
            value={currentMessage}
            onChange={(e) => setCurrentMessage(e.target.value)}
          />
          <button
            type="button"
            className="btn btn-warning me-2"
            onClick={sendNewMessage}
          >
            Send
          </button>
        </div>
      </div>

      <div className="b-example-divider b-example-vr"></div>
    </main>
  );
}
