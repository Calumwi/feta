import React, { useEffect, useState } from "react";
import Post from "../post/Post";
import { storage } from "../app/firebase";
import { ref, uploadBytes, getDownloadURL, listAll } from "firebase/storage";
import { v4 } from "uuid";
import NavBar from "../app/navbar";
import "./Feed.css";
import swal from "sweetalert";

const Feed = ({ navigate }) => {
  const [posts, setPosts] = useState([]);
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [post, setPost] = useState("");
  const [imageFile, setImageFile] = useState(null);

  const logout = () => {
    window.localStorage.removeItem("token");
    navigate("/signup");
  };

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
      swal("Something went wrong with your post");
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
        <NavBar navigate={navigate} logout={logout}/>
        <div className="feed-container">
          <div className="left-sidebar">
            <div className="imp-links">
              <a href="#">
                <img src="/images/news.png" alt="" />
                Latest News
              </a>
              <a href="#">
                <img src="/images/friends.png" alt="" />
                Friends
              </a>
              <a href="#">
                <img src="/images/group.png" alt="" />
                Groups
              </a>
              <a href="#">
                <img src="/images/marketplace.png" alt="" />
                Marketplace
              </a>
              <a href="#">
                <img src="/images/watch.png" alt="" />
                Watch
              </a>
              <a href="#">See More</a>
            </div>
            <div className="shortcut-links">
              <p>Your Shortcuts</p>
              <a href="#">
                <img src="/images/shortcut-1.png" alt="" />
                Web Developers
              </a>
              <a href="#">
                <img src="/images/shortcut-2.png" alt="" />
                Makers Students
              </a>
              <a href="#">
                <img src="/images/shortcut-3.png" alt="" />
                All Things Cheese
              </a>
              <a href="#">
                <img src="/images/shortcut-4.png" alt="" />
                Even More Cheese
              </a>
            </div>
          </div>
          <div className="main-content">
            <div className="write-post-container">
              <div className="user-profile">
                {imageList.map((url) => {
                  return (
                    <img className="nav-icon-img" src={url} alt="ProfilePic" />
                  );
                })}
                <div>
                  <p>Gromit</p>
                  <small>Public</small>
                </div>
              </div>
              <div className="post-input-container">
                <h3>
                  <textarea
                    rows="3"
                    placeholder="What's on your mind?"
                    id="post"
                    type="text"
                    value={post}
                    onChange={handlePostChange}
                  />
                  <div className="add-post-links">
                    <a href="#">
                      <img src="images/live-video.png" alt="" />
                      Live Video
                    </a>
                    <a href="#">
                      <div className="image-upload">
                      <label for="file-input">
                        <img src="images/photo.png" alt="" />
                      </label>
                        <input
                          id="file-input"
                          type="file"
                          onChange={(event) => {
                            setImageFile(event.target.files[0]);
                          }}
                        />
                      </div>
                      Photos
                    </a>
                    <a href="#">
                      <img src="images/feeling.png" alt="" />
                      Feeling/Activity
                    </a>
                  </div>
                  <button id="submit" onClick={handleSubmit}>
                    {" "}
                    Post
                  </button>
                </h3>
              </div>
            </div>
            <div className="post-container">
              <div id="feed" role="feed">
                {posts.map((post) => (
                  <Post post={post} key={post._id} />
                ))}
              </div>
            </div>
          </div>
          <div className="right-sidebar">
            <div className="sidebar-title">
              <h3>Events</h3>
              <a href="#">See All</a>
            </div>
            <div className="event">
              <div className="left-event">
                <h3>11</h3>
                <span>November</span>
              </div>
              <div className="right-event">
                <h4>Musk Takeover</h4>
                <p>Feta Inc, Melon Park</p>
                <a href="#">More Info</a>
              </div>
            </div>
            <div className="event">
              <div className="left-event">
                <h3>12</h3>
                <span>November</span>
              </div>
              <div className="right-event">
                <h4>Fire Everyone</h4>
                <p>Feta Inc, Melon Park</p>
                <a href="#">More Info</a>
              </div>
            </div>
            <div className="sidebar-title">
              <h3>Advertisement</h3>
              <a href="#">Close</a>
            </div>
            <img src="ilhftjha4ew71.webp" alt="" className="ads" />
            <div className="sidebar-title">
              <h3>Conversations</h3>
              <a href="#">Hide Chat</a>
            </div>
            <div className="online-list">
              <div className="online">
                <img src="/images/member-1.png" alt="" />
              </div>
              <p>Alison Mina</p>
            </div>
            <div className="online-list">
              <div className="online">
                <img
                  src="elon-musk-file-rt-jef-221004_1664903580364_hpMain_4x5_992.jpeg"
                  alt=""
                />
              </div>
              <p>Elon Musk</p>
            </div>
            <div className="online-list">
              <div className="online">
                <img src="/images/member-3.png" alt="" />
              </div>
              <p>Jasmine Rose</p>
            </div>
          </div>
        </div>
      </>
    );
  } else {
    navigate("/signup");
  }
};

export default Feed;
