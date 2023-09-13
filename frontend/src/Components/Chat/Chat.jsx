// React & UseState & UseEffect
import React, { useState, useEffect } from "react";

// Chat CSS
import "./Chat.css";

/* ------------- Components ------------- */

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
// Avatar
import { Avatar } from "@mui/material";
// Circular Progress
import CircularProgress from "@mui/material/CircularProgress";

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

import io from "socket.io-client";

const Chat = (props) => {
  const [socket, setSocket] = useState(null);

  // Chats UseSate
  const [chats, setChats] = useState();
  // Oponent User UseState
  const [opuser, setOpuser] = useState();

  const [socketConnected, setSocketConnected] = useState(false);
  // Typing UseState
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    const newSocket = io(baseUrl);
    newSocket.emit("setup", Cookies.get("userid"));
    newSocket.on("connected", () => setSocketConnected(true));
    newSocket.on("typing", () => setIsTyping(true));
    newSocket.on("stoptyping", () => setIsTyping(false));
    setSocket(newSocket);

    // Clean up the socket when the component unmounts
    // return () => {
    //   if (newSocket) {
    //     newSocket.disconnect();
    //   }
    // };
  }, [props]);

  // UseEffect for Loading Chats and also create chats
  useEffect(() => {
    // Take the Token and Userid and UserType
    const token = Cookies.get("token");
    const userid = Cookies.get("userid");
    const type = Cookies.get("type");

    const val = {
      chat_id: props.data.chat_id,
      person_id: props.data.person_id,
      userType: props.data.user_type,
    };

    // If token and userid present
    if (token && userid && props) {
      // Axios Post Request to Backend
      axios
        .post(`${baseUrl}/api/chats/chat-start/${userid}`, val, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          // Set the Message Details of the User
          setChats(res.data.message);

          // Find the Oponent User Details
          let x = res.data.userchat.filter((o) => {
            return o.user_id !== userid;
          });
          // Set the Oponent User Details
          setOpuser(x);

          socket.emit("joinchat", res.data._id);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [props, socket]);

  // Message UseState
  const [msg, setMsg] = useState("");

  // Handle Message Func
  const handleMessage = (e) => {
    setMsg(e.target.value);

    if (!socketConnected) return;

    if (!typing) {
      setTyping(true);
      socket.emit("typing", props.data.chat_id);
    }
    let lastTypingTime = new Date().getTime();
    var timerLength = 3000;
    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && typing) {
        socket.emit("stoptyping", props.data.chat_id);
        setTyping(false);
      }
    }, timerLength);
  };

  useEffect(() => {
    if (socket) {
      socket.on("messagereceived", (newMsgReceived) => {
        if (props && props.data.chat_id !== newMsgReceived.chatId) {
          // notification
        } else if (props && props.data.chat_id === newMsgReceived.chatId) {
          setChats((prevChats) => [...prevChats, newMsgReceived.message]);
          // console.log(chats);
        }
      });
    }
  }, [socket, props]);

  // Handle Send Message Func
  const handleSendMessage = (event) => {
    event.preventDefault();

    // Take the Token and Userid
    const token = Cookies.get("token");
    const userid = Cookies.get("userid");
    const type = Cookies.get("type");

    const val1 = {
      chat_id: props.data.chat_id,
      content: msg,
    };

    // If token and userid present and message
    if (token && userid && msg) {
      // Set the Message Text Input Empty
      setMsg("");
      socket.emit("stoptyping", props.data.chat_id);
      // Axios Post Request to Backend
      axios
        .post(`${baseUrl}/api/chats/message/${userid}`, val1, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          // console.log(res.data.message);
          socket.emit("newmessage", res.data);
          // Set the Message Details of the User
          setChats([...chats, res.data.message]);
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
      chat_id: props.data.chat_id,
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
          setChats(res.data.message);
        })
        .catch((err) => {
          // console.log(err);
        });
    }
  };

  // BorderRadius and Style for Chats for different user
  const styleBorderradius = (cuid, del) => {
    // For given User
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

  // Convert Time Func
  const convertTime = (t) => {
    // Create a new Date object using the timestamp
    const givenDate = new Date(t);

    // Format the time as a string
    const formattedTime = givenDate.toLocaleTimeString(); // This will use the user's locale for formatting

    const newTime = formattedTime.split(":");

    return `${newTime[0]}:${newTime[1]} ${newTime[2].substring(3)}`;
  };

  // Check Date Func
  const checkDate = (pd, cd, id) => {
    // Create a new Date object using the timestamp
    const previousDate = new Date(pd);
    const currentDate = new Date(cd);

    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    // If the Previous Chat Date and Current Chat Date are same then not need to send the date
    if (
      currentDate.getDate() === previousDate.getDate() &&
      currentDate.getMonth() === previousDate.getMonth() &&
      currentDate.getFullYear() === previousDate.getFullYear()
    ) {
      return;
    }
    // Sending Dates
    else {
      // If Current Chat Date match with Todays Date
      if (
        currentDate.getDate() === today.getDate() &&
        currentDate.getMonth() === today.getMonth() &&
        currentDate.getFullYear() === today.getFullYear()
      ) {
        return (
          <p
            style={{
              textAlign: "center",
              margin: "10px auto",
              padding: "5px",
              backgroundColor: "rgba(0, 0, 0, 0.733)",
              color: "white",
              width: "fit-content",
              borderRadius: "5px",
              letterSpacing: "0.5px",
            }}
            key={id}
          >
            ---- Today ----
          </p>
        );
      }
      // If Current Chat Date match with Yesterday Date
      else if (
        currentDate.getDate() === yesterday.getDate() &&
        currentDate.getMonth() === yesterday.getMonth() &&
        currentDate.getFullYear() === yesterday.getFullYear()
      ) {
        return (
          <p
            style={{
              textAlign: "center",
              margin: "10px auto",
              padding: "5px",
              backgroundColor: "rgba(0, 0, 0, 0.733)",
              color: "white",
              width: "fit-content",
              borderRadius: "5px",
              letterSpacing: "0.5px",
            }}
            key={id}
          >
            ---- Yesterday ----
          </p>
        );
      }
      // Otherwise Send Perticular Date
      else {
        return (
          <p
            style={{
              textAlign: "center",
              margin: "10px auto",
              padding: "5px",
              backgroundColor: "rgba(0, 0, 0, 0.733)",
              color: "white",
              width: "fit-content",
              borderRadius: "5px",
              letterSpacing: "0.5px",
            }}
            key={id}
          >
            ---- {currentDate.getDate()}/{currentDate.getMonth() + 1}/
            {currentDate.getFullYear()} ----
          </p>
        );
      }
    }
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
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <h5
                    style={{
                      marginLeft: "10px",
                    }}
                  >
                    {opuser[0].fullname}
                  </h5>
                  {isTyping ? <p>typing..</p> : <></>}
                </div>
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
              {/* {!chats ? <CircularProgress sx={{
                alignSelf:"center"
              }}/> : ""} */}
              {/* If Chats are Present */}
              {chats &&
                chats.length !== 0 &&
                chats.map((c, i) => {
                  return (
                    <div key={c._id + i}>
                      {/* If it is first chat */}
                      {i === 0
                        ? // Otherwise call check date func and print date
                          checkDate(1520489632156, c.createdAt, i)
                        : // Otherwise call check date func and print date
                          checkDate(chats[i - 1].createdAt, c.createdAt, i)}

                      {/* Per Chat Box */}
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
                        {/* If the User is given User then Show Delete & Reply Icon for given User Own Chat */}
                        {!c.isDelete &&
                        c.sender_id === Cookies.get("userid") ? (
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
                              onClick={() =>
                                handleMsgDelete(c._id, c.sender_id)
                              }
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
                              {/* If Reply text is given User then show "You" other wise show Oponent User Name*/}
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
                                {/* If it is given user */}
                                {c.sender_id === Cookies.get("userid") ? (
                                  <i>You deleted this message</i>
                                ) : (
                                  // If it is oponent user
                                  <i>This message was deleted</i>
                                )}
                              </>
                            ) : (
                              // Otherwise show main content
                              <>
                                <span
                                  style={{
                                    display: "flex",
                                    flexDirection: "column",
                                  }}
                                >
                                  {c.content}
                                  <span
                                    style={{
                                      alignSelf:
                                        c.sender_id === Cookies.get("userid")
                                          ? "flex-end"
                                          : "flex-start",
                                      fontSize: "11.5px",
                                      color: "rgb(255, 196, 0)",
                                      margin: "2px 0",
                                    }}
                                  >
                                    {convertTime(c.createdAt)}
                                  </span>
                                </span>
                              </>
                            )}
                          </span>
                        </div>
                        {/* If the User is Oponent User then Reply Icon for Oponent User Chat */}
                        {!c.isDelete &&
                        c.sender_id !== Cookies.get("userid") ? (
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
