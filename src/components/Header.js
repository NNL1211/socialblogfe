import noImg from "../img/no-image.png";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../redux/actions/user.action";
import { authActions } from "../redux/actions/auth.action";

const Header = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [status, setStatus] = useState("");
  const currentUser = useSelector((state) => state.user.currentUser.data);
  const isAuth = useSelector((state) => state.auth.isAuth);

  const handleLogout = () => {
    localStorage.clear();
    dispatch(authActions.logoutUser());
  };

  useEffect(() => {
    window.onscroll = () => {
      if (window.scrollY > window.innerHeight - 90) {
        setStatus("header--scroll");
      } else {
        setStatus("");
      }
    };
  }, [status]);

  useEffect(() => {
    if (isAuth) {
      dispatch(userActions.getUser());
    }
  }, [dispatch]);

  return (
    <header
      id="header"
      className={`header ${
        status || location.pathname.length > 1 ? "header--scroll" : ""
      }`}
    >
      <Link to="/" className="header__left not-hover">
        <svg
          aria-hidden="true"
          focusable="false"
          data-prefix="fab"
          data-icon="accusoft"
          className="svg-inline--fa fa-accusoft fa-w-20"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 640 512"
        >
          <path
            fill="currentColor"
            d="M322.1 252v-1l-51.2-65.8s-12 1.6-25 15.1c-9 9.3-242.1 239.1-243.4 240.9-7 10 1.6 6.8 15.7 1.7.8 0 114.5-36.6 114.5-36.6.5-.6-.1-.1.6-.6-.4-5.1-.8-26.2-1-27.7-.6-5.2 2.2-6.9 7-8.9l92.6-33.8c.6-.8 88.5-81.7 90.2-83.3zm160.1 120.1c13.3 16.1 20.7 13.3 30.8 9.3 3.2-1.2 115.4-47.6 117.8-48.9 8-4.3-1.7-16.7-7.2-23.4-2.1-2.5-205.1-245.6-207.2-248.3-9.7-12.2-14.3-12.9-38.4-12.8-10.2 0-106.8.5-116.5.6-19.2.1-32.9-.3-19.2 16.9C250 75 476.5 365.2 482.2 372.1zm152.7 1.6c-2.3-.3-24.6-4.7-38-7.2 0 0-115 50.4-117.5 51.6-16 7.3-26.9-3.2-36.7-14.6l-57.1-74c-5.4-.9-60.4-9.6-65.3-9.3-3.1.2-9.6.8-14.4 2.9-4.9 2.1-145.2 52.8-150.2 54.7-5.1 2-11.4 3.6-11.1 7.6.2 2.5 2 2.6 4.6 3.5 2.7.8 300.9 67.6 308 69.1 15.6 3.3 38.5 10.5 53.6 1.7 2.1-1.2 123.8-76.4 125.8-77.8 5.4-4 4.3-6.8-1.7-8.2z"
          ></path>
        </svg>
      </Link>
      <div className="header__right">
        {isAuth ? (
          <div className="list">
            <Link to="/add">Create Blog</Link>
            <div className="current-user">
              <p className="username">{currentUser && currentUser.data.name}</p>
              {currentUser && currentUser.data.avatarUrl ? (
                <div
                  className="avatar"
                  style={{
                    backgroundImage: `url('${currentUser.data.avatarUrl}')`,
                  }}
                ></div>
              ) : (
                <div
                  className="avatar"
                  style={{ backgroundImage: `url('${noImg}')` }}
                ></div>
              )}
              <div className="dropdown">
                <Link to="/admin/profile" className="not-hover">
                  Profile
                </Link>
                <Link to="/admin/blogs" className="not-hover">
                  Blog
                </Link>
                <Link to="/admin/friends" className="not-hover">
                  Friends
                </Link>
                <Link to="/" onClick={handleLogout} className="not-hover">
                  Logout
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className="list">
            <Link to="/login">Login</Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
