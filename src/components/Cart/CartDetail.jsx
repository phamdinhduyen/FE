import React from "react";
import { Button, Table, Popconfirm, Space } from "antd";
import useAuth from "../../hooks/useAuth";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import "antd/dist/antd.css";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import formatMoney from "../../utils/common";
import { ROUTES } from "../../constants/routers";
import { updateStateModal } from "../../redux/action/Modal.action";
const CartDetail = () => {
  const user = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  if (!user) {
    dispatch(updateStateModal(true));
    navigate(ROUTES.HOME);
  }
  const Navigate = useNavigate("/payment");

  const Payment = () => {
    Navigate("/payment");
  };

  const [result, setResult] = useState([]);

  useEffect(() => {
    let cart = [];
    if (user) {
      cart = localStorage.getItem("cart")
        ? JSON.parse(localStorage.getItem("cart"))
        : [];
      const cartOfUser = [];
      cart.forEach((cartItem) => {
        if (cartItem.email === user.email) {
          cartOfUser.push(cartItem);
        }
      });
      cart = cartOfUser;
      setResult(cart);
    }
  }, [user]);

  const handleDelete = (value) => {
    const dataSource = [...result];
    const filterData = dataSource.filter((item) => item.id !== value.id);
    setResult(filterData);
    localStorage.setItem("cart", JSON.stringify(filterData));
    const totalQuantity = filterData.length;
    dispatch({
      type: "UPDATE_QUANTITY",
      payload: {
        values: totalQuantity,
      },
    });
  };
  const handleDeleteMobile = (item) => {
    const dataSource = [...result];
    const filterData = dataSource.filter((product) => product.id !== item.id);
    setResult(filterData);
    localStorage.setItem("cart", JSON.stringify(filterData));
    const totalQuantity = filterData.length;
    dispatch({
      type: "UPDATE_QUANTITY",
      payload: {
        values: totalQuantity,
      },
    });
  };

  const totalPrice = result.reduce((subTotalPrice, item) => {
    return item.total + subTotalPrice;
  }, 0);

  const Column = [
    {
      title: "Tên sảm phẩm",
      dataIndex: "name",

      width: 500,
      render: (_, record) => {
        return (
          <Space>
            <img
              src={record.image}
              alt=""
              style={{ width: "50px", height: "50px" }}
            />
            <h4>{record.name}</h4>
          </Space>
        );
      },
    },
    {
      title: "Giá sản phẩm",
      dataIndex: "price",
      align: "center",
      width: 150,
      render: (_, record) => {
        return <h4>{formatMoney(record.price)}</h4>;
      },
    },
    {
      title: "Màu sắc",
      dataIndex: "color",
      align: "center",
      width: 120,
    },

    {
      title: "Số lượng",
      dataIndex: "quantity",
      align: "center",
      width: 100,
    },
    {
      title: "Thành tiền",
      dataIndex: "total",
      align: "center",
      width: 200,
      render: (_, record) => {
        return <h4>{formatMoney(record.total)}</h4>;
      },
    },

    {
      title: "Xóa",
      dataIndex: "action",
      align: "center",
      width: 50,
      render: (_, record) =>
        result.length >= 1 ? (
          <Space>
            <Popconfirm
              title="Ban muon xoa ? "
              onConfirm={() => handleDelete(record)}
            >
              <Button danger type="primary">
                {" "}
                Delete
              </Button>
            </Popconfirm>
          </Space>
        ) : null,
    },
  ];
  return (
    <div>
      <Header />

      <div style={{ minHeight: "60vh" }}>
        <div className="computer">
          <Table
            columns={Column}
            rowKey="id"
            dataSource={result}
            bordered
            pagination={false}
          ></Table>
        </div>

        {result.map((item) => (
          <div className="mobile">
            <h3 style={{ fontSize: 15, marginLeft: 20 }}>{item.name}</h3>
            <h3 style={{ fontSize: 15, marginLeft: 20 }}>
              Giá tiền: {formatMoney(item.price)}
            </h3>
            <h3 style={{ fontSize: 15, marginLeft: 20 }}>
              Màu sắc: {item.color}
            </h3>
            <h3 style={{ fontSize: 15, marginLeft: 20 }}>
              Số lượng: {item.quantity}
            </h3>
            <button
              style={{
                fontSize: 15,
                marginLeft: 10,
                background: "red",
                color: "white",
              }}
              onClick={() => handleDeleteMobile(item)}
            >
              Xóa
            </button>
          </div>
        ))}
        <div className="totalPrice_Payment">
          <div>
            <Button className="total" type="primary">
              Tổng tiền
            </Button>
            <span style={{ color: "red", fontWeight: 700, marginLeft: 20 }}>
              {formatMoney(totalPrice)}
            </span>
          </div>
          <div className="payment">
            <Button
              type="primary"
              style={{ marginRight: "40px", backgroundColor: "green" }}
              onClick={() => Payment()}
            >
              Thanh toán
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CartDetail;
