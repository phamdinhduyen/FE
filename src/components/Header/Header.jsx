import React from "react";
import SortCategory from "./SortCategory";
import { Button, Modal, Checkbox, Form, notification } from "antd";
import { Input } from "antd";
import { useState, useEffect } from "react";

import {
  PhoneOutlined,
  RocketOutlined,
  UserOutlined,
  EnvironmentOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import "antd/dist/antd.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ROUTES } from "../../constants/routers";
import { v4 as uuidv4 } from "uuid";
import useAuth from "../../hooks/useAuth";
import {
  updateStateModal,
  updateStateModalRegister,
} from "../../redux/action/Modal.action";
import SearchProducts from "./Search";
import NavbarMobile from "./Navbar";
import {
  login,
  register,
  setNullMessageError,
} from "../../redux/slices/userSlice";

const Header = () => {
  const userAuth = useAuth();
  const [quantity, setQuantity] = useState(0);

  const messageErrorRegister = useSelector(
    (state) => state.user.messageErrorRegister
  );
  const messageErrorLogin = useSelector(
    (state) => state.user.messageErrorLogin
  );
  const user = useSelector((state) => state.user.user);
  const currentQuantity = useSelector((state) => state.cart.quantity);
  const [email, setEmail] = useState(null);
  const dispatch = useDispatch();

  const [form] = Form.useForm();

  useEffect(() => {
    setQuantity(currentQuantity);
  }, [currentQuantity]);

  const handleCancel = () => {
    dispatch(updateStateModalRegister(false));
  };
  const handleCancelLogin = () => {
    dispatch(updateStateModal(false));
  };
  const navigate = useNavigate();
  const cart = () => {
    navigate(ROUTES.USER.CART_DETAIL);
  };
  const Home = () => {
    navigate("/home");
    window.location.reload();
  };

  const isModalOpenSignup = useSelector((state) => state.modal.isOpen);
  const isModalOpenRegister = useSelector(
    (state) => state.modalRegister.isOpen
  );
  // const [isModalOpenRegister, setIsModalOpenRegister] = useState(false);

  const showModalSignup = () => {
    dispatch(updateStateModal(true));
  };
  const showModalRegister = () => {
    dispatch(updateStateModalRegister(true));
  };
  const cancel = () => {
    dispatch(updateStateModal(false));
  };
  const cancelRegister = () => {
    dispatch(updateStateModalRegister(false));
  };
  const onFinishRegister = (values) => {
    const id = uuidv4();
    setEmail(values.email);

    const user = {
      id: id,
      username: values.username,
      email: values.email,
      password: values.password,
      is_admin: false,
    };
    dispatch(register(user));
    dispatch(updateStateModalRegister(false));
  };

  useEffect(() => {
    if (messageErrorRegister) {
      notification["error"]({
        message: "Lỗi khi đăng ký",
        description: messageErrorRegister,
      });
      dispatch(setNullMessageError());
    }
  }, [dispatch, messageErrorRegister]);

  const onFinishLogin = (values) => {
    const email = values.email;
    setEmail(email);
    const user = {
      email: values.email,
      password: values.password,
    };
    dispatch(login(user));
    dispatch(updateStateModal(false));
  };

  if (user) {
    const data = {
      token: user.data.accessToken,
      email: email,
    };
    localStorage.setItem("user", JSON.stringify(data));
    window.location.reload();
  }
  useEffect(() => {
    if (messageErrorLogin) {
      notification["error"]({
        message: "Lỗi khi đăng nhập",
        description: messageErrorLogin,
      });
      dispatch(setNullMessageError());
    }
  }, [dispatch, messageErrorLogin]);
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const logout = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };

  return (
    <div className="header_list">
      <div className="header_infor">
        <div className="header_infor_item_location">
          <div>
            <EnvironmentOutlined className="header_infor_item_location_icon" />
          </div>
          <div>
            {" "}
            <h1 className="header_infor_item_location_name"> Đà Nẵng</h1>
          </div>
        </div>
        <div className="header_infor_item">
          <div>
            {" "}
            <PhoneOutlined className="header_infor_item_phone_icon" />
          </div>
          <h1 className="header_infor_item_phone_name"> 0334456835</h1>
          <div className="header_infor_item_transport">
            <div>
              <RocketOutlined className="header_infor_item_transport_icon" />
            </div>
            <div>
              <a
                className="header_infor_item_transport_name"
                href={ROUTES.TRACK_MY_ORDER}
              >
                Tra cứu đơn hàng
              </a>
            </div>
            <div className="header_infor_item_recruit">
              <div>
                <UserOutlined className="header_infor_item_transport_icon" />
              </div>
              <div>
                <a className="header_infor_item_recruit_name" href="http://">
                  Tuyển dụng
                </a>
              </div>
            </div>
          </div>
        </div>

        {!userAuth ? (
          <>
            <div className="header_infor_item_register">
              <Button type="primary" onClick={showModalRegister}>
                Đăng ký
              </Button>
            </div>
            <div className="header_infor_item_signup">
              <Button type="primary" onClick={showModalSignup}>
                Đăng nhập
              </Button>
            </div>
          </>
        ) : (
          <>
            <div
              className="logout"
              style={{
                marginLeft: 560,
                fontSize: "18px",
                color: "white",
              }}
            >
              {` ${userAuth.email}`}
              <Button
                style={{ marginLeft: 80 }}
                type="primary"
                onClick={() => logout()}
              >
                Logout
              </Button>
            </div>
          </>
        )}
      </div>
      <div>
        <div className="header_bottom">
          <img
            onClick={() => Home()}
            className="header_logo_img"
            src="https://st2.depositphotos.com/5943796/11378/v/950/depositphotos_113780710-stock-illustration-initial-letter-dn-silver-gold.jpg"
            alt="logo"
          />
          {<SortCategory />}
          <div>
            <SearchProducts />
          </div>

          <div className="header_cart">
            <ShoppingCartOutlined onClick={() => cart()} />
          </div>
          <span className="quantity"> {userAuth ? quantity : 0}</span>
          <div className="mobile">
            <NavbarMobile />
          </div>
        </div>
      </div>
      <div>
        <>
          <Modal
            title="Đăng nhập"
            open={isModalOpenSignup}
            onCancel={handleCancelLogin}
            footer={null}
          >
            <Form
              form={form}
              name="basic"
              labelCol={{
                span: 8,
              }}
              wrapperCol={{
                span: 16,
              }}
              initialValues={{
                remember: true,
              }}
              onFinish={onFinishLogin}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                name="email"
                label="E-mail"
                rules={[
                  {
                    type: "email",
                    message: "The input is not valid E-mail!",
                  },
                  {
                    required: true,
                    message: "Please input your E-mail!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                name="remember"
                valuePropName="checked"
                wrapperCol={{
                  offset: 8,
                  span: 16,
                }}
              >
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <Form.Item
                wrapperCol={{
                  offset: 8,
                  span: 16,
                }}
              >
                <Button type="primary" htmlType="submit">
                  Đăng nhập
                </Button>
              </Form.Item>
            </Form>
            <Button
              type="primary"
              htmlType="submit"
              style={{ marginLeft: 400 }}
              onClick={cancel}
            >
              Cancel
            </Button>
          </Modal>
          {/* Signup */}
          <Modal
            title="Đăng ký"
            open={isModalOpenRegister}
            onCancel={handleCancel}
            footer={null}
          >
            <Form
              name="basic"
              labelCol={{
                span: 8,
              }}
              wrapperCol={{
                span: 16,
              }}
              initialValues={{
                remember: true,
              }}
              onFinish={onFinishRegister}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                label="Họ Tên"
                name="username"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập họ tên!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="email"
                label="E-mail"
                rules={[
                  {
                    type: "email",
                    message: "The input is not valid E-mail!",
                  },
                  {
                    required: true,
                    message: "Please input your E-mail!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Mật khẩu"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập mật khẩu!",
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                label="Nhập lại mật khẩu"
                name="confirmpassword"
                dependencies={["password"]}
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập lại mật khẩu!",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }

                      return Promise.reject(
                        new Error("Mật khẩu không trùng khớp!")
                      );
                    },
                  }),
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                name="remember"
                valuePropName="checked"
                wrapperCol={{
                  offset: 8,
                  span: 16,
                }}
              >
                <Checkbox>Lưu mật khẩu</Checkbox>
              </Form.Item>

              <Form.Item
                wrapperCol={{
                  offset: 8,
                  span: 16,
                }}
              >
                <Button type="primary" htmlType="submit">
                  Đăng ký
                </Button>
              </Form.Item>
            </Form>
            <Button
              type="primary"
              htmlType="submit"
              style={{ marginLeft: 400 }}
              onClick={cancelRegister}
            >
              Cancel
            </Button>
          </Modal>
        </>
      </div>
    </div>
  );
};

export default Header;
