

import React, { useState, useEffect } from 'react';
import { AiFillLike } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../../features/userSlice';
import { db } from '../../../firebase';
import './index.css';
import {
  collection,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  getDoc,
} from 'firebase/firestore';

export default function LikeButton({ postId }) {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);

  // Check if the user has already liked the post and get likes count
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

  const handleLike = () => {
    if (user && postId) {
      if (isLiked) {
        // If the user has already liked the post, remove their like
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
        // If the user has not liked the post, add their like
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

  const buttonClass = isLiked ? 'liked' : ''; // Add 'liked' class when isLiked is true

  return (
    <div className={`Like-container ${buttonClass}`} onClick={handleLike}>


      <AiFillLike size={22} />
      <p>{isLiked ? 'Liked' : 'Like'}</p>
      <p>{likesCount} Likes</p>

    </div>
  );
}
