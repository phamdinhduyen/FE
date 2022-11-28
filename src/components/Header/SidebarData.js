import React from "react";
import { updateStateModal } from "../../redux/action/Modal.action";
import { useDispatch, useSelector } from "react-redux";

import * as AiIcons from "react-icons/ai";

export const SidebarData = [
  {
    title: "Home",
    path: "/",

    icon: <AiIcons.AiFillHome style={{ marginTop: 10 }} />,
    cName: "nav-text",
  },
  {
    title: "Đăng ký",
    path: "/",
    // onclick(AD),
    cName: "nav-text",
  },
];
