import { Col, Row } from "antd";
import React from "react";
import Header from "../Header/Header";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import { Table, Space } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { updateStateModal } from "../../redux/action/Modal.action";
import { ROUTES } from "../../constants/routers";
import { orderDetail } from "../../redux/slices/orderSlice";
import formatMoney from "../../utils/common";
import Footer from "../Footer/Footer";
import { TrackMyOrder } from "../../redux/slices/orderSlice";

const OrderDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const user = useAuth();
  const navigate = useNavigate();
  if (!user) {
    dispatch(updateStateModal(true));
    navigate(ROUTES.HOME);
  }
  useEffect(() => {
    dispatch(orderDetail(id));
  }, []);

  let order = useSelector((state) => state.order.entities);

  order = order?.data ? order?.data[0] : null;
  const products = order?.product?.map((item) => {
    const slug = item.slug + "-" + item.id;
    const b = slug.split(".");
    const c = b.shift();

    return {
      id: item.id,
      name: item.name,
      image: item.image,
      price: item.price,
      status: item.status,
      quantity: item.quantity,
      total: item.total,
      slug: c,
    };
  });

  const Column = [
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
      align: "center",
      width: 150,
      render: (_, record) => {
        return (
          <Space>
            <img
              src={record.image}
              alt=""
              style={{ width: "50px", height: "50px" }}
            />
            <Link to={`/product-detail/${record.slug}`}>{record.name}</Link>
          </Space>
        );
      },
    },

    {
      title: "Gia sản phẩm",
      dataIndex: "price",
      align: "center",
      width: 100,
      render: (_, record) => {
        return <h4>{formatMoney(record.price)}</h4>;
      },
    },

    {
      title: "Số lượng",
      dataIndex: "quantity",
      align: "center",
      width: 50,
    },
    {
      title: "Thành tiền",
      dataIndex: "total",
      align: "center",
      width: 100,
      render: (_, record) => {
        return <h4>{formatMoney(record.total)}</h4>;
      },
    },
  ];
  return (
    <>
      <Header />

      <div style={{ marginBottom: 20 }}>
        <Row style={{ marginTop: 10, minHeight: "60vh" }}>
          <Col md={12} sm={24}>
            <div
              style={{
                fontSize: 18,
                marginLeft: "10px",
              }}
            >
              <div style={{ display: "flex" }}>
                <h4
                  style={{
                    fontweight: 800,
                    marginLeft: 30,
                    marginTop: 7,
                  }}
                >
                  {" "}
                  ID hông tin đơn hàng:{" "}
                </h4>{" "}
                <p style={{ fontweight: 400, marginTop: 7, marginLeft: 10 }}>
                  {" "}
                  {order?.id}
                </p>
              </div>
              <div style={{ display: "flex" }}>
                <h4
                  style={{
                    fontweight: 800,
                    marginLeft: 30,
                    marginTop: 7,
                  }}
                >
                  {" "}
                  Ngày mua:{" "}
                </h4>{" "}
                <p style={{ fontweight: 400, marginTop: 7, marginLeft: 10 }}>
                  {order?.created}
                </p>
              </div>
              <div style={{ display: "flex" }}>
                <h4
                  style={{
                    fontweight: 800,
                    marginLeft: 30,
                    marginTop: 7,
                  }}
                >
                  Họ tên:{" "}
                </h4>{" "}
                <p style={{ fontweight: 400, marginTop: 7, marginLeft: 10 }}>
                  {order?.fullName}
                </p>
              </div>
              <div style={{ display: "flex" }}>
                <h4
                  style={{
                    fontweight: 800,
                    marginLeft: 30,
                    marginTop: 7,
                  }}
                >
                  Số điện thoại người nhận:{" "}
                </h4>{" "}
                <p style={{ fontweight: 400, marginTop: 7, marginLeft: 10 }}>
                  {order?.phone}
                </p>
              </div>

              <div style={{ display: "flex" }}>
                <h4
                  style={{
                    fontweight: 800,
                    marginLeft: 30,
                    marginTop: 7,
                  }}
                >
                  Phương thức giao hàng:{" "}
                </h4>{" "}
                <p style={{ fontweight: 400, marginTop: 7, marginLeft: 4 }}>
                  {order?.shipping}
                </p>
              </div>
              <div style={{ display: "flex" }}>
                <h4
                  style={{
                    fontweight: 800,
                    marginLeft: 30,
                    marginTop: 7,
                  }}
                >
                  Địa chỉ giao hàng:{" "}
                </h4>{" "}
                <p style={{ fontweight: 400, marginTop: 7, marginLeft: 10 }}>
                  {order?.address}
                </p>
              </div>
              <div style={{ display: "flex" }}>
                <h4
                  style={{
                    fontweight: 800,
                    marginLeft: 30,
                    marginTop: 7,
                  }}
                >
                  Nội dung:{" "}
                </h4>{" "}
                <p style={{ fontweight: 400, marginTop: 7, marginLeft: 10 }}>
                  {order?.note}
                </p>
              </div>
              <div style={{ display: "flex" }}>
                <h4
                  style={{
                    fontweight: 800,
                    marginLeft: 30,
                    marginTop: 7,
                  }}
                >
                  Tổng tiền đơn hàng:{" "}
                </h4>{" "}
                <p style={{ fontweight: 400, marginTop: 7, marginLeft: 10 }}>
                  {formatMoney(order?.total)}
                </p>
              </div>
              <div style={{ display: "flex" }}>
                <h4
                  style={{
                    fontweight: 800,
                    marginLeft: 30,
                    marginTop: 7,
                  }}
                >
                  Trạng thái đơn hàng:{" "}
                </h4>{" "}
                <p style={{ fontweight: 400, marginTop: 7, marginLeft: 10 }}>
                  {order?.status}
                </p>
              </div>
            </div>
          </Col>

          <Col span={12}>
            <div className="computer">
              {" "}
              <Table
                columns={Column}
                rowKey={"id"}
                dataSource={products}
                bordered
                pagination={false}
              ></Table>
            </div>
          </Col>
        </Row>
        <div>
          {products?.map((item, idx) => (
            <div
              className="mobile"
              style={{ marginLeft: 30, marginTop: 50 }}
              key={idx}
            >
              <div style={{ display: "flex", marginLeft: 30 }}>
                <img
                  src={item.image}
                  alt=""
                  style={{ width: 50, height: 30 }}
                />
                <h3 style={{ marginTop: 0 }}>{item.name}</h3>
              </div>
              <h3 style={{ marginLeft: 30 }}>
                Giá tiền: {formatMoney(item?.price)}
              </h3>
              <h3 style={{ marginLeft: 30 }}>Số lượng {item.quantity}</h3>
              <h3 style={{ marginLeft: 30 }}>
                Tổng tiền {formatMoney(item?.total)}
              </h3>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
};
export default OrderDetail;
