import React, { useEffect, useState } from "react";
import './Post.css'
import { storage } from "../app/firebase";
import { ref, uploadBytes, getDownloadURL, listAll } from "firebase/storage";
// import User from 'user'



const Post = ({post}) => {
  const moment = require('moment');
  let now = moment(post.date);

  const [imageList, setImageList] = useState([]);
  const imageListRef = ref(storage, `images/profilepic/defaultprofilepics/`);

  useEffect(() => {
    listAll(imageListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageList([url]);
        });
      });
    });
  });

  return (
    <article data-cy="post" key={post._id}>
      <div class="header-container"> 
      <div className="user-profile">
          {imageList.map((url) => {
            return (
              <img className="nav-icon-img" src={url} alt="ProfilePic" />
            );
          })}
      </div>
      <p>Username Placeholder</p>
     
      </div>

      <div class="message-container">
        <div class="message">{post.message}</div>
      </div>

      <div class="name-and-time-container">
          <span>{now.format("dddd, MMM Do YYYY, h:mm a")}</span>
      </div>
      
      <div class="post-image-container">
        <img class="post-image" src={post.img} alt='' />
      </div>
    </article>
  )
}

export default Post;
