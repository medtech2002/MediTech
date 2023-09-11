// React & UseState & UseEffect
import React, { useState, useEffect } from "react";

// Chat CSS
import "./Chat.css";

/* ------------- Components ------------- */
// SignIn Page
// import SignIn from "../SignIn/SignIn";

/* ------------- Fetch ------------- */
// Axios
import axios from "axios";

/* ------------- React Router Dom ------------- */
// UseNavigate && UseParams
import { useNavigate, useParams } from "react-router-dom";

/* ------------- Storage ------------- */
// Cookies
import Cookies from "js-cookie";

// Backend Url
import baseUrl from "../../Helper/BaseUrl";

// React Scrollable Feed
import ScrollableFeed from "react-scrollable-feed";

// Emoji Picker
import EmojiPicker from "emoji-picker-react";

// Crypto JS
import CryptoJS from "crypto-js";

/* ------------- MUI Component ------------- */
import { Avatar } from "@mui/material";

/* ------------- MUI Icons ------------- */
// Camera Icon
import CameraAltIcon from "@mui/icons-material/CameraAlt";
// Send Icon
import SendIcon from "@mui/icons-material/Send";
// Emoji Icon
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
// Attach File Icon
import AttachFileIcon from "@mui/icons-material/AttachFile";
// Delete Icon
import DeleteIcon from "@mui/icons-material/Delete";
// Video Cam Icon
import VideocamIcon from "@mui/icons-material/Videocam";
// Reply Icon
import ReplyIcon from "@mui/icons-material/Reply";
// Block Icon
import BlockIcon from "@mui/icons-material/Block";

