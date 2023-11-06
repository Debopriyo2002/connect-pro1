import React, { forwardRef } from "react";
import "./Post.css";
import { Avatar } from "@material-ui/core";
import LikeCommentButton from "../components/LikeButton";
import "./Post.css";



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
        <LikeCommentButton postId={id} />



      </div>
    </div>
  );
});

export default Post;

