import React, { useState } from 'react';

const SignUpForm = ({ navigate }) => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profilep, setProfilep] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    fetch( '/users', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: name, email: email, password: password, profilep: profilep })
    })
      .then(response => {
        if(response.status !== 201) {
          navigate('/signup')
        } else {
          navigate('/login')
        }
      })
  }

  const handleSubmitL = async (event) => {
    event.preventDefault();

    let response = await fetch( '/tokens', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email, password: password })
    })

    if(response.status !== 201) {
      console.log("oop")
      navigate('/signup')
      alert("Invalid Details!")
    } else {
      console.log("yay")
      let data = await response.json()
      window.localStorage.setItem("token", data.token)
      navigate('/posts');
    }
  }

  const handleNameChange = (event) => {
    setName(event.target.value)
  }

  const handleEmailChange = (event) => {
    setEmail(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const handleProfilepChange = (event) => {
   setProfilep(event.target.value)
  }

  const logout = () => {
    window.localStorage.removeItem("token")
    navigate('/signup')
  }


  const toggleEl = ('click', function() {
    document.querySelector('.cont').classList.toggle('s--signup');
  });


  // function myFunction(){
  //   var x = document.getElementById("myFile");
  //   var txt = "";
  //   if ('files' in x) {
  //     if (x.files.length === 0) {
  //       txt = "Select one or more files.";
  //     } else {
  //       for (var i = 0; i < x.files.length; i++) {
  //         txt += "<br><strong>" + (i+1) + ". file</strong><br>";
  //         var file = x.files[i];
  //         if ('name' in file) {
  //           txt += "name: " + file.name + "<br>";
  //         }
  //         if ('size' in file) {
  //           txt += "size: " + file.size + " bytes <br>";
  //         }
  //       }
  //     }
  //   } 
  //   else {
  //     if (x.value === "") {
  //       txt += "Select one or more files.";
  //     } else {
  //       txt += "The files property is not supported by your browser!";
  //       txt  += "<br>The path of the selected file: " + x.value; // If the browser does not support the files property, it will return the path of the selected file instead. 
  //     }
  //   }
  //   document.getElementById("demo").innerHTML = txt;
  // };

    
    return (
      <div id="container">
        <div id="post-page">
            <div className="topnav">
              <div className="topnav-centered">
                <a href="/posts" className="active">Feed</a>
              </div>
              <div className="topnav-right">
                <button onClick={ logout }>Logout</button>
              </div>
            </div>
        </div>
        
        <div className="cont">
      
      <div className="form sign-in">
      <form onSubmit={handleSubmit}>
      <h2>Welcome To Acebook</h2>
        <label>
            <span>Name</span>
            <input id="name" type='text' value={ name } onChange={handleNameChange} />
        </label>
        <label>
            <span>Email</span>
            <input id="email" type='text' value={ email } onChange={handleEmailChange} />
        </label>
        <label>
            <span>Password</span>
            <input id="password" type='password' value={ password } onChange={handlePasswordChange} />
          </label>
        <p className="forgot-pass">Forgot password?</p>
        <form action="/upload" method="POST" enctype="multipart/form-data">
          <label>
            <span>Profile Pic:</span>
            <input type="file" name="file" id="myFile"  multiple size="50" onChange={handleProfilepChange} />
          </label>
        </form>
        <button id='submit' type="submit" className="submit" value="Submit">Sign Up</button>
      </form>
      </div>
      <div className="sub-cont">
        <div className="img">
          <div className="img__text m--up">
            <h2>One of us?</h2>
            <p>If you already has an account, just sign in. We've missed you!</p>
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
        <form onSubmit={handleSubmitL}>
        <div className="form sign-up">
          <h2>Welcome Back</h2>
          <label>
            <span>Email</span>
            <input type="email" />
          </label>
          <label>
            <span>Password</span>
            <input type="password" />
          </label>
          <button id='submit' type="submit" className="submit" value="Submit">Log In</button>   
          {/* <p id="demo"></p> */}
        </div>
        </form>
      </div>
    </div>
    </div>  
  );
};


export default SignUpForm;


