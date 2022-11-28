import React, { useState, useEffect } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";
import { IconContext } from "react-icons";
import {
  updateStateModal,
  updateStateModalRegister,
} from "../../redux/action/Modal.action";
import { useDispatch, useSelector } from "react-redux";

function Navbar() {
  const dispatch = useDispatch();
  const [sidebar, setSidebar] = useState(false);
  const navigate = useNavigate();
  const user = useAuth();
  const showSidebar = () => setSidebar(!sidebar);
  const home = () => {
    navigate("/");
  };
  const login = () => {
    dispatch(updateStateModal(true));
  };
  const register = () => {
    dispatch(updateStateModalRegister(true));
  };
  const trackMyOrder = () => {
    navigate("/track-my-order");
  };
  const logout = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };
  return (
    <div>
      <IconContext.Provider value={{ color: "#fff" }}>
        <div className="navbar">
          <Link to="#" className="menu-bars">
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
        </div>
        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items" onClick={showSidebar}>
            <li className="navbar-toggle">
              <Link to="#" className="menu-bars_close">
                <AiIcons.AiOutlineClose />
              </Link>
            </li>

            <li className="nav-text">
              <AiIcons.AiFillHome style={{ marginTop: 5, marginRight: 5 }} />
              <h4 style={{ color: "white" }} onClick={home}>
                {" "}
                Trang chủ
              </h4>
            </li>
            {!user ? (
              <>
                <li className="nav-text">
                  <h1 style={{ marginLeft: 20 }} onClick={login}>
                    {" "}
                    Đăng nhập
                  </h1>
                </li>
                <li className="nav-text">
                  <Link style={{ marginLeft: 20 }} onClick={register}>
                    {" "}
                    Đăng ký
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-text">
                  <h4
                    style={{ marginLeft: 20, color: "white" }}
                    onClick={trackMyOrder}
                  >
                    Tra cứu đơn hàng
                  </h4>
                </li>
                <li className="nav-text">
                  <Link style={{ marginLeft: 20 }} onClick={logout}>
                    {" "}
                    Đăng xuất
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </IconContext.Provider>
    </div>
  );
}

export default Navbar;
