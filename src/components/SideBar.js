import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import noImg from "../img/no-image.png";
import { Link, useHistory } from "react-router-dom";
import { userActions } from "../redux/actions/user.action";

const SideBar = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser.data);
  const checkLogin = localStorage.getItem("accessToken");
  const history = useHistory();
  const handleLogout = () => {
    localStorage.clear();
    history.go(0)
  };

  useEffect(() => {
    if (checkLogin) {
      dispatch(userActions.getUser());
    }
  }, [dispatch, checkLogin]);

  return (
    <nav id="sidebar" className="sidebar">
      {checkLogin ? (
        <div className="sidebar__content">
          <div className="author">
            {currentUser && currentUser.data.avatarUrl ? (
              <div
                className="author__avatar"
                style={{
                  backgroundImage: `url('${currentUser.data.avatarUrl}')`,
                }}
              ></div>
            ) : (
              <div
                className="author__avatar"
                style={{ backgroundImage: `url('${noImg}')` }}
              ></div>
            )}
            <div className="author__info">
              <h3>{currentUser && currentUser.data.name}</h3>
              <p>{currentUser && currentUser.data.email}</p>
            </div>
            <button className="author__btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
          {/* <div className="friends">
            <h3 className="friends__title"></h3>
            <ul className="friends__list">
              <li>
                <div className="avatar"></div>
                <div className="username"></div>
                <div className="btns"></div>
              </li>
            </ul>
          </div> */}
        </div>
      ) : (
        <Link to="/login" className="sidebar__not-login not-hover">
          <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="far"
            data-icon="frown"
            className="svg-inline--fa fa-frown fa-w-16"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 496 512"
          >
            <path
              fill="currentColor"
              d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 448c-110.3 0-200-89.7-200-200S137.7 56 248 56s200 89.7 200 200-89.7 200-200 200zm-80-216c17.7 0 32-14.3 32-32s-14.3-32-32-32-32 14.3-32 32 14.3 32 32 32zm160-64c-17.7 0-32 14.3-32 32s14.3 32 32 32 32-14.3 32-32-14.3-32-32-32zm-80 128c-40.2 0-78 17.7-103.8 48.6-8.5 10.2-7.1 25.3 3.1 33.8 10.2 8.4 25.3 7.1 33.8-3.1 16.6-19.9 41-31.4 66.9-31.4s50.3 11.4 66.9 31.4c8.1 9.7 23.1 11.9 33.8 3.1 10.2-8.5 11.5-23.6 3.1-33.8C326 321.7 288.2 304 248 304z"
            ></path>
          </svg>
          <p>Please login to see info!</p>
        </Link>
      )}
    </nav>
  );
};

export default SideBar;
