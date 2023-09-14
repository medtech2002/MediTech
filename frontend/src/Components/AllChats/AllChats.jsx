// React & UseState & UseEffect
import React, { useState, useEffect } from "react";

// AllChats CSS
import "./AllChats.css";

/* ------------- Components ------------- */
// Chat Component
import Chat from "../Chat/Chat";

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

/* ------------- MUI Component ------------- */
// Avatar
import { Avatar } from "@mui/material";
// Card
import Card from "@mui/material/Card";
// Button
import Button from "@mui/material/Button";
import VideoCall from "../VideoCall/VideoCall";

const AllChats = () => {
  const [perUserChat, setPerUserChat] = useState();

  // UseEffect for Loading Chats and also create chats
  useEffect(() => {
    // Take the Token and Userid and UserType
    const token = Cookies.get("token");
    const userid = Cookies.get("userid");
    const type = Cookies.get("type");

    // If token and userid present
    if (token && userid) {
      // Axios Post Request to Backend
      axios
        .get(`${baseUrl}/api/chats/all-chats/${userid}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          // console.log(res.data);
          setPerUserChat(res.data);
        })
        .catch((err) => {
          // console.log(err);
        });
    }
  }, []);

  const [det, setDet] = useState();
  const [vid, setVid] = useState();

  return (
    <>
      <div className="allChats">
        <div className="userChats">
          {perUserChat &&
            perUserChat.length !== 0 &&
            perUserChat.map((pc) => {
              return (
                <Card
                  variant="outlined"
                  key={pc.chat_id}
                  sx={{
                    width: "200px",
                    m: 2,
                    p: 1,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                  }}
                >
                  {/* Oponent User Logo */}
                  <Avatar
                    sx={{
                      backgroundColor: "orange",
                      mt: 1,
                      mb: 1,
                    }}
                  >
                    T
                  </Avatar>
                  <h5 style={{ textAlign: "center" }}>{pc.opChat.fullname}</h5>
                  <Button
                    color="secondary"
                    variant="contained"
                    sx={{
                      mt: 2,
                      mb: 2,
                    }}
                    size="small"
                    onClick={() => {
                      setDet({
                        chat_id: pc.chat_id,
                        person_id: pc.opChat.user_id,
                        user_type: pc.opChat.userType,
                      });
                    }}
                  >
                    Start Chat
                  </Button>

                  <Button
                    color="secondary"
                    variant="contained"
                    sx={{
                      mt: 2,
                      mb: 2,
                    }}
                    size="small"
                    onClick={() => {
                      setVid({
                        chatId: pc.chat_id,
                        name: localStorage.getItem("name"),
                      });
                    }}
                  >
                    Call
                  </Button>
                </Card>
              );
            })}
        </div>
        <div className="msgChats">
          {det && <Chat data={det} />}
          {vid && <VideoCall vid={vid} />}
        </div>
      </div>
    </>
  );
};

export default AllChats;
