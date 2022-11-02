import React, { useState } from 'react';

const LogInForm = ({ navigate }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    let response = await fetch( '/tokens', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email, password: password })
    })

    if(response.status !== 201) {
      console.log("yay")
      navigate('/login')
      alert("Incorrect Password!")
    } else {
      console.log("oop")
      let data = await response.json()
      window.localStorage.setItem("token", data.token)
      navigate('/posts');
    }
  }

  const handleEmailChange = (event) => {
    setEmail(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const toggleEl = ('click', function() {
    document.querySelector('.cont').classList.toggle('s--signup');
  });


    return (
      <div id="container">
        {/* <div class="topnav">
          <div class="topnav-centered">
            <a href="/posts" class="active">Feed</a>
          </div>
          <div class="topnav-right">
            <a href="/login">Login</a>
            <a href="/logout">Logout</a>
          </div>
        </div> */}
            <div className="cont">
        <form onSubmit={handleSubmit}>
          <div className="form sign-in">
            <h2>Welcome back,</h2>
            <label>
              <span>Email</span>
              <input id="email" type='text' value={ email } onChange={handleEmailChange} />
            </label>
            <label>
              <span>Password</span>
              <input id="password" type='password' value={ password } onChange={handlePasswordChange} />
            </label>
            <p className="forgot-pass">Forgot password?</p>
            <button id='submit' type="submit" className="submit" value="Submit">Sign In</button>
          </div>
        </form>
      <div className="sub-cont">
        <div className="img">
          <div className="img__text m--up">
            <h2>New here?</h2>
            <p>Sign up and join the world of cheese lovers!</p>
          </div>
          <div className="img__text m--in">
            <h2>One of us?</h2>
            <p>If you already has an account, just sign in. We've missed you!</p>
          </div>
          <div className="img__btn" onClick={toggleEl}>
            <span className="m--up">Sign Up</span>
            <span className="m--in">Sign In</span>
          </div>
        </div>
        
        <div className="form sign-up">
          <h2>Time to feel like home,</h2>
          {/* <label>
            <span>Name</span>
            <input type="text" />
          </label> */}
          <label>
            <span>Email</span>
            <input id="email" type='text' value={ email } onChange={handleEmailChange} />
          </label>
          <label>
            <span>Password</span>
            <input id="password" type='password' value={ password } onChange={handlePasswordChange} />
          </label>
          <button id='submit' type="submit" className="submit" value="Submit">Sign Up</button>
        </div>
      </div>
    </div>
    </div>
      // <form onSubmit={handleSubmit}>
      //   <input placeholder='Email' id="email" type='text' value={ email } onChange={handleEmailChange} />
      //   <input placeholder='Password' id="password" type='password' value={ password } onChange={handlePasswordChange} />
      //   <input role='submit-button' id='submit' type="submit" value="Submit" />
      // </form>
    );
}

export default LogInForm;
