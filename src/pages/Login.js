import { Col, Form, Input, Row } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { userLogin } from '../redux/actions/userActions';



function Login() {
  const dispatch = useDispatch()
  function onFinish(values) {
    dispatch(userLogin(values))
    console.log(values);
  }

  return (
    <div className="login">

      <Row gutter={16} className="d-flex align-items-center">

        <Col lg={16} style={{position: 'relative'}}>
          <h1 className="login-logo">Ride On The Side</h1>
          <img src="https://images.unsplash.com/photo-1485291571150-772bcfc10da5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80" alt="" />
        </Col>
        <Col lg={8} className="text-left p-5">
          <Form layout='vertical' className="login-form p-5" onFinish={onFinish}>
            <h1>Login</h1>
            <hr />

            <Form.Item name='username' label='Username' rules={[{required: true}]}>
              <Input />
            </Form.Item>
            <Form.Item name='password' label='Password' rules={[{required: true}]}>
              <Input />
            </Form.Item>

            <button className="btn1 mt-2">Login</button>

            <hr />

            <Link to='/register'>Click Here to Register</Link>

          </Form>
        </Col>


      </Row>

    </div>
  );
}

export default Login;