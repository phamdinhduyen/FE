import React from "react";
import { Steps, Button, Form, Select, Input } from "antd";
import { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCityLocation,
  getDistrictsLocation,
  getWardsLocation,
} from "../../redux/slices/location.slice";

const Location = () => {
  const [infoForm] = Form.useForm();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCityLocation());
  }, []);

  const cityList = useSelector((state) => state.location.cities);

  const DistrictList = useSelector((state) => state.location.districts);
  const WardsList = useSelector((state) => state.location.wards);

  const initialValues = {
    phone: "",
    address: "",
    cityCode: undefined,
    DistrictCode: undefined,
    WardCode: undefined,
  };

  const renderCityOptions = useMemo(() => {
    return cityList?.data?.map((item) => {
      return (
        <Select.Option key={item.id} value={item.code}>
          {item.name}
        </Select.Option>
      );
    });
  }, [cityList.data]);

  const renderWardsOptions = useMemo(() => {
    return WardsList?.data?.map((item) => {
      return (
        <Select.Option key={item.id} value={item.code}>
          {item.name}
        </Select.Option>
      );
    });
  });

  const renderDistrictOptions = useMemo(() => {
    return DistrictList?.data?.map((item) => {
      return (
        <Select.Option key={item.id} value={item.code}>
          {item.name}
        </Select.Option>
      );
    });
  });
  const handleSubmitInfoForm = (values) => {
    console.log(values);
  };

  const [step, setStep] = useState(0);
  const submit1 = () => {
    setStep(1);
  };
  const submit2 = () => {
    setStep(2);
  };

  return (
    <div>
      <div style={{ marginBottom: 20, width: 1300 }}>
        <Steps current={step}>
          <Steps.Step title="Giỏ hàng" />
          <Steps.Step title="Thông tin khách hàng" />
          <Steps.Step title="Thanh Toán" />
          <Steps.Step title="Hoàn tất" />
        </Steps>
      </div>
      <Form
        onFinish={(values) => handleSubmitInfoForm(values)}
        name="infoForm"
        form={infoForm}
        initialValues={initialValues}
        labelCol={{
          span: 7,
        }}
      >
        <Form.Item
          label={<b>Tỉnh/Thành phố</b>}
          name="cityCode"
          rules={[
            {
              required: true,
              message: "Đây là trường bắt buộc!",
            },
          ]}
        >
          <Select
            onChange={(value) => {
              dispatch(getDistrictsLocation(value));
              infoForm.setFieldsValue({
                districtCode: undefined,
                wardCode: undefined,
              });
            }}
            style={{
              boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
            }}
          >
            {renderCityOptions}
          </Select>
        </Form.Item>
        <Form.Item
          label={<b>Quận/Huyện</b>}
          name="districtCode"
          rules={[
            {
              required: true,
              message: "Đây là trường bắt buộc!",
            },
          ]}
        >
          <Select
            style={{
              boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
            }}
            onChange={(value) => {
              dispatch(getWardsLocation(value));
              infoForm.setFieldsValue({
                wardCode: undefined,
              });
            }}
          >
            {renderDistrictOptions}
          </Select>
        </Form.Item>
        <Form.Item
          label={<b>Phường/Xã</b>}
          name="wardCode"
          rules={[
            {
              required: true,
              message: "Đây là trường bắt buộc!",
            },
          ]}
        >
          <Select
            style={{
              boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
            }}
          >
            {renderWardsOptions}
          </Select>
        </Form.Item>
        <Form.Item
          label={<b>Địa chỉ</b>}
          name="address"
          rules={[
            {
              required: true,
              message: "Đây là trường bắt buộc!",
            },
          ]}
        >
          <Input
            style={{
              boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
            }}
          />
        </Form.Item>
        <Form.Item>
          <Button onClick={() => infoForm.submit()}> Submit</Button>
        </Form.Item>
      </Form>

      <Button onClick={submit1}> Submit1</Button>

      <Button onClick={submit2}> Submit2</Button>
    </div>
  );
};

export default Location;
