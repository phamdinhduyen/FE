import React, { useEffect, useMemo } from "react";
import { Col, Row, Space } from "antd";
import { useState } from "react";
import { Select, Button, Form, InputNumber, notification, Input } from "antd";
import { LikeOutlined, LikeFilled } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { productDetail } from "../../redux/slices/productSlice";
import formatMoney from "../../utils/common";
import useAuth from "../../hooks/useAuth";
import { updateStateModal } from "../../redux/action/Modal.action";
import { TrackMyOrder } from "../../redux/slices/orderSlice";

// import parse from "html-react-parser";
import * as S from "./style";

import {
  favorites,
  getFavorites,
  unlikeFavorites,
} from "../../redux/slices/favoritesSlice";
import {
  getComment,
  postComment,
  deleteComment,
  updateComment,
} from "../../redux/slices/commentSlice";

const ProductDetail = () => {
  const { TextArea } = Input;

  const userAuth = useAuth();
  const dispatch = useDispatch();
  const { slug } = useParams();

  const arrSlug = slug.split("-");
  const id = arrSlug[arrSlug.length - 1];

  const [productItem, setProductItem] = useState(null);
  const [imageDefault, setImageDefault] = useState("");

  const product = useSelector((state) => state.product.product);
  const like = useSelector((state) => state.favorite.entities);
  const comment = useSelector((state) => state.comment.entities);
  const productComment = comment.data;

  const productLike = like?.data;
  const likeQuantity = like?.data?.length;

  useEffect(() => {
    if (product) {
      setProductItem(product);
      setImageDefault(product.images[0]);
    }
  }, [product]);

  useEffect(() => {
    dispatch(productDetail(id));
    setProductItem(product);
    dispatch(getFavorites(id));
    dispatch(getComment(id));
  }, [dispatch, id]);

  const allColor = product?.variants?.map((item) => {
    return item.color;
  });
  const color = allColor?.filter(function (item, pos) {
    return allColor.indexOf(item) === pos;
  });

  const handleClickImg = (image) => {
    setImageDefault(image);
  };

  const handleChange = (item) => {
    const value = item;
    const productVariant = product.variants.find(
      (item) => item.color === value
    );
    const bigImg = productVariant?.images?.find((item) => item[0]);
    setImageDefault(bigImg);
    setProductItem(productVariant);
  };

  const onFinish = (values) => {
    if (!userAuth) {
      dispatch(updateStateModal(true));
    } else {
      const quantity = values.quantity;

      const total = quantity * productItem.price;

      let cart = localStorage.getItem("cart")
        ? JSON.parse(localStorage.getItem("cart"))
        : [];
      let cartItem = {
        id: productItem.id,
        name: productItem.name,
        price: productItem.price,
        color: productItem.color,
        quantity: quantity,
        total: total,
        image: productItem.images[0],
        email: userAuth.email,
        slug: slug,
      };

      const existedItem = cart.find((item) => item.id === cartItem.id);
      if (existedItem) {
        cart = cart.filter((item) => item.id !== existedItem.id);
        cartItem = {
          ...cartItem,
          quantity: quantity + existedItem.quantity,
        };
        cartItem = {
          ...cartItem,
          total: productItem.price * cartItem.quantity,
        };
      }
      cart.push(cartItem);
      localStorage.setItem("cart", JSON.stringify(cart));

      const totalQuantity = cart.length;

      notification["success"]({
        message: "Đã thêm vào giỏ hàng",
        description:
          "Chúc bạn một ngày vui vẻ. Bạn có thể tham khảo các đơn hàng khác",
      });
      dispatch({
        type: "UPDATE_QUANTITY",
        payload: {
          values: totalQuantity,
        },
      });
    }
  };

  const isLike = productLike?.some((item) => item.user_id === userAuth?.email);
  const Favorites = productLike?.filter(
    (item) => item.user_id === userAuth?.email
  );
  const favoritesItem = Favorites?.map((item) => item.id);

  const liked = () => {
    if (!userAuth) {
      dispatch(updateStateModal(true));
    } else {
      const userId = userAuth?.email;
      const productId = productItem?.id;
      const value = {
        user_id: userId,
        product_id: productId,
      };
      if (isLike) {
        dispatch(unlikeFavorites(favoritesItem[0]));
        dispatch(getFavorites(id));
      } else {
        dispatch(favorites(value));
        dispatch(getFavorites(id));
      }
    }
  };

  useEffect(() => {
    dispatch(TrackMyOrder(userAuth?.email));
  }, []);

  const order = useSelector((state) => state.order.entities);

  const checkOrder = order?.data?.some(
    (item) => item.email === userAuth?.email
  );
  const [formComment] = Form.useForm();
  formComment.setFieldsValue({});
  const handleComment = (values) => {
    if (!userAuth) {
      dispatch(updateStateModal(true));
    } else {
      const userId = userAuth?.email;
      const productId = productItem?.id;

      const createComment = {
        user_id: userId,
        product_id: productId,
        comment_content: values.comment,
      };

      dispatch(postComment(createComment));
      dispatch(getComment(id));
      formComment.resetFields();
    }
  };

  const [idUpdate, setIdUpdate] = useState("");
  const [edit, setEdit] = useState(false);
  const [valueComment, setValueComment] = useState();

  const [form] = Form.useForm();
  form.setFieldsValue({
    comment_content: valueComment?.comment_content,
  });
  const handleDeleteComment = (item) => {
    const value = item.id;
    dispatch(deleteComment(value));
    dispatch(getComment(id));
  };

  const handleEditComment = (item) => {
    setEdit(true);
    const value = {
      id: item.id,
      comment_content: item.comment_content,
    };
    setValueComment(value);
    setIdUpdate(item.id);
  };

  const update_Comment = (values) => {
    const value = {
      id: idUpdate,
      user_id: userAuth?.email,
      product_id: productItem?.id,
      comment_content: values.comment_content,
    };

    dispatch(updateComment(value));
    dispatch(getComment(id));
    setEdit(false);
  };
  const cancelEditComment = () => {
    setEdit(false);
  };
  return (
    <>
      <Row>
        <Col md={14} sm={24}>
          <div className="computer">
            <h1 className="Product_detail_name">{productItem?.name}</h1>
            <div className="Product_detail_img">
              <div className="product_detail_lits-item">
                {productItem?.images.map((image) => (
                  <div className="Product_detail_lits_img" key={image}>
                    <img
                      onClick={() => handleClickImg(image)}
                      className="product_detail_image"
                      src={image}
                      alt=""
                    />
                  </div>
                ))}
              </div>

              <div className="Product_detail_big_img">
                <img
                  className="Product_detail_big_img_item"
                  src={imageDefault}
                  alt=""
                />
              </div>
            </div>
          </div>
          <div className="mobile">
            <h1 className="Product_detail_name">{productItem?.name}</h1>
            <h2 className="Product_detail_price">
              Giá tiền: <span>{formatMoney(productItem?.price)} </span>
            </h2>

            <h1 className="Product_detail_content">
              {productItem?.description}
            </h1>

            <div style={{ marginLeft: 20 }}>
              <Form onFinish={onFinish}>
                <Space>
                  <Form.Item
                    name="quantity"
                    label="Số lượng"
                    initialValue={1}
                    style={{ fontSize: "17px" }}
                  >
                    <InputNumber min={0} style={{ width: " 50px" }} />
                  </Form.Item>
                </Space>

                <Space>
                  <Form.Item style={{ position: "relative" }}>
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="Product_detail_addToCart"
                    >
                      Thêm vào giỏ hàng
                    </Button>
                  </Form.Item>
                  <Form.Item>
                    <Button
                      size="large"
                      icon={
                        isLike ? (
                          <LikeFilled style={{ color: "violet" }} />
                        ) : (
                          <LikeOutlined />
                        )
                      }
                      onClick={liked}
                    >
                      {likeQuantity} liked
                    </Button>
                  </Form.Item>
                </Space>
              </Form>
            </div>

            {productItem?.images.map((image) => (
              <div key={image}>
                <img
                  style={{ width: "300px", aligItem: "center" }}
                  src={image}
                  alt=""
                />
              </div>
            ))}
          </div>
        </Col>
        <Col className="computer" md={10} sm={24}>
          <div className="Product_detail_infor">
            <h1 className="Product_detail_content">
              {productItem?.description}
            </h1>
            <h2 className="Product_detail_price">
              Giá tiền: <span>{formatMoney(productItem?.price)} </span>
            </h2>
            <div style={{ display: "flex" }}>
              {" "}
              <h2
                style={{
                  marginRight: 20,
                  marginLeft: 20,
                  color: "black",
                }}
              >
                Màu sắc :{" "}
              </h2>
              {color?.map((item) => {
                return (
                  <Button
                    value={item}
                    key={item}
                    style={{
                      marginLeft: 10,
                      background: "#cccc",
                      border: "1px solid black",
                    }}
                    onClick={() => handleChange(item)}
                  >
                    {item}
                  </Button>
                );
              })}
            </div>

            <div style={{ marginLeft: 20 }}>
              <Form onFinish={onFinish}>
                <Form.Item
                  name="quantity"
                  label="Số lượng"
                  initialValue={1}
                  style={{ fontSize: "44px" }}
                >
                  <InputNumber min={0} style={{ width: " 50px" }} />
                </Form.Item>
                <Form.Item style={{ position: "relative" }}>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="Product_detail_addToCart"
                  >
                    Thêm vào giỏ hàng
                  </Button>
                </Form.Item>
                <Space>
                  <Form.Item>
                    <Button
                      size="large"
                      icon={
                        isLike ? (
                          <LikeFilled style={{ color: "violet" }} />
                        ) : (
                          <LikeOutlined />
                        )
                      }
                      onClick={liked}
                    >
                      {likeQuantity} liked
                    </Button>
                  </Form.Item>
                </Space>
              </Form>
            </div>
          </div>
        </Col>
      </Row>
      <Row>
        <Col md={14} sm={24}>
          <h3
            style={{
              marginTop: 20,
              marginLeft: 50,
              fontWeight: 600,
              fontSize: 20,
            }}
          >
            Chi tiết sản phẩm
          </h3>
          <S.productItem
            dangerouslySetInnerHTML={{
              __html: productItem?.content,
            }}
          />
        </Col>
        <Col md={10} sm={24} style={{ width: "100%" }}>
          <div className="information">
            <div style={{ display: "flex" }}>
              <h3 className="informationName"> Cấu hình điện thoại </h3>
              <span className="informationvalue">{productItem?.name}</span>
            </div>
            <div
              style={{
                background: "#cccc",
                display: "flex",
              }}
            >
              <h4 className="informationName">Màn hình:</h4>
              <span className="informationvalue">{productItem?.screen}</span>
            </div>
            <div
              style={{
                display: "flex",
              }}
            >
              <h4 className="informationName">Hệ điều hành:</h4>
              <span className="informationvalue">
                {productItem?.Operating_System}
              </span>
            </div>
            <div
              style={{
                background: "#cccc",
                display: "flex",
              }}
            >
              <h4 className="informationName">Camera sau:</h4>
              <span className="informationvalue">{productItem?.camera_1}</span>
            </div>
            <div
              style={{
                display: "flex",
              }}
            >
              <h4 className="informationName">Camera trước:</h4>
              <span className="informationvalue">{productItem?.camera_2}</span>
            </div>

            <div
              style={{
                background: "#cccc",
                display: "flex",
              }}
            >
              <h4 className="informationName">Chip:</h4>
              <span className="informationvalue">{productItem?.chip}</span>
            </div>
            <div
              style={{
                display: "flex",
              }}
            >
              <h4 className="informationName">RAM:</h4>
              <span className="informationvalue">{productItem?.ram}</span>
            </div>
            <div
              style={{
                background: "#cccc",
                display: "flex",
              }}
            >
              <h4 className="informationName">Dung lượng lưu trữ:</h4>
              <span className="informationvalue">
                {productItem?.RAM_memory}
              </span>
            </div>

            <div
              style={{
                display: "flex",
              }}
            >
              {" "}
              <h4 className="informationName">SIM:</h4>
              <span className="informationvalue">{productItem?.sim}</span>
            </div>
            <div
              style={{
                background: "#cccc",
                display: "flex",
              }}
            >
              <h4 className="informationName">Pin, Sạc:</h4>
              <span className="informationvalue">
                {productItem?.Battery_Capacity}
              </span>
            </div>
          </div>
        </Col>
      </Row>

      <Row>
        <Col md={24} sm={24}>
          <div style={{ marginLeft: 20 }}>
            <h2 className="commentProduct"> Nhận xét sản phẩm </h2>
            {checkOrder === true ? (
              <>
                <Form
                  name="basic"
                  onFinish={handleComment}
                  autoComplete="off"
                  form={formComment}
                >
                  <Row>
                    <Col md={12} sm={24}>
                      <Form.Item
                        name="comment"
                        width="100%"
                        rules={[
                          {
                            required: true,
                            message: "Vui lòng nhập bình luận!",
                          },
                        ]}
                      >
                        <Input.TextArea
                          rows={2}
                          style={{ border: "1px solid" }}
                          placeholder=" Đánh giá sản phẩm"
                        />
                      </Form.Item>
                    </Col>
                    <Col md={4}>
                      <Form.Item>
                        <Button
                          type="primary"
                          htmlType="submit"
                          style={{ height: 55 }}
                        >
                          Bình luận
                        </Button>
                      </Form.Item>
                    </Col>
                  </Row>
                </Form>
              </>
            ) : (
              <></>
            )}
          </div>
        </Col>
      </Row>

      <Row wrap={true}>
        <Col md={14} sm={24}>
          {productComment?.map((item) => (
            <div
              style={{
                background: " #f3eaeacc",
                marginTop: 10,
                position: "relative",
                minWidth: 350,
              }}
              key={item.id}
            >
              <div
                style={{ display: "flex", justifyContent: "space-between " }}
              >
                <h2 style={{ color: "#1453c3", marginLeft: 12 }}>
                  {item.user_id}
                </h2>
                {userAuth?.email === item?.user_id ? (
                  <>
                    <div>
                      {edit === true &&
                      userAuth?.email === item?.user_id &&
                      item.id === idUpdate ? (
                        <>
                          <button
                            className="buttonEdit"
                            onClick={() => cancelEditComment(item)}
                          >
                            Hủy
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            className="buttonEdit"
                            onClick={() => handleEditComment(item)}
                          >
                            Sửa
                          </button>
                        </>
                      )}

                      <button
                        className="buttonDelete"
                        onClick={() => handleDeleteComment(item)}
                      >
                        Xóa
                      </button>
                    </div>
                  </>
                ) : (
                  <></>
                )}
              </div>
              {edit === true &&
              userAuth?.email === item?.user_id &&
              item.id === idUpdate ? (
                <Form
                  form={form}
                  onFinish={update_Comment}
                  name="updateComment"
                >
                  <Row>
                    <Col md={21}>
                      <Form.Item
                        style={{ width: " 100%" }}
                        name="comment_content"
                        rules={[
                          {
                            required: true,
                            message: "Vui lòng nhập bình luận!",
                          },
                        ]}
                      >
                        <Input.TextArea
                          rows={2}
                          style={{ border: "1px solid" }}
                        />
                      </Form.Item>
                    </Col>
                    <Col>
                      {" "}
                      <Form.Item>
                        <Button
                          type="primary"
                          htmlType="submit"
                          style={{ height: 55 }}
                        >
                          Chỉnh sửa
                        </Button>
                      </Form.Item>
                    </Col>
                  </Row>
                </Form>
              ) : (
                <Row wrap={true}>
                  <Col>
                    <h4
                      style={{ wordWrap: "break-word" }}
                      className="comment_content"
                    >
                      {item.comment_content}
                    </h4>
                  </Col>
                </Row>
              )}
            </div>
          ))}
        </Col>
      </Row>
    </>
  );
};

export default ProductDetail;
