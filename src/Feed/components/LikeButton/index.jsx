
import React, { useState, useEffect } from 'react';
import { AiFillLike } from 'react-icons/ai';
import { AiOutlineLike } from 'react-icons/ai';
import { AiOutlineComment } from 'react-icons/ai';
import { TiDeleteOutline } from 'react-icons/ti';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../../features/userSlice';
import { db } from '../../../firebase';


import './index.css';
import {
  collection,
  addDoc,
  query,
  where,
  onSnapshot,
  getDocs,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  getDoc,

} from 'firebase/firestore';
import { deleteDoc } from 'firebase/firestore';


export default function LikeCommentButton({ postId }) {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);


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
          name: user.displayName,
          // avatar: user.photoUrl,
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
    if (user && postId) {
      const docRef = doc(db, 'posts', postId);
      getDoc(docRef)
        .then((docSnapshot) => {
          if (docSnapshot.exists()) {
            const postData = docSnapshot.data();
            setLikesCount(postData.likes.length);
            setIsLiked(postData.likes.includes(user.uid));
          }
        })
        .catch((error) => {
          console.error('Error checking if the post is liked: ', error);
        });
    }
  }, [user, postId]);

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

  const handleLike = () => {
    if (user && postId) {
      if (isLiked) {

        updateDoc(doc(db, 'posts', postId), {
          likes: arrayRemove(user.uid),
        })
          .then(() => {
            console.log('Unliked!');
            setIsLiked(false);
            setLikesCount(likesCount - 1);
          })
          .catch((error) => {
            console.error('Error unliking the post: ', error);
          });
      } else {

        updateDoc(doc(db, 'posts', postId), {
          likes: arrayUnion(user.uid),
        })
          .then(() => {
            console.log('Liked!');
            setIsLiked(true);
            setLikesCount(likesCount + 1);
          })
          .catch((error) => {
            console.error('Error liking the post: ', error);
          });
      }
    }
  };

  const buttonClass = isLiked ? 'liked' : '';

  return (

    <div className={`Like-container `} >

      <p>{likesCount} People Like this Post</p>
      {/* <div className="comment-count">
        <p> {commentCount} comments</p>
      </div> */}

      <div className='hr-line'>
        <hr />
      </div>
      <div className='like-comment'>
        <div className="like-comment-inner" onClick={handleLike}>
          {isLiked ? (
            <AiFillLike size={22} color="#0a66c2" />
          ) : (
            <AiOutlineLike size={22} />
          )}
          <p>{isLiked ? 'Liked' : 'Like'}</p>
        </div>
        <div className="like-comment-inner">
          <AiOutlineComment
            size={22}
            onClick={() => setIsCommentInputVisible(!isCommentInputVisible)}
          />
          <p>Comment</p>
        </div>
      </div>

      {isCommentInputVisible && (

        <input
          placeholder='Add a Comment'
          className='comment-input'
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          onKeyPress={handleKeyPress}
        />


      )}
      <div className="comments-list">
        {comments.map((comment) => (
          <div
            key={comment.id}
            className="comment"
            onMouseEnter={() => handleMouseEnter(comment.id)}
            onMouseLeave={() => handleMouseLeave(comment.id)}
          >

            <p> {comment.name}: {comment.comment}  </p>


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
    </div>


  );
}

