import React from 'react';

const Post = ({post}) => {
  return (
    <article data-cy="post" key={post._id}>
      <div class="header-container"> 
      {/* profile picture goes in here probably */}
        <div class="name-and-time-container">
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
        <div class="comment">{post.comments}</div>
      </div>

    </article>
  )
}

export default Post;
