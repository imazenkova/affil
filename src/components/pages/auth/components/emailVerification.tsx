import {
    useTranslate
} from "@refinedev/core";
import { Button, Card, Col, Form, Input, Layout, Row } from "antd";
import { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { API_URL, dataProviderRest } from "../../../../providers";
import dataProvider from "@refinedev/simple-rest";


const EmailVerificationPage = () => {
  const [form] = Form.useForm();
  const translate = useTranslate();
const navigate= useNavigate()

  useEffect(() => {

    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    const email = params.get("email"); 

    // Устанавливаем начальные значения формы
    form.setFieldsValue({
      email: email || '', 
      code: code || '', 
    });
  }, [form]);

  const handleSubmit = async (values:any) => {
    try {
      const { data } = await dataProvider(`${API_URL}`).create({
        resource: 'referrers/verification',
        variables: {
          email:values.email,
          code:values.code,
        },
      });

      localStorage.setItem("accessToken", data.accessToken);
    const res =   await dataProviderRest.create('referrers/verification', values);
    console.log (res)
// localStorage.setItem("accessToken")
navigate('/')
    } catch (error) {
        console.log(error)

    }
  };

  return (
    <Layout style={{ height: "100vh", padding: "16px" }}>
      <Row justify="center" align="middle" style={{ height: "100%" }}>
        <Col xs={22} sm={12} md={8}>
          <Card title={translate("pages.verification.title", "Email Verification")}>
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
                  { required: true, message: translate("pages.verification.errors.requiredEmail", "Code is required") },
                ]}
              >
                <Input placeholder={translate("pages.verification.fields.email", "Enter your code")} />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" block>
                  {translate("pages.verification.submit", "Verify Email")}
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </Layout>
  );
};

export default EmailVerificationPage;