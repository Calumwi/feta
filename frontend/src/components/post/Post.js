import React, { useEffect, useState } from "react";
import './Post.css'
import { storage } from "../app/firebase";
import { ref, uploadBytes, getDownloadURL, listAll } from "firebase/storage";
import Comment from '../comment/Comment';



const Post = ({post}) => {
  const moment = require('moment');
  let now = moment(post.date);

  const [imageList, setImageList] = useState([]);
  const imageListRef = ref(storage, `images/profilepic/defaultprofilepics/`);
  const [comments, setComments] = useState([]);
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [comment, setComment] = useState("");

  const getComments = (id) => {
    if (token) {
      fetch(`/comment?post_id=${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          window.localStorage.setItem("token", data.token);
          setToken(window.localStorage.getItem("token"));
          setComments(data.comments);
        });
    }
  };

  useEffect(() => {
    listAll(imageListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageList([url]);
          getComments();
        }, []);
      });
    });
  });

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const sendComment = async (url) => {
    console.log(post);
    console.log(url);
    let response = await fetch("/comment", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ message: comment, date: Date.now() }),
    });

    if (response.status === 201) {
      console.log("yay");
      getComments();
    } else {
      console.log("oop");
      alert("Something went wrong with your comment");
    }
  };

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

      <div class="comment-box-container">
        <div class="comment-box">
            <input
              placeholder="Disagree here"
              id="comment"
              type="text"
              value={comment}
              onChange={handleCommentChange}
            />
            <button onClick={sendComment}> send </button>
            </div>
      </div>

      <div class="comment-container">
        <div id="commentfeed" role="feed">
            {comments.map((comment) => (
              <Comment comment={comment} key={comment._id} />
            ))}
          </div>
      </div>

    </article>
  )
}

export default Post;
