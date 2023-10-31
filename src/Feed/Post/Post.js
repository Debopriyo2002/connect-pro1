import React, { forwardRef } from "react";
import "./Post.css";
import ThumbUpAltOutlinedIcon from "@material-ui/icons/ThumbUpAltOutlined";
import ShareOutlinedIcon from "@material-ui/icons/ShareOutlined";
import ChatOutlinedIcon from "@material-ui/icons/ChatOutlined";
import SendOutlinedIcon from "@material-ui/icons/SendOutlined";
import { Avatar } from "@material-ui/core";
import InputOptions from "../InputOptions/InputOptions";
import LikeButton from "../components/LikeButton";
// import CommentButton from "../components/comments";
import { useEffect } from "react";


const Post = forwardRef(({ id, name, description, message, photoUrl }, ref) => {

  return (
    <div ref={ref} className="post">
      <div className="post-header">
        <Avatar src={photoUrl}>{name[0]}</Avatar>

        <div className="post-info">
          <h2>{name}</h2>
          <p>{description}</p>
        </div>
      </div>

      <div className="post-body">
        <p>{message}</p>
      </div>

      <div className="post-buttons">

        <LikeButton postId={id}>
        </LikeButton>
        {/* <CommentButton postId={id} /> */}
        {/* <CommentButton postId={id}>

        </CommentButton> */}



      </div>
    </div>
  );
});

export default Post;

