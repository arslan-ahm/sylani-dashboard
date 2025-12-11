import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button, Input, Form, Divider, Card } from 'antd';
import { 
  UserOutlined, 
  LockOutlined, 
  GoogleOutlined, 
  LoginOutlined 
} from '@ant-design/icons';
import { useAuth } from '../../contexts/AuthContext';
import Footer from '../../components/Footer';

const Login = () => {
  const [form] = Form.useForm();
  const [emailLoading, setEmailLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const { login, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleEmailLogin = async (values) => {
    setEmailLoading(true);
    try {
      await login(values.email, values.password);
      navigate('/');
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setEmailLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    try {
      await loginWithGoogle();
      navigate('/');
    } catch (error) {
      console.error('Google login failed:', error);
    } finally {
      setGoogleLoading(false);
    }
  };

  const fillDemoCredentials = () => {
    form.setFieldsValue({
      email: 'demo@email.com',
      password: '12345678',
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-3 sm:p-4 md:p-6">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md"
      >
        <Card className="shadow-2xl rounded-2xl overflow-hidden border-0">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
            >
              <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-white">
                <LoginOutlined className="text-4xl text-blue-600" />
              </div>
            </motion.div>
            <h1 className="text-3xl font-bold text-white">Sylani Dashboard</h1>
            <p className="mt-2 text-sm text-white/90">Admin Portal Login</p>
          </div>

          {/* Demo Credentials Banner */}
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-800">Demo Account</p>
                <p className="text-xs text-blue-600">demo@email.com / 12345678</p>
              </div>
              <Button
                size="small"
                type="link"
                onClick={fillDemoCredentials}
                className="text-blue-600"
              >
                Auto-fill
              </Button>
            </div>
          </div>

          {/* Login Form */}
          <div className="p-8">
            <Form
              form={form}
              onFinish={handleEmailLogin}
              layout="vertical"
              size="large"
            >
              <Form.Item
                name="email"
                rules={[
                  { required: true, message: 'Please enter your email' },
                  { type: 'email', message: 'Please enter a valid email' },
                ]}
              >
                <Input
                  prefix={<UserOutlined className="text-gray-400" />}
                  placeholder="Email address"
                  className="rounded-lg"
                />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[{ required: true, message: 'Please enter your password' }]}
              >
                <Input.Password
                  prefix={<LockOutlined className="text-gray-400" />}
                  placeholder="Password"
                  className="rounded-lg"
                />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={emailLoading}
                  disabled={googleLoading}
                  block
                  className="h-12 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:from-blue-700 hover:to-purple-700"
                >
                  Sign In
                </Button>
              </Form.Item>
            </Form>

            <Divider className="my-6">
              <span className="text-gray-500 text-sm">Or continue with</span>
            </Divider>

            {/* Social Login Buttons */}
            <div className="space-y-3">
              <Button
                icon={<GoogleOutlined />}
                onClick={handleGoogleLogin}
                loading={googleLoading}
                disabled={emailLoading}
                block
                size="large"
                className="h-12 rounded-lg border-2 border-gray-300 hover:border-blue-500 hover:text-blue-600 font-medium"
              >
                Sign in with Google
              </Button>
            </div>

            {/* Security Note */}
            <div className="mt-8 text-center">
              <p className="text-xs text-gray-500">
                🔒 Protected by Firebase Authentication
              </p>
            </div>
          </div>
        </Card>

      </motion.div>
      
      {/* Dynamic GitHub Footer */}
      <div className="fixed bottom-0 left-0 right-0">
        <Footer />
      </div>
    </div>
  );
};

export default Login;
