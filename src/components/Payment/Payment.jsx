import {
  Button,
  Form,
  Input,
  InputNumber,
  notification,
  Space,
  Table,
  Radio,
} from "antd";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import formatMoney from "../../utils/common";
import { orders } from "../../redux/slices/orderSlice";
import {
  getBonus,
  setNullMessageCouponError,
  getAllBonus,
} from "../../redux/slices/bonusSlice";
import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateStateModal } from "../../redux/action/Modal.action";
import { ROUTES } from "../../constants/routers";
import { v4 as uuidv4 } from "uuid";

const Payment = () => {
  const { Search } = Input;
  const navigate = useNavigate();
  const userAuth = useAuth();
  const dispatch = useDispatch();
  const [cart, setCart] = useState([]);
  const coupon = useSelector((state) => state.bonus.coupon);
  const allBonus = useSelector((state) => state.bonus.entities);

  const [totalPriceProducts, setTotalPriceProducts] = useState(0);
  const [totalOrder, setTotalOrder] = useState(0);
  const [couponValue, setCouponValue] = useState(0);
  const [shippingCharges, setShippingCharges] = useState(0);
  const [disableApplyCoupon, setDisableApplyCoupon] = useState(false);
  const [bonusValue, setBonusValue] = useState(false);
  const messageErrorBonus = useSelector(
    (state) => state.bonus.messageErrorBonus
  );

  if (!userAuth) {
    dispatch(updateStateModal(true));
    navigate(ROUTES.HOME);
  }

  useEffect(() => {
    dispatch(getAllBonus());
    let cart = localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : [];
    const cartOfUser = [];
    cart.forEach((cartItem) => {
      if (cartItem.email === userAuth?.email) {
        cartOfUser.push(cartItem);
      }
    });
    cart = cartOfUser;
    setCart(cart);
  }, []);
  const bonus = coupon?.data[0];
  const today = new Date();
  var currentDate =
    today.getDate() + "-" + (today.getMonth() + 1) + "-" + today.getFullYear();

  const handleChange = (value) => {
    const shipping = value.target.value;

    const bonus = coupon?.data ? coupon?.data[0] : null;
    if (shipping === "shipping-free") {
      const price = 0;
      setShippingCharges(price);

      if (bonus?.is_percent === false) {
        const value = bonus.value;
        setTotalOrder(totalPriceProducts - value);
      } else if (bonus?.is_percent === true && bonusValue === true) {
        const value = (totalPriceProducts * bonus.value) / 100;

        setTotalOrder(totalPriceProducts - value);
      }
      if (!bonus) {
        setTotalOrder(totalPriceProducts);
      }
      if (bonusValue === false) {
        setTotalOrder(totalPriceProducts);
      }
    } else {
      const price = 20000;
      setShippingCharges(price);

      if (bonus?.is_percent === false) {
        const value = bonus.value;

        setTotalOrder(totalPriceProducts - value + price);
      } else if (bonus?.is_percent === true && bonusValue === true) {
        const value = (totalPriceProducts * bonus.value) / 100;

        setTotalOrder(totalPriceProducts - value + price);
      }
      if (!bonus) {
        setTotalOrder(price + totalPriceProducts);
      }
      if (bonus && bonusValue === false) {
        setTotalOrder(price + totalPriceProducts);
      }
    }
  };

  useEffect(() => {
    if (coupon) {
    }
  }, [coupon, totalOrder]);

  const handleBonus = (value) => {
    dispatch(getBonus(value));
  };

  useEffect(() => {
    const totalAmount = cart.reduce((subTotalPrice, item) => {
      return item.total + subTotalPrice;
    }, 0);

    setTotalPriceProducts(totalAmount);
    console.log("RE-RENDER CART");
    setTotalOrder(totalAmount);
  }, [cart]);

  useEffect(() => {
    if (coupon) {
      if (bonus?.start_date && bonus?.end_date) {
        if (totalPriceProducts >= bonus.total_amount_apply) {
          console.log(currentDate);
          console.log(bonus.end_date);
          console.log(bonus.start_date);
          if (currentDate >= bonus.start_date && currentDate < bonus.end_date) {
            console.log("1111");
            const is_percent = bonus.is_percent;
            if (is_percent) {
              const remainAmount =
                totalOrder - (totalOrder * bonus.value) / 100;
              const bonusPrice = (totalOrder * bonus.value) / 100;
              console.log("1111");
              setTotalOrder(remainAmount);
              setCouponValue(bonusPrice);
              setBonusValue(true);
            } else {
              const remainAmount = totalOrder - bonus.value;
              setCouponValue(bonus.value);
              setTotalOrder(remainAmount);
              setBonusValue(true);
            }
          }
        }
      }
    }
  }, [totalPriceProducts, coupon]);

  useEffect(() => {
    if (bonusValue === true) {
      setDisableApplyCoupon(true);
    } else {
      if (messageErrorBonus) {
        notification["error"]({
          message: "Error apply coupon",
          description: messageErrorBonus,
        });
        dispatch(setNullMessageCouponError());
      }
    }
  }, [bonusValue]);

  const handleSubmit = (values) => {
    const info = values;

    const email = userAuth.email;
    if (info.payment === "offline" && cart.length > 0) {
      const order = {
        id: uuidv4(),
        email: email,
        total: totalOrder,
        fullName: values.fullname,
        phone: values.phoneNumber,
        address: values.address,
        note: values.note,
        shipping: values.shipping,
        created: currentDate,
        status: "CREATED",
        product: cart.map((item) => item),
      };

      dispatch(orders(order));
      localStorage.removeItem("cart");
      localStorage.removeItem("quantity");

      dispatch({
        type: "UPDATE_QUANTITY",
        payload: {
          values: 0,
        },
      });
      navigate("/track-my-order");
    }
  };

  const Column = [
    {
      title: "Tên sảm phẩm",
      dataIndex: "name",

      width: 400,
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
      width: 130,
    },

    {
      title: "Số lượng",
      dataIndex: "quantity",
      align: "center",
      width: 130,
    },
    {
      title: "Thành tiền",
      dataIndex: "total",
      align: "center",
      width: 50,
      render: (_, record) => {
        return <h4>{formatMoney(record.total)}</h4>;
      },
    },
  ];

  return (
    <div>
      <Header />
      <div className="paymentPage">
        <div className="formPayment">
          <Form
            onFinish={(values) => handleSubmit(values)}
            name="wrap"
            layout="vertical"
            labelAlign="left"
            labelWrap
            wrapperCol={{
              flex: 1,
            }}
            colon={false}
          >
            <Form.Item
              label="Họ tên"
              name="fullname"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập họ tên",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Số điện thoại"
              name="phoneNumber"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập số điện thoại",
                },
              ]}
            >
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>

            <Form.Item
              label="Địa chỉ"
              name="address"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập địa chỉ",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item name="note" label="Nội dung ">
              <Input.TextArea />
            </Form.Item>

            <Form.Item name="bonus" label="Mã giảm giá ">
              <Search
                placeholder="Nhập mã giảm giá"
                allowClear
                enterButton="Apply"
                size="large"
                onSearch={handleBonus}
                disabled={disableApplyCoupon}
              />
            </Form.Item>

            <Form.Item
              label="Hình thức giao hàng"
              name="shipping"
              rules={[
                { required: true, message: "Vui lòng chọn cách giao hàng!" },
              ]}
            >
              <Radio.Group onChange={(value) => handleChange(value)}>
                <Radio value={"shipping-free"}>Giao hàng miễn phí</Radio>
                <Radio value={"shipping-wasteful"}>
                  Giao hàng nhanh có phí
                </Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              label="Hình thức thanh toán"
              name="payment"
              rules={[
                { required: true, message: "Vui lòng chọn cách thanh toán!" },
              ]}
            >
              <Radio.Group>
                <Radio value={"offline"}>Thanh toán khi nhận hàng</Radio>
                <Radio value={"online"} disabled>
                  Thanh toán trực tuyến
                </Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item label=" ">
              <Button type="primary" htmlType="submit">
                Mua hàng
              </Button>
            </Form.Item>
          </Form>
        </div>
        <div className="computer" style={{ marginLeft: 20, marginTop: 20 }}>
          <Table
            columns={Column}
            rowKey="id"
            dataSource={cart}
            bordered
            pagination={false}
          ></Table>
          <br />

          <div>
            <div style={{ display: "flex" }}>
              {" "}
              <h4> Tổng tiền sản phẩm: </h4>
              <span style={{ marginLeft: 20 }}>
                {formatMoney(totalPriceProducts)}
              </span>
            </div>
            <div style={{ display: "flex" }}>
              {" "}
              <h4> Phí vận chuyển: </h4>
              <span style={{ marginLeft: 20 }}>
                {formatMoney(shippingCharges)}
              </span>
            </div>
            <div style={{ display: "flex" }}>
              {" "}
              <h4> Được giẩm giá: </h4>
              <span style={{ marginLeft: 20 }}>{formatMoney(couponValue)}</span>
            </div>
            <div style={{ display: "flex" }}>
              {" "}
              <h4> Tổng tiền: </h4>
              <span style={{ marginLeft: 20 }}> {formatMoney(totalOrder)}</span>
            </div>
          </div>
          <div>
            {allBonus?.data?.map((item) => {
              return (
                <div style={{ display: "flex" }}>
                  <h4> Mã giảm giá: </h4>
                  <span style={{ marginLeft: 20 }}>{item.code}</span>{" "}
                  <span style={{ marginLeft: 5 }}>
                    {" "}
                    được giảm {item.value}
                    {item.rate}
                    <span style={{ marginLeft: 5 }}>
                      trên tổng tiền đơn hàng
                    </span>
                  </span>{" "}
                  <br />
                  <span style={{ marginLeft: 5 }}>
                    {" "}
                    chỉ được áp dụng cho đơn hàng lớn hơn
                    <span style={{ marginLeft: 2 }}>
                      {formatMoney(item.total_amount_apply)}
                    </span>
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Payment;
