import React, { useEffect, useState } from 'react';
import Post from '../post/Post'
import { storage } from "../app/firebase";
import { ref, uploadBytes, listAll, getDownloadURL } from 'firebase/storage';
import { v4 } from 'uuid';

const Feed = ({ navigate }) => {
  const [posts, setPosts] = useState([]);
  const [token, setToken] = useState(window.localStorage.getItem("token"));

  useEffect(() => {
    if(token) {
      fetch("/posts", {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then(response => response.json())
        .then(async data => {
          window.localStorage.setItem("token", data.token)
          setToken(window.localStorage.getItem("token"))
          setPosts(data.posts);
        })
    }
  }, [])
    

  const logout = () => {
    window.localStorage.removeItem("token")
    navigate('/signup')
  }

  const [imageUpload, setImageUpload] = useState(null);
  const [imageList, setImageList] = useState([]);

  const imageListRef = ref(storage, "images/")
  const uplaodImage = () => {
    if (imageUpload === null) return;
    const imageref = ref(storage, `images/${imageUpload.name + v4()}`);
    uploadBytes(imageref, imageUpload).then(() => {
      alert("Image uploaded")
    })
  };

  useEffect(() => {
    listAll(imageListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageList((prev) => [...prev, url]);
        })
      })
    })
  }, [])
  
    if(token) {
      return(
        <>
        <div id="post-page">
          <div className="topnav">
            <div className="topnav-centered">
              <a href="/posts" className="active">Feed</a>
            </div>
            <div className="topnav-right">
              <button onClick={ logout }>Logout</button>
            </div>
          </div>
          <h2>Posts</h2>
          <div id='feed' role="feed">
              {posts.map(
                (post) => ( <Post post={ post } key={ post._id } /> )
              )}
            <input type="file" onChange={ (event) => {setImageUpload(event.target.files[0])}} />
            <button onClick={ uplaodImage }>Upload Image</button>
            {imageList.map((url) => {
              return <img src={url} />
            })}
          </div>
        </div>
        </>
      )
    } else {
      navigate('/signin')
    }
}

export default Feed;