import React, { useEffect, useState } from 'react';
import { AiOutlineComment } from 'react-icons/ai';
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
} from 'firebase/firestore';

export default function CommentButton({ postId }) {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');

  // Fetch comments for the post
  useEffect(() => {
    let unsubscribe;
    if (postId) {
      unsubscribe = db
        .collection('users')
        .doc(uid) // Replace with the appropriate user ID
        .collection('posts')
        .doc(postId)
        .collection('comments')
        .orderBy('timestamp', 'asc')
        .onSnapshot((snapshot) => {
          setComments(
            snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }))
          );
        });
    }
    return () => {
      unsubscribe();
    };
  }, [postId, uid]);

  const postComment = (event) => {
    event.preventDefault();
    if (comment.length > 0) {
      db.collection('users')
        .doc(uid) // Replace with the appropriate user ID
        .collection('posts')
        .doc(postId)
        .collection('comments')
        .add({
          text: comment,
          username: user.displayName,
          uid: user.uid,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })
        .then(() => {
          setComment('');
        });
    }
  };

  return (
    <div className="Comment-container" onClick={postComment}>
      <AiOutlineComment size={22} />
      <p>Comment</p>
    </div>
  );
}
