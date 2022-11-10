import React, { useEffect, useState } from "react";
import Comment from '../comment/Comment';


const Post = ({post}) => {
  const [comments, setComments] = useState([]);
  const [token, setToken] = useState(window.localStorage.getItem("token"));

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
    getComments();
  }, []);

  return (
    <article data-cy="post" key={post._id}>
      <div class="header-container"> 
      {/* profile picture goes in here probably */}
        <div class="name-and-time-container">
          {/* <div class="name">{post.user}</div> */}
          <div class="timestamp">{post.date}</div>
        </div>
      </div>

      <div class="message-container">
        <div class="message">{post.message}</div>
        </div>
      
      <div class="post-image-container">
        <img class="post-image" src={post.img} alt='' />
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
