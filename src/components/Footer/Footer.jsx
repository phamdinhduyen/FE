import React from "react";
import { Col, Row } from "antd";
import {
  FacebookOutlined,
  InstagramOutlined,
  LinkedinOutlined,
  TwitterOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer">
      <Row>
        <Col className="footerItem" md={6} sm={24}>
          <div className="css">
            <span className="footer_list_customer_name">
              CHĂM SÓC KHÁCH HÀNG
            </span>
            <ul className="footer_list_customer">
              <li>
                <Link className="footer_list_customer_care_item" href="">
                  {" "}
                  Trung Tâm Trợ Giúp
                </Link>
              </li>
              <li>
                <Link className="footer_list_customer_care_item" href="">
                  {" "}
                  Hướng Dẫn Mua Hàng
                </Link>
              </li>
              <li>
                <Link className="footer_list_customer_care_item" href="">
                  {" "}
                  Hướng Dẫn Bán Hàng
                </Link>
              </li>
              <li>
                <Link className="footer_list_customer_care_item" href="">
                  {" "}
                  Thanh Toán
                </Link>
              </li>
              <li>
                <Link className="footer_list_customer_care_item" href="">
                  Vận Chuyển{" "}
                </Link>
              </li>
              <li>
                <Link className="footer_list_customer_care_item" href="">
                  Trả Hàng & Hoàn Tiền{" "}
                </Link>
              </li>
              <li>
                <Link className="footer_list_customer_care_item" href="">
                  {" "}
                  Chăm Sóc Khách Hàng
                </Link>
              </li>
              <li>
                <Link className="footer_list_customer_care_item" href="">
                  {" "}
                  Chính Sách Bảo Hành
                </Link>
              </li>
            </ul>
          </div>
        </Col>
        <Col className="footerItem" md={6} sm={24}>
          <div className="css">
            <span className="footer_list_customer_name">VỀ DN</span>
            <ul className="footer_list_customer">
              <li>
                <Link className="footer_list_customer_care_item" href="">
                  {" "}
                  Giới Thiệu Về DN Việt Nam
                </Link>
              </li>
              <li>
                <Link className="footer_list_customer_care_item" href="">
                  {" "}
                  Tuyển Dụng
                </Link>
              </li>
              <li>
                <Link className="footer_list_customer_care_item" href="">
                  {" "}
                  Điều Khoản DN
                </Link>
              </li>
              <li>
                <Link className="footer_list_customer_care_item" href="">
                  {" "}
                  Chính Sách Bảo Mật
                </Link>
              </li>
              <li>
                <Link className="footer_list_customer_care_item" href="">
                  Chính Hãng
                </Link>
              </li>
              <li>
                <Link className="footer_list_customer_care_item" href="">
                  Kênh Người Bán
                </Link>
              </li>
              <li>
                <Link className="footer_list_customer_care_item" href="">
                  {" "}
                  Chương Trình Tiếp Thị Liên Kết DN
                </Link>
              </li>
              <li>
                <Link className="footer_list_customer_care_item" href="">
                  {" "}
                  Liên Hệ Với Truyền Thông
                </Link>
              </li>
            </ul>
          </div>
        </Col>
        <Col className="footerItem" md={6} sm={24}>
          <div className="css">
            <span className="footer_list_customer_name">THANH TOÁN</span>

            <div className="footer_list_payment">
              <img
                className="footer_payment"
                src="https://mona.software/wp-content/uploads/2021/05/cong-thanh-toan-online-la-gi.jpg"
                alt="payment"
              />
            </div>

            <span className="footer_list_customer_name">VẬN CHYỂN</span>

            <div className="footer_list_payment">
              <img
                className="footer_transport"
                src="https://cdn.ntlogistics.vn/images/NTX/new_images/don-vi-giao-hang-nhanh-uy-tin-ghn-giao-hang-nhanh.jpg"
                alt="payment"
              />
            </div>
          </div>
        </Col>
        <Col className="footerItem" md={6} sm={24}>
          <div className="css">
            {" "}
            <span className="footer_list_customer_name">
              THEO DÕI CHÚNG TÔI TRÊN
            </span>
            <ul className="footer_list_socical">
              <li>
                <Link className="footer_list_customer_care_item" href="">
                  {" "}
                  Facebook
                </Link>
              </li>
              <li>
                <Link className="footer_list_customer_care_item" href="">
                  {" "}
                  Instagram
                </Link>
              </li>
              <li>
                <Link className="footer_list_customer_care_item" href="">
                  {" "}
                  LinkedIn
                </Link>
              </li>
              <li>
                <Link className="footer_list_customer_care_item" href="">
                  {" "}
                  Twitter
                </Link>
              </li>
            </ul>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Footer;
