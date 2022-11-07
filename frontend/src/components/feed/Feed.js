import React, { useEffect, useState } from 'react';
import Post from '../post/Post'
import { storage } from "../app/firebase";
import { ref, uploadBytes, listAll, getDownloadURL } from 'firebase/storage';
import { v4 } from 'uuid';

const Feed = ({ navigate }) => {
  const [posts, setPosts] = useState([]);
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [post, setPost] = useState("");

  const getPosts = () => {
    console.log('is there a token?')
    console.log(token)
    if(token) {
      console.log('fetch request now:')
      console.log(token)
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
  }

  useEffect(() => {
    getPosts();
  }, [])
    
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(post)
    if (!post) {
      alert("post is blank");
    } else {
      let response = await fetch( '/posts', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ message: post, date: Date.now()})
      });

      if(response.status === 201) {
        console.log("yay")
        getPosts();
      } else {
        console.log("oop")
        // error message goes here
      }
    }
  }

  const handlePostChange = (event) => {
    setPost(event.target.value)
  }

  const logout = () => {
    window.localStorage.removeItem("token")
    navigate('/signup')
  }

  const [imageUpload, setImageUpload] = useState(null);
  const [imageList, setImageList] = useState([]);

  const imageListRef = ref(storage, "images/")
  const uploadImage = () => {
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
          
          <div id='feed' role="feed">
            <h1>
              {imageList.map((url) => {
                return <img src={url} />
              })}

              {posts.map(
                (post) => ( <Post post={ post } key={ post._id } /> )
              )}

              
            </h1>
          </div>
            <br />
          <div id="submit-post">
            <h2>Posts</h2>
            <h3>
              <form onSubmit={ handleSubmit }>
                <input placeholder='Post' id="post" type='text' value={ post } onChange={ handlePostChange } />
                <button role='submit-button' id='submit' type="submit" value="Submit">Submit</button>
              </form>
            </h3>
          </div>
          <div id="add-img">
            <input type="file" onChange={ (event) => {setImageUpload(event.target.files[0])}} />
            <button id="submit" onClick={ uploadImage }>Upload Image</button>
            
          </div>
        </div>
        
        {/* <a class="login-trigger" href="#" data-target="#login" data-toggle="modal">Add Post</a>
          <div id="login" class="modal fade" role="dialog">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-body">
                  <button data-dismiss="modal" class="close">&times;</button>
                  <h4>Add Post</h4>
                  <form>
                    <input type="text" name="new-post" class="username form-control" placeholder="What do you want to say?"/>
                    <input class="btn login" type="submit" value="Add Post" />
                  </form>
                </div>
              </div>
            </div>  
          </div> */}
        </>
      )
    } else {
      navigate('/login')
    }
  }


export default Feed;