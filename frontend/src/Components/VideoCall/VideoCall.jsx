import React from "react";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import Cookies from "js-cookie";

const VideoCall = (props) => {
  const userid = Cookies.get("userid");
  const myMeeting = async (ele) => {
    const appId = 965389367;
    const serverSecret = "9fcc4a35002ba155b53cf38be21ec0a7";
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appId,
      serverSecret,
      props.vid.chatId,
      userid,
      props.vid.name
    );

    const zc = ZegoUIKitPrebuilt.create(kitToken);
    zc.joinRoom({
      container: ele,
      scenario: {
        mode: ZegoUIKitPrebuilt.OneONoneCall,
      },
      showScreenSharingButton: false,
    });
  };
  return (
    <>
      <div>
        <div ref={myMeeting} />
      </div>
    </>
  );
};

export default VideoCall;
