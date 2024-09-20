import {
  useNotification,
  useTranslate
} from "@refinedev/core";
import { Button, Card, Col, Form, Input, Layout, Row } from "antd";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { dataProviderRest } from "../../../../providers";


const PasswordChangePage = () => {
  const [form] = Form.useForm();
  const translate = useTranslate();
  const navigate = useNavigate();
  const { open } = useNotification();
  useEffect(() => {

    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    const email = params.get("email"); 

    form.setFieldsValue({
      email: email || '', 
      code: code || '', 
    });
  }, [form]);

  const handleSubmit = async (values:any) => {
    try {
      await dataProviderRest.create('referrers/forgot-password/reset', values);
      open?.({
        type: "success",
        message: "Success",
        description: "Password changed",
      }); 
      navigate("/login"); 
    } catch (e) {
      const error = e as Error;
      open?.({
        type: "error",
        message: "Error",
        description: error ? error.message : "Failed",
      }); 
        console.log(error)
    }
  };

  return (
    <Layout style={{ height: "100vh", padding: "16px" }}>
      <Row justify="center" align="middle" style={{ height: "100%" }}>
        <Col xs={22} sm={12} md={8}>
          <Card title={translate("pages.verification.title", "Change Password")}>
            <Form form={form} layout="vertical" onFinish={handleSubmit}>
              <Form.Item
                name="email"
                label={translate("pages.verification.fields.email", "Email")}
                rules={[
                  { required: true, message: translate("pages.verification.errors.requiredEmail", "Email is required") },
                  { type: "email", message: translate("pages.verification.errors.validEmail", "Invalid email address") },
                ]}
              >
                <Input placeholder={translate("pages.verification.fields.email", "Enter your email")} />
              </Form.Item>
              <Form.Item
                name="code"
                label={translate("pages.verification.fields.code", "Code")}
                rules={[
                  { required: true, message: translate("pages.verification.errors.requiredCode", "Code is required") },
                ]}
              >
                <Input placeholder={translate("pages.verification.fields.email", "Enter your code")} disabled/>
              </Form.Item>
              <Form.Item
                name="password"
            
                label={translate("pages.verification.fields.password", "Password")}
                rules={[
                  { required: true, message: translate("pages.verification.errors.requiredPassword", "Password is required") },
                  { min: 8, message: 'Password must be at least 8 characters long!' },
                ]}
              >
                <Input   type="password"  placeholder={translate("pages.verification.fields.email", "Enter your new password")} />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" block>
                  {translate("pages.verification.submit", "Change Password")}
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </Layout>
  );
};

export default PasswordChangePage;