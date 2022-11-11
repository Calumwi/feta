import React, { useEffect, useState } from "react";
import "./Post.css";
import { storage } from "../app/firebase";
import { ref, uploadBytes, getDownloadURL, listAll } from "firebase/storage";
import swal from "sweetalert";

import Comment from "../comment/Comment";

const Post = ({ post }) => {
  const moment = require("moment");
  let now = moment(post.date);

  const [imageList, setImageList] = useState([]);
  const imageListRef = ref(storage, `images/profilepic/defaultprofilepics/`);
  const [comments, setComments] = useState([]);
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [comment, setComment] = useState("");

  const getComments = (id) => {
    if (token) {
      fetch(`/comments?post_id=${id}`, {
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
        });
      });
    });
  });

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const sendComment = async (url) => {
    console.log(comment);
    let response = await fetch("/comments", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        message: comment,
        date: Date.now(),
        post: post._id,
      }),
    });

    if (response.status === 201) {
      console.log("yay");
      getComments(post._id);
    } else {
      console.log("oop");
      swal("Something went wrong with your comment");
    }
  };

  return (
    <article data-cy="post" key={post._id}>
      <div class="post-container">
        <div className="user-profile">
          {imageList.map((url) => {
            return <img className="nav-icon-img" src={url} alt="ProfilePic" />;
          })}
          <div>
            <p>Wallace</p>
          </div>
        </div>
      </div>

      <div class="message-container">
        <div class="message">{post.message}</div>
      </div>

      <div class="post-image-container">
        <img class="post-image" src={post.img} alt="" />
      </div>

      <div class="name-and-time-container">
        <span>{now.format("ddd, hA")}</span>
      </div>
      <div className="post-row">
        <div className="add-likes">
          <div>
            <img src="feta_like.png" alt="" />
          </div>
        </div>
      </div>

      <div class="comment-box-container">
        <div class="comment-box">
          <textarea
            placeholder="Disagree here"
            id="comment"
            type="text"
            value={comment}
            onChange={handleCommentChange}
          />
          <button id="submitc" onClick={sendComment}>
            Post Comment
          </button>
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
  );
};

export default Post;
