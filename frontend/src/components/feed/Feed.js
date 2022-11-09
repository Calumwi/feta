import React, { useEffect, useState } from "react";
import Post from "../post/Post";
import { storage } from "../app/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";

const Feed = ({ navigate }) => {
  const [posts, setPosts] = useState([]);
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [post, setPost] = useState("");
  const [imageFile, setImageFile] = useState(null);

  const logout = () => {
    window.localStorage.removeItem("token");
    navigate("/signup");
  };

  const getPosts = () => {
    if (token) {
      fetch("/posts", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          window.localStorage.setItem("token", data.token);
          setToken(window.localStorage.getItem("token"));
          setPosts(data.posts);
        });
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  const sendPost = async (url) => {
    console.log(post);
    console.log(url);
    let response = await fetch("/posts", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ message: post, date: Date.now(), img: url }),
    });

    if (response.status === 201) {
      console.log("yay");
      getPosts();
    } else {
      console.log("oop");
      alert("Something went wrong with your post");
    }
  };

  const handlePostChange = (event) => {
    setPost(event.target.value);
  };

  const uploadImage = () => {
    if (imageFile == null) return;
    const imageRef = ref(storage, `images/posts/${imageFile.name + v4()}`);
    return uploadBytes(imageRef, imageFile).then((snapshot) =>
      getDownloadURL(snapshot.ref)
    );
  };

  const handleSubmit = () => {
    if (imageFile) {
      uploadImage().then(sendPost);
    } else {
      sendPost();
    }
  };

  if (token) {
    return (
      <>
        <div id="post-page">
          <div className="topnav">
            <div className="topnav-centered">
              <a href="/posts" className="active">
                Feed
              </a>
            </div>
            <div className="topnav-right">
              <button onClick={logout}>Logout</button>
            </div>
          </div>
          <h2>Posts</h2>

          <h3>
            <input
              placeholder="Post"
              id="post"
              type="text"
              value={post}
              onChange={handlePostChange}
            />
            <input
              type="file"
              onChange={(event) => {
                setImageFile(event.target.files[0]);
              }}
            />
            <button onClick={handleSubmit}> Post.</button>
          </h3>

          <div id="feed" role="feed">
            {posts.map((post) => (
              <Post post={post} key={post._id} />
            ))}
          </div>
        </div>
      </>
    );
  } else {
    navigate("/login");
  }
};

export default Feed;
