import React from "react";
import { TrackMyOrder } from "../../redux/slices/orderSlice";
import formatMoney from "../../utils/common";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import { Table } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { updateStateModal } from "../../redux/action/Modal.action";
import { ROUTES } from "../../constants/routers";
import {
  getCityLocation,
  getDistrictsLocation,
  getWardsLocation,
} from "../../redux/slices/location.slice";

const MyOrder = () => {
  const dispatch = useDispatch();
  const user = useAuth();
  const navigate = useNavigate();
  if (!user) {
    dispatch(updateStateModal(true));
    navigate(ROUTES.HOME);
  }
  useEffect(() => {
    dispatch(TrackMyOrder(user?.email));
  }, []);
  const order = useSelector((state) => state.order.entities);

  const product = order?.data?.map((item) => {
    return {
      created: item.created,
      id: item.id,
      status: item.status,
      total: item.total,
      product: item.product,
    };
  });

  const Column = [
    {
      title: "Ngày mua",
      dataIndex: "created",
      align: "center",
      width: 150,
    },

    {
      title: " ID Đơn hàng",
      dataIndex: "id",
      align: "center",
      width: 150,
      render: (text, record) => (
        <Link to={`/order-detail/${record.id}`}>{text}</Link>
      ),
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
      title: "Trạng Thái đơn hàng",
      dataIndex: "status",
      align: "center",
      width: 100,
    },
  ];
  return (
    <>
      <div className="computer">
        <Table
          columns={Column}
          rowKey="id"
          dataSource={product}
          bordered
          pagination={false}
        ></Table>
      </div>
      <div>
        {product?.map((item) => (
          <div className="mobile" key={item.id}>
            <div className="mobileTrackMyOrder">
              <h3>
                Ngày mua: <span> {item.created}</span>
              </h3>

              <h3>
                ID Đơn hàng:{" "}
                <Link to={`/order-detail/${item.id}`}>{item.id}</Link>
              </h3>

              <h3>
                Tổng tiền: <span> {item.total}</span>
              </h3>
              <h3>
                Trạng thái: <span> {item.status}</span>
              </h3>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
export default MyOrder;
