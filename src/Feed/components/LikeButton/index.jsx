 import React from 'react'
//  import "./src/Feed/components/LikeButton/index.scss"
 import {AiOutlineLike} from "react-icons/ai";
 import "./index.css"
 
 export default function LikeButton() {
   return (
     <div className='Like-container'>
        <AiOutlineLike size={25}/>
        <p>Like</p>
       
     </div>
   )
 }
 