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

import {
  searchCityLocation,
  searchDistrictsLocation,
  searchWardLocation,
} from "../../redux/slices/location.slice";

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

  let cityList = useSelector((state) => state.location.cities);
  cityList = cityList?.data ? cityList?.data[0] : null;
  cityList = cityList?.name;

  let DistrictList = useSelector((state) => state.location.districts);
  DistrictList = DistrictList?.data ? DistrictList?.data[0] : null;
  DistrictList = DistrictList?.name;
  let WardsList = useSelector((state) => state.location.wards);
  WardsList = WardsList?.data ? WardsList?.data[0] : null;
  WardsList = WardsList?.name;
  let order = useSelector((state) => state.order.entities);

  order = order?.data ? order?.data[0] : null;
  const cityCode = order?.cityCode;
  const DistrictCode = order?.DistrictCode;
  console.log(order);
  const WardCode = order?.WardCode;

  useEffect(() => {
    dispatch(searchCityLocation(cityCode));
    dispatch(searchDistrictsLocation(DistrictCode));
    dispatch(searchWardLocation(WardCode));
  }, [cityCode, DistrictCode, WardCode]);
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
      title: "T??n s???n ph???m",
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
      title: "Gia s???n ph???m",
      dataIndex: "price",
      align: "center",
      width: 100,
      render: (_, record) => {
        return <h4>{formatMoney(record.price)}</h4>;
      },
    },

    {
      title: "S??? l?????ng",
      dataIndex: "quantity",
      align: "center",
      width: 50,
    },
    {
      title: "Th??nh ti???n",
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
                  ID h??ng tin ????n h??ng:{" "}
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
                  Ng??y mua:{" "}
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
                  H??? t??n:{" "}
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
                  S??? ??i???n tho???i ng?????i nh???n:{" "}
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
                  Ph????ng th???c giao h??ng:{" "}
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
                  ?????a ch???:{" "}
                </h4>{" "}
                <p style={{ fontweight: 400, marginTop: 7, marginLeft: 10 }}>
                  {order?.address} {}
                  {WardsList} {DistrictList} {cityList}
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
                  N???i dung:{" "}
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
                  T???ng ti???n ????n h??ng:{" "}
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
                  Tr???ng th??i ????n h??ng:{" "}
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
                Gi?? ti???n: {formatMoney(item?.price)}
              </h3>
              <h3 style={{ marginLeft: 30 }}>S??? l?????ng {item.quantity}</h3>
              <h3 style={{ marginLeft: 30 }}>
                T???ng ti???n {formatMoney(item?.total)}
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
