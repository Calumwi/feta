import React, { useState } from 'react';

const SignUpForm = ({ navigate }) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    fetch( '/users', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email, password: password })
    })
      .then(response => {
        if(response.status === 201) {
          navigate('/login')
        } else {
          navigate('/signup')
        }
      })
  }

  const handleEmailChange = (event) => {
    setEmail(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  // const toggleEl = (event) => {
  //   document.querySelector('.img__btn').onClick('click', function() {
  //     document.querySelector('.cont').classList.toggle('s--signup');
  //   });
  // };
  

  /*var Button = React.createClass({
    shouldComponentUpdate: function(nextProps, nextState) {
      return .cont.s--signup, {
        content;
        shallowCompare;
      }
    }
  });*/

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
      <div className="form sign-in">
        <h2>Welcome back,</h2>
        <label>
          <span>Email</span>
          <input type="email" />
        </label>
        <label>
          <span>Password</span>
          <input type="password" />
        </label>
        <p className="forgot-pass">Forgot password?</p>
        <button type="button" className="submit">Sign In</button>
      </div>
      <div className="sub-cont">
        <div className="img">
          <div className="img__text m--up">
            <h2>New here?</h2>
            <p>Sign up and discover great amount of new opportunities!</p>
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
          <label>
            <span>Name</span>
            <input type="text" />
          </label>
          <label>
            <span>Email</span>
            <input type="email" />
          </label>
          <label>
            <span>Password</span>
            <input type="password" />
          </label>
          <button type="button" className="submit">Sign Up</button>
        </div>
      </div>
    </div>
        
        
         {/* <form onSubmit={handleSubmit}>
            <input placeholder="Email" id="email" type='text' value={ email } onChange={handleEmailChange} />
            <input placeholder="Password" id="password" type='password' value={ password } onChange={handlePasswordChange} />
          <input id='submit' type="submit" value="Submit" />
        </form>  */}
      </div>
    );
};


export default SignUpForm;
