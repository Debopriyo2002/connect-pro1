import React from "react";
import "./Header.css";
import SearchIcon from "@material-ui/icons/Search";
import HeaderOption from "../HeaderOption/HeaderOption";
import HomeIcon from "@material-ui/icons/Home";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
// import BusinessCenterIcon from "@material-ui/icons/BusinessCenter";
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import NotificationsIcon from "@material-ui/icons/Notifications";
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import { useDispatch } from "react-redux";
import { logout, selectUser } from "../features/userSlice";
import { auth } from "../firebase";
import { useSelector } from "react-redux";

function Header() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const logOutOfApp = () => {
    dispatch(logout());
    auth.signOut();
  };

  return (
    <div className="header">
      <div className="header-left">
        <img
          src="https://drive.google.com/file/d/1Q0L9Y-5drUel6Ftx33F_cZrkGonGGv-k/view"
          alt="Connect-Pro"
        />
        <div className="header-search">
          <SearchIcon />
          <input type="text" />
        </div>
      </div>
      <div className="header-right">
        <HeaderOption Icon={HomeIcon} title="Home" />
        <HeaderOption Icon={SupervisorAccountIcon} title="My Connections" />
        <HeaderOption Icon={ChatBubbleIcon} title="Messaging" />
        <HeaderOption Icon={NotificationsIcon} title="Notification" />
        <HeaderOption Icon={ThumbUpIcon} title="Recommendation" />
        <HeaderOption
          onClick={logOutOfApp}
          title={user?.displayName}
          avatar={true}
        />
      </div>
    </div>
  );
}

export default Header;
