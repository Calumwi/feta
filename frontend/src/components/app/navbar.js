import { useEffect, useState } from "react";
import { ref, listAll, getDownloadURL } from "firebase/storage";
import { storage } from "../app/firebase";
import { v4 } from "uuid";
import "./navbar.css";

export const NavBar = ({ logout }) => {
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

  return (
    <>
      <nav>
        <div className="topnav-left">
          <img src="feta_logo_2.png" alt="profilePic" className="feta-logo" />
          <ul>
            <li>
              <img src="/images/notification.png" alt="" />
            </li>
            <li>
              <img src="/images/inbox.png" alt="" />
            </li>
            <li>
              <img src="/images/video.png" alt="" />
            </li>
          </ul>
        </div>
        <div className="topnav-centered"></div>
        <div className="topnav-right">
          <div className="search-box">
            <img src="search-icon-png-21.png" alt="" />
            <input type="text" placeholder="Search" />
          </div>
          <div className="nav-user-icon online">
            {imageList.map((url) => {
              return (
                <img className="nav-icon-img" src={url} alt="ProfilePic" />
              );
            })}
          </div>
          <button onClick={logout}>Logout</button>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
