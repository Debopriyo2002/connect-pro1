

// new modified
import React, { useEffect, useState } from 'react';
import { AiOutlineComment } from 'react-icons/ai';
import { IoSendSharp } from 'react-icons/io5';
import { TiDeleteOutline } from 'react-icons/ti';
// import { useDispatch, useSelector } from '../../../features/userSlice';
import { useSelector } from 'react-redux';
import { selectUser } from '../../../features/userSlice';
import { db } from '../../../firebase';
import './index.css';
import {
  collection,
  addDoc,
  query,
  where,
  onSnapshot,
  doc,
  deleteDoc,
} from 'firebase/firestore';

export default function CommentButton({ postId }) {
  const user = useSelector(selectUser);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [commentCount, setCommentCount] = useState(0);
  const [isCommentInputVisible, setIsCommentInputVisible] = useState(false);

  const commentsRef = collection(db, 'comments');

  const handleComment = async () => {
    if (postId && comment.trim() !== '') {
      try {
        await addDoc(commentsRef, {
          postId,
          comment,
          timeStamp: new Date(),
          name: user.displayName,
        });
        setComment('');
      } catch (error) {
        console.error('Error adding comment:', error);
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleComment();
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      const commentDocRef = doc(db, 'comments', commentId);
      await deleteDoc(commentDocRef);
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  useEffect(() => {
    const loadComments = async () => {
      try {
        const q = query(commentsRef, where('postId', '==', postId));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          const commentsData = [];
          querySnapshot.forEach((doc) => {
            commentsData.push({
              id: doc.id,
              ...doc.data(),
              isHovered: false,
            });
          });
          setComments(commentsData);
          setCommentCount(commentsData.length);
        });

        return unsubscribe;
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    loadComments();
  }, [postId]);

  const handleMouseEnter = (commentId) => {
    const updatedComments = comments.map((comment) =>
      comment.id === commentId ? { ...comment, isHovered: true } : comment
    );
    setComments(updatedComments);
  };

  const handleMouseLeave = (commentId) => {
    const updatedComments = comments.map((comment) =>
      comment.id === commentId ? { ...comment, isHovered: false } : comment
    );
    setComments(updatedComments);
  };

  return (
    <div className="Comment-container">
      <div>
        <AiOutlineComment
          size={22}
          onClick={() => setIsCommentInputVisible(!isCommentInputVisible)}
        />
      </div>

      {isCommentInputVisible && (
        <div className="comment-input-container">
          <input
            placeholder='Add a Comment'
            className='comment-input'
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            onKeyPress={handleKeyPress}
          />

          {/* <IoSendSharp
            size={18}
            color='blue'
            onClick={handleComment}
            className="comment-send-icon"
          /> */}
        </div>
      )}

      <div className="comments-list">
        {comments.map((comment) => (
          <div
            key={comment.id}
            className="comment"
            onMouseEnter={() => handleMouseEnter(comment.id)}
            onMouseLeave={() => handleMouseLeave(comment.id)}
          >
            <p>{comment.name}: {comment.comment}</p>
            {comment.isHovered && comment.name === user.displayName && (
              <TiDeleteOutline
                size={12}
                className="delete-icon"
                onClick={() => handleDeleteComment(comment.id)}
              />
            )}
          </div>
        ))}
      </div>
      <div className="comment-count">
        <p> {commentCount} comments</p>
      </div>
    </div>
  );
}



