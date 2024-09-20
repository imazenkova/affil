import { CloseOutlined } from "@ant-design/icons";
import { SaveButton, useForm } from "@refinedev/antd";
import { useCustom, type HttpError } from "@refinedev/core";
import { Button, Card, Col, Drawer, Form, Input, Row, Spin, message } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UpdateReferrer } from "../../../types/traffic";
import { Text } from "../../text";
import { dataProviderRest } from "../../../providers";

type Props = {
  opened: boolean;
  setOpened: (opened: boolean) => void;
  userId: string;
};

export const AccountSettings = ({ opened, setOpened }: Props) => {
  const referrerId = localStorage.getItem("referrerId");
  const {
    saveButtonProps,
    formProps,
    query,
    formLoading,
    onFinish,
  } = useForm<UpdateReferrer, HttpError, UpdateReferrer>({
    resource: "referrers",
    action: "edit",
    id: referrerId ? referrerId : '',
  });

  const defaultValues = query?.data?.data;
  const [values, setValues] = useState<any>({
    lastName: defaultValues?.lastName || "",
    firstName: defaultValues?.firstName || "",
    email: defaultValues?.email || ""
  });

  const [changePasswordVisible, setChangePasswordVisible] = useState(false);
  const [changeEmailVisible, setChangeEmailVisible] = useState(false);
  const [form] = Form.useForm();

  const closeModal = () => {
    setOpened(false);
  };

  const handleChangePassword = () => {
    setChangePasswordVisible(true);
  };

  const handleChangeEmail = () => {
    setChangeEmailVisible(true);
  };

  const handlePasswordSubmit = async (values: any) => {
    const { oldPassword, newPassword } = values;
    try {
      await dataProviderRest.create(`referrers/change-password/${referrerId}`, values);
      message.success('Password changed successfully!');
      form.resetFields();
      setChangePasswordVisible(false);
    } catch (error) {
      form.resetFields();
      message.error('Failed to change password. Please try again.');
    }
  };

  const handleEmailSubmit = async (values: any) => {
    try {
      await dataProviderRest.create(`referrers/change-email`, values);
      message.success('Instruction send to your email!');
      form.resetFields();
      setChangeEmailVisible(false);
    } catch (error) {
      message.error('Failed to change email. Please try again.');
    }
  };

  if (formLoading) {
    return (
      <Drawer
        open={opened}
        width={756}
        styles={{
          body: {
            background: "#f5f5f5",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          },
        }}
      >
        <Spin />
      </Drawer>
    );
  }

  return (
    <Drawer
      onClose={closeModal}
      open={opened}
      width={756}
      styles={{
        body: { background: "#f5f5f5", padding: 0 },
        header: { display: "none" },
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px",
          backgroundColor: "#fff",
        }}
      >
        <Text strong>Account Settings</Text>
        <Button
          type="text"
          icon={<CloseOutlined />}
          onClick={closeModal}
        />
      </div>
      <div style={{ padding: "16px" }}>
        <Card>
          <Form {...formProps} layout="vertical">
            <Form.Item label="First name" name="firstName">
              <Input placeholder="First name" />
            </Form.Item>
            <Form.Item label="Last name" name="lastName">
              <Input placeholder="Last name" />
            </Form.Item>
            <Form.Item label="Country" name="country">
              <Input placeholder="Country" />
            </Form.Item>
            <Form.Item label="Email" name="email">
              <Input placeholder="Email" disabled />
            </Form.Item>
            <Form.Item label="Referral code" name="referral_code">
              <Input placeholder="Code" disabled />
            </Form.Item>
          </Form>
          <SaveButton
            {...saveButtonProps}
            style={{
              display: "block",
              marginLeft: "auto",
            }}
          />
        </Card>

        <Card title="Change credentials">
          <Row justify="center">
            <Col>
              <Button type="primary" style={{ margin: '0 10px' }} onClick={handleChangePassword}>
                Change Password
              </Button>
              <Button type="primary" style={{ margin: '0 10px' }} onClick={handleChangeEmail}>
                Change Email
              </Button>
            </Col>
          </Row>
        </Card>

        <Drawer
          title="Change Password"
          placement="right"
          closable={true}
          onClose={() => setChangePasswordVisible(false)}
          open={changePasswordVisible}
        >
          <Form form={form} layout="vertical" onFinish={handlePasswordSubmit}>
            <Form.Item
              label="Old Password"
              name="oldPassword"
              rules={[{ required: true, message: 'Please enter your old password!' }]}
            >
              <Input.Password placeholder="Enter old password" />
            </Form.Item>
            <Form.Item
              label="New Password"
              name="newPassword"
              rules={[
                { required: true, message: 'Please enter your new password!' },
                { min: 8, message: 'Password must be at least 8 characters long!' },
              ]}
            >
              <Input.Password placeholder="Enter new password" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Save
              </Button>
            </Form.Item>
          </Form>
        </Drawer>

        <Drawer
          title="Change Email"
          placement="right"
          closable={true}
          onClose={() => setChangeEmailVisible(false)}
          open={changeEmailVisible}
        >
          <Form form={form} layout="vertical" onFinish={handleEmailSubmit}>
            <Form.Item
              label="New Email"
              name="newEmail"
              rules={[
                { required: true, message: 'Please enter your new email!' },
                { type: 'email', message: 'Please enter a valid email!' }
              ]}
            >
              <Input placeholder="Enter new email" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Save
              </Button>
            </Form.Item>
          </Form>
        </Drawer>
      </div>
    </Drawer>
  );
};