// import React, { useState } from 'react';
// import { AiOutlineLike } from 'react-icons/ai';
// import { useDispatch, useSelector } from 'react-redux';
// import { selectUser } from '../../../features/userSlice';
// import { db } from '../../../firebase'; // Assuming your Firebase setup is correct
// import './index.css';
// import { collection, doc, updateDoc, arrayUnion } from 'firebase/firestore';


// export default function LikeButton({ postId }) {
//   const user = useSelector(selectUser);
//   const dispatch = useDispatch();
//   const [isLiked, setIsLiked] = useState(false);

//   const handleLike = () => {
//     if (!isLiked) {
//       // Use arrayUnion to add the user ID to the likes field of the specific post document
//       console.log(postId, user.uid);
//       db.collection('posts')
//         .doc(postId)
//         .update({
//           likes: arrayUnion(user.uid),
//         })
//         .then(() => {
//           console.log('Liked!');
//           setIsLiked(true);
//         })
//         .catch((error) => {
//           console.error('Error liking the post: ', error);
//         });
//     }
//   };

//   return (
//     <div className="Like-container" onClick={handleLike}>
//       <AiOutlineLike size={22} />
//       <p>{isLiked ? 'Liked' : 'Like'}</p>
//     </div>
//   );
// }


import React, { useState, useEffect } from 'react';
import { AiOutlineLike } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../../features/userSlice';
import { db } from '../../../firebase'; // Assuming your Firebase setup is correct
import './index.css';
import { collection, doc, updateDoc, arrayUnion, arrayRemove, getDoc } from 'firebase/firestore';

export default function LikeButton({ postId }) {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [isLiked, setIsLiked] = useState(false);

  // Check if the user has already liked the post
  useEffect(() => {
    if (user && postId) {
      const docRef = doc(db, 'posts', postId);
      getDoc(docRef)
        .then((docSnapshot) => {
          if (docSnapshot.exists()) {
            const postData = docSnapshot.data();
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
            setIsLiked(false); // Change the state to unliked
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
            setIsLiked(true); // Change the state to liked
          })
          .catch((error) => {
            console.error('Error liking the post: ', error);
          });
      }
    }
  };

  return (
    <div className="Like-container" onClick={handleLike}>
      <AiOutlineLike size={22} />
      <p>{isLiked ? 'Liked' : 'Like'}</p>
    </div>
  );
}