const Chat = () => {
  // Chats UseSate
  const [chats, setChats] = useState();
  // Oponent User UseState
  const [opuser, setOpuser] = useState();
  // Chat Id UseState
  const [chatId, setChatId] = useState("64fc64d4e4a0dcfba88c0600");
  // Person Id
  const [personId, setPersonId] = useState("64f9e8a1c77cb6936419d54c");
  // User Type
  const [userType, setUserType] = useState("user");

  // UseEffect for Loading Chats and also create chats
  useEffect(() => {
    // Take the Token and Userid and UserType
    const token = Cookies.get("token");
    const userid = Cookies.get("userid");
    const type = Cookies.get("type");

    const val = {
      chat_id: chatId,
      person_id: personId,
      userType: userType,
    };

    // If token and userid present
    if (token && userid) {
      // Axios Post Request to Backend
      axios
        .post(`${baseUrl}/api/chats/chat-start/${userid}`, val, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          // console.log(res.data);
          // Set Chat Id
          setChatId(res.data._id);

          // Set the Message Details of the User
          setChats(res.data.message);

          // Find the Oponent User Details
          let x = res.data.userchat.filter((o) => {
            return o.user_id !== userid;
          });
          // Set the Oponent User Details
          setOpuser(x);
        })
        .catch((err) => {
          // console.log(err);
        });
    }
  }, [chatId, personId, userType]);

  // Message UseState
  const [msg, setMsg] = useState("");

  // Handle Message Func
  const handleMessage = (e) => {
    setMsg(e.target.value);
  };

  // Handle Send Message Func
  const handleSendMessage = (event) => {
    event.preventDefault();

    // Take the Token and Userid
    const token = Cookies.get("token");
    const userid = Cookies.get("userid");
    const type = Cookies.get("type");

    const val1 = {
      chat_id: chatId,
      content: msg,
    };

    // If token and userid present and message
    if (token && userid && msg) {
      // Set the Message Text Input Empty
      setMsg("");
      // Axios Post Request to Backend
      axios
        .post(`${baseUrl}/api/chats/message/${userid}`, val1, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          // console.log(res.data);
          // Set the Message Details of the User
          setChats(res.data);
        })
        .catch((err) => {
          // console.log(err);
        });
    }
  };

  // Handle Message Delete by Message Id and Sender Id
  const handleMsgDelete = (mid, sid) => {
    // Take the Token and Userid
    const token = Cookies.get("token");
    const userid = Cookies.get("userid");
    const type = Cookies.get("type");

    const val2 = {
      chat_id: chatId,
      msg_id: mid,
    };

    // If token and userid present
    if (token && userid && userid === sid) {
      // Axios Post Request to Backend
      axios
        .delete(`${baseUrl}/api/chats/del-message/${userid}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: val2,
        })
        .then((res) => {
          // console.log(res.data);
          // Set the Message Details of the User
          setChats(res.data);
        })
        .catch((err) => {
          // console.log(err);
        });
    }
  };

  // BorderRadius and Style for Chats for different user
  const styleBorderradius = (cuid, del) => {
    // For Current User
    if (cuid === Cookies.get("userid")) {
      return {
        borderTopRightRadius: "5px",
        borderBottomRightRadius: "15px",
        borderBottomLeftRadius: "10px",
        borderTopLeftRadius: "10px",
        background:
          "linear-gradient(65deg, rgb(2, 119, 165), rgb(104, 43, 245))",
        opacity: del ? 0.3 : 1,
      };
    }
    // For Oponent User
    return {
      borderTopRightRadius: "10px",
      borderBottomRightRadius: "10px",
      borderBottomLeftRadius: "15px",
      borderTopLeftRadius: "5px",
      background: "linear-gradient(65deg, rgb(182, 4, 64), rgb(230, 4, 154))",
      opacity: del ? 0.3 : 1,
    };
  };

  return (
    <>
      {/* Main Chat Page */}
      <div className="chatPage">
        {/* Up Box */}
        <div className="up">
          {/* Oponent User Details */}
          <div className="opUser">
            {/* If Oponent User Present */}
            {opuser && (
              <>
                {/* Oponent User Logo */}
                <Avatar
                  sx={{
                    ml: 2,
                    p: 2,
                    backgroundColor: "orange",
                  }}
                >
                  T
                </Avatar>
                {/* Oponent User Fullname */}
                <h5
                  style={{
                    marginLeft: "10px",
                  }}
                >
                  {opuser[0].fullname}
                </h5>
              </>
            )}
          </div>
          {/* Video Camera Icon */}
          <VideocamIcon
            sx={{
              mr: 2,
              fontSize: "2rem",
              cursor: "pointer",
            }}
          />
        </div>

        {/* Main Chat Box */}
        <div className="chatBox">
          {/* Message Box */}
          <div className="message">
            {/* Scrollable Feed */}
            <ScrollableFeed>
              {/* If Chats are Present */}
              {chats &&
                chats.length !== 0 &&
                chats.map((c) => {
                  return (
                    // Per Chat Box
                    <div
                      className="chat"
                      key={c._id}
                      style={{
                        justifyContent:
                          c.sender_id === Cookies.get("userid")
                            ? "flex-end"
                            : "flex-start",
                      }}
                    >
                      {/* If the User is Current User then Show Delete & Reply Icon for Current User Own Chat */}
                      {!c.isDelete && c.sender_id === Cookies.get("userid") ? (
                        <>
                          {/* Delete Icon */}
                          <DeleteIcon
                            sx={{
                              m: 1,
                              opacity: 0.5,
                              color: "grey",
                              cursor: "pointer",
                              "&:hover": {
                                opacity: 1,
                              },
                            }}
                            onClick={() => handleMsgDelete(c._id, c.sender_id)}
                          />
                          {/* Reply Icon */}
                          <ReplyIcon
                            sx={{
                              m: 1,
                              opacity: 0.5,
                              color: "grey",
                              cursor: "pointer",
                              "&:hover": {
                                opacity: 1,
                              },
                            }}
                          />
                        </>
                      ) : (
                        ""
                      )}
                      {/* Inner Chat Text Box */}
                      <div
                        className="text"
                        style={styleBorderradius(c.sender_id, c.isDelete)}
                      >
                        {/* If Reply is Present */}
                        {c.reply && !c.isDelete && (
                          // Reply Box
                          <span className="reply">
                            {/* If Reply text is Current User then show You other wise show Oponent User Name*/}
                            <span>
                              {c.reply_id === Cookies.get("userid")
                                ? "You"
                                : opuser[0].fullname}
                            </span>
                            {/* Reply Content */}
                            {c.reply}
                          </span>
                        )}
                        {/* Main Message Content */}
                        <span>
                          {/* If the message was deleted */}
                          {c.isDelete ? (
                            <>
                              {/* Set Block Icon */}
                              <BlockIcon
                                sx={{
                                  color: "white",
                                  mr: 1,
                                }}
                              />
                              {/* If it is current user */}
                              {c.sender_id === Cookies.get("userid") ? (
                                <>You deleted the message</>
                              ) : (
                                // If it is oponent user
                                <>This message was deleted</>
                              )}
                            </>
                          ) : (
                            // Otherwise show main content
                            <>{c.content}</>
                          )}
                        </span>
                      </div>
                      {/* If the User is Oponent User then Reply Icon for Oponent User Chat */}
                      {!c.isDelete && c.sender_id !== Cookies.get("userid") ? (
                        <>
                          {/* Reply Icon */}
                          <ReplyIcon
                            sx={{
                              m: 1,
                              opacity: 0.5,
                              color: "grey",
                              cursor: "pointer",
                              "&:hover": {
                                opacity: 1,
                              },
                            }}
                          />
                        </>
                      ) : (
                        ""
                      )}
                    </div>
                  );
                })}
            </ScrollableFeed>
          </div>
        </div>

        {/* Down Box */}
        <div className="down">
          {/* Camera Icon */}
          <CameraAltIcon
            sx={{
              fontSize: "2rem",
              color: "grey",
              cursor: "pointer",
              m: 2,
            }}
          />
          {/* Input Text for Message */}
          <form onSubmit={handleSendMessage}>
            {/* Text Message */}
            <div className="textmsg">
              {/* Emoji Icon */}
              <EmojiEmotionsIcon
                sx={{
                  fontSize: "2rem",
                  color: "grey",
                  cursor: "pointer",
                  ml: 2,
                }}
              />
              {/* Text Icon */}
              <input
                type="text"
                name="msg"
                id="msgInput"
                placeholder="Type Message..."
                value={msg}
                onChange={handleMessage}
              />
              {/* Attach File Icon */}
              <AttachFileIcon
                sx={{
                  fontSize: "2rem",
                  color: "grey",
                  cursor: "pointer",
                  mr: 2,
                }}
              />
            </div>
            {/* Send Button */}
            <button
              type="submit"
              style={{
                borderStyle: "none",
                backgroundColor: "none",
              }}
            >
              {/* Send Icon */}
              <SendIcon
                sx={{
                  fontSize: "3rem",
                  color: "white",
                  cursor: "pointer",
                  backgroundColor: "rgb(224, 12, 178)",
                  padding: "10px",
                  borderRadius: "50%",
                  opacity: msg ? 1 : 0.3,
                  ml: 2,
                  mr: 2,
                }}
              />
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Chat;
