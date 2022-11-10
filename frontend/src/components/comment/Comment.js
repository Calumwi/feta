import React from 'react';

const Comment = ({comment}) => {
  return (
    <article data-cy="comment" key={comment._id}>
       <div class="header-container"> 
        {/* profile picture goes in here probably */}
      <div class="name-and-time-container">
        {/* <div class="name">{post.user}</div> */}
        <div class="timestamp">{comment.date}</div>
      </div>
      </div>
      <div class="message-container">
        <div class="message">{comment.message}</div>
      </div>
    </article>
  )
}

export default Comment;