import React, { useEffect, useState } from "react";
import { storage } from "../app/firebase";
import { ref, uploadBytes, getDownloadURL, listAll } from "firebase/storage";
import "./Comment.css";

const Comment = ({ comment }) => {
  const [imageList, setImageList] = useState([]);
  const imageListRef = ref(storage, `images/profilepic/defaultprofilepics/`);

  const moment = require("moment");
  let now = moment(comment.date);

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
    <div className="all-comments">
      <article data-cy="comment" key={comment._id}>
        <div className="user-profilec">
          {imageList.map((url) => {
            return <img className="nav-icon-img" src={url} alt="ProfilePic" />;
          })}
          <div>
            <p>Gromit</p>
          </div>
        </div>
        <div className="message-container">
          <div className="cmessage">{comment.message}</div>
        </div>
        <div class="name-and-time-container">
          <div className="timestamp">
            <span>{now.format("ddd, hA")}</span>
          </div>
        </div>
      </article>
    </div>
  );
};

export default Comment;
