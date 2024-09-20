import {
  useNotification,
    useTranslate
} from "@refinedev/core";
import { Button, Card, Col, Form, Input, Layout, Row } from "antd";
import { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { dataProviderRest } from "../../../../providers";


const EmailChangePage = () => {
  const [form] = Form.useForm();
  const translate = useTranslate();
  const navigate = useNavigate();
  const { open } = useNotification();
  useEffect(() => {

    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");

    form.setFieldsValue({
      code: code || '', 
    });
  }, [form]);

  const handleSubmit = async (values:any) => {
    try {
const referrerId= localStorage.getItem('referrerId')
console.log({...values,userId:referrerId})
      await dataProviderRest.create('referrers/change-email/reset', {...values,userId:referrerId});
      open?.({
        type: "success",
        message: "Success",
        description: "Email changed!",
      }); 
      navigate("/"); 
    } catch (e) {
      const error = e as Error;
      open?.({
        type: "error",
         message: "Error",
        description:"Failed! Try again!",
      }); 
        console.log(error)
    }
  };

  return (
    <Layout style={{ height: "100vh", padding: "16px" }}>
      <Row justify="center" align="middle" style={{ height: "100%" }}>
        <Col xs={22} sm={12} md={8}>
          <Card title={translate("pages.verification.title", "Confirm email changing")}>
            <Form form={form} layout="vertical" onFinish={handleSubmit}>
              <Form.Item
                name="newEmail"
                label={translate("pages.verification.fields.email", "New email")}
                rules={[
                  { required: true, message: translate("pages.verification.errors.requiredEmail", "Email is required") },
                  { type: "email", message: translate("pages.verification.errors.validEmail", "Invalid email address") },
                ]}
              >
                <Input placeholder={translate("pages.verification.fields.email", "Enter your requested new email")} />
              </Form.Item>
              <Form.Item
                name="code"
                label={translate("pages.verification.fields.code", "Code")}
                rules={[
                  { required: true, message: translate("pages.verification.errors.requiredCode", "Code is required") },
                ]}
            
              >
                <Input placeholder={translate("pages.verification.fields.email", "Enter your code")} disabled />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" block>
                  {translate("pages.verification.submit", "Change email")}
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </Layout>
  );
};

export default EmailChangePage;