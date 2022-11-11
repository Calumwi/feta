import React, { useState } from "react";
// import { LoginForm } from "../auth/LoginPage";
import { storage } from "../app/firebase";
import { ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import swal from "sweetalert";

const SignUpPage = ({ navigate }) => {

  const toggleEl = () => {
    document.querySelector(".cont").classList.toggle("s--signup");
  };

  return (
    <>
      <div id="container">
        <div id="post-page"></div>

        <div className="cont">
          <div className="form sign-in">
            <SignUpForm navigate={navigate} toggleEl={toggleEl} />
          </div>
          <div className="sub-cont">
            <div className="img">
              <div className="img__text m--up">
                <h2>One of us?</h2>
                <p>
                  If you already has an account, just sign in. We've missed you!
                </p>
              </div>
              <div className="img__text m--in">
                <h2>New here?</h2>
                <p>Sign up and join the world of cheese lovers!</p>
              </div>
              <div className="img__btn" onClick={toggleEl}>
                <span className="m--up">Log In</span>
                <span className="m--in">Sign Up</span>
              </div>
            </div>
            <div className="form sign-up">
              <LoginForm navigate={navigate} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const SignUpForm = ({ navigate, toggleEl }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [imageUpload, setimageUpload] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    fetch("/users", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
      }),
    }).then((response) => {
      if (response.status !== 201) {
        navigate("/signup");
      } else {
        toggleEl();
      }
    });
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const uploadImage = () => {
    if (imageUpload == null) return;
    const imageRef = ref(
      storage,
      `images/profilepic/${imageUpload.name + v4()}`
    );
    uploadBytes(imageRef, imageUpload).then(() => swal("Image Uploaded"));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Welcome To Acebook</h2>
      <label>
        <span>Name</span>
        <input id="name" type="text" value={name} onChange={handleNameChange} />
      </label>
      <label>
        <span>Email</span>
        <input
          id="email"
          type="text"
          value={email}
          onChange={handleEmailChange}
        />
      </label>
      <label>
        <span>Password</span>
        <input
          id="password"
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />
      </label>
      <p className="forgot-pass">Forgot password?</p>
      <form action="/upload" method="POST" enctype="multipart/form-data">
        <label>
          <span>Profile Pic:</span>
          <input
            type="file"
            name="file"
            id="myFile"
            multiple
            size="50"
            onChange={(event) => {
              setimageUpload(event.target.files[0]);
            }}
          />
        </label>
      </form>
      <button
        id="submit"
        type="submit"
        className="submit"
        value="Submit"
        onClick={uploadImage}
      >
        Sign Up
      </button>
    </form>
  );
};

export const LoginForm = ({ navigate }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (event) => {
    event.preventDefault();

    let response = await fetch("/tokens", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password }),
    });

    if (response.status !== 201) {
      console.log("oop");
      navigate("/signup");
      swal("Oops!", "Something went wrong!", "error");
    } else {
      console.log("yay");
      let data = await response.json();
      window.localStorage.setItem("token", data.token);
      navigate("/posts");
    }
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Welcome Back</h2>
      <label>
        <span>Email</span>
        <input
          id="email"
          type="text"
          value={email}
          onChange={handleEmailChange}
        />
      </label>
      <label>
        <span>Password</span>
        <input
          id="password"
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />
      </label>
      <p className="forgot-pass">Forgot password?</p>
      <button id="submit" type="submit" className="submit" value="Submit">
        Log In
      </button>
    </form>
  );
};

export default SignUpPage;
