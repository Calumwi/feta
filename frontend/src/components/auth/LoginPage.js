// import React, { useState } from "react";
// import swal from "sweetalert";
// import { SignUpForm } from "../user/SignUpPage";

// const LoginPage = ({ navigate }) => {
//   const logout = () => {
//     window.localStorage.removeItem("token");
//     navigate("/signup");
//   };

//   const toggleEl = function () {
//     document.querySelector(".cont").classList.toggle("s--signup");
//   };

//   return (
//     <div id="container">
//       <div id="post-page">
//         <div className="topnav">
//           <div className="topnav-centered">
//             <a href="/posts" className="active">
//               Feed
//             </a>
//           </div>
//           <div className="topnav-right">
//             <button onClick={logout}>Logout</button>
//           </div>
//         </div>
//       </div>

//       <div className="cont">
//         <div className="form sign-in">
//           <SignUpForm navigate={navigate} toggleEl={toggleEl} />
//           <h3>Thanks For Signing up, please log-in</h3>
//         </div>
//         <div className="sub-cont">
//           <div className="img">
//             <div className="img__text m--up">
//               <h2>One of us?</h2>
//               <p>
//                 If you already has an account, just sign in. We've missed you!
//               </p>
//             </div>
//             <div className="img__text m--in">
//               <h2>New here?</h2>
//               <p>Sign up and join the world of cheese lovers!</p>
//             </div>
//             <div className="img__btn" onClick={toggleEl}>
//               <span className="m--up">Log In</span>
//               <span className="m--in">Sign Up</span>
//             </div>
//           </div>
//           <div className="form sign-up">
//             <LoginForm navigate={navigate} />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export const LoginForm = ({ navigate }) => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     let response = await fetch("/tokens", {
//       method: "post",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ email: email, password: password }),
//     });

//     if (response.status !== 201) {
//       console.log("oop");
//       navigate("/signup");
//       swal("Oops!", "Something went wrong!", "error");
//     } else {
//       console.log("yay");
//       let data = await response.json();
//       window.localStorage.setItem("token", data.token);
//       navigate("/posts");
//     }
//   };

//   const handleEmailChange = (event) => {
//     setEmail(event.target.value);
//   };

//   const handlePasswordChange = (event) => {
//     setPassword(event.target.value);
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <h2>Welcome Back</h2>
//       <label>
//         <span>Email</span>
//         <input
//           id="email"
//           type="text"
//           value={email}
//           onChange={handleEmailChange}
//         />
//       </label>
//       <label>
//         <span>Password</span>
//         <input
//           id="password"
//           type="password"
//           value={password}
//           onChange={handlePasswordChange}
//         />
//       </label>
//       <p className="forgot-pass">Forgot password?</p>
//       <button id="submit" type="submit" className="submit" value="Submit">
//         Log In
//       </button>
//     </form>
//   );
// };

// export default LoginPage;
