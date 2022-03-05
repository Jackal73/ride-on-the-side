import userEvent from "@testing-library/user-event";
import { Col, Form, Input, Row } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DefaultLayout from "../components/DefaultLayout";
import Spinner from "../components/Spinner";
import { editProfile, getAllUsers } from "../redux/actions/userActions";


function EditProfile() {
//     const { users } = useSelector((state) => state.usersReducer);
//     const dispatch = useDispatch();
//     const { loading } = useSelector((state) => state.alertsReducer);
//     const [user, setuser] = useState();
//     const [totalusers, settotalusers] = useState([]);
//     useEffect(() => {
//         if (users.length === 0) {
//             dispatch(getAllUsers());
//         } else {
//             settotalusers(users);
//             setuser(users.find((o) => o._id === match.params.userid));
//             console.log(user);
//         }
//     }, [users]);
    // function onFinish(values) {
    //     values._id = user._id;
    //     dispatch(editProfile(values));
    //     console.log(values);
    // }
    return (
        <DefaultLayout>
        {/* {loading && <Spinner />} */}
        <Row justify="center" className="mt-4">
            <Col lg={12} sm={24} xs={24}>
            
                <Form
                    // initialValues={user}
                    className="bs1 p-3 mt-4 EB dark"
                    layout="vertical"
                    
                >            
                    <h2 className="mt-2">Profile Editor</h2>
                    <div className="mb-3">
                    <img
                        src='Shawn_profile.jpg'
                        style={{ float: "center" }}
                        className="carimg4 bs1"
                        alt=""
                    />
                    </div>
                    <h4 className="">Shawn Kebel</h4>
                    <hr />

                <Form.Item
                    name="name"
                    label="Name"
                    rules={[{ required: true }]}
                >
                <Input />
                </Form.Item>
                <Form.Item
                name="image"
                label="Image Url"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
                <Form.Item
                    name="email"
                    label="Email"
                    rules={[{ required: true }]}
                >
                <Input />
                </Form.Item>
                <Form.Item
                    name="username"
                    label="Username"
                    rules={[{ required: true }]}
                >
                <Input />
                </Form.Item>
                <Form.Item
                    name="password"
                    label="Password"
                    rules={[{ required: true }]}
                >
                <Input />
                </Form.Item>
            
                <div className="text-right mb-2">
                    <button className="btn4">
                    <b>EDIT PROFILE</b>
                    </button>
                </div>
                </Form>
            
            </Col>
        </Row>
        </DefaultLayout>
    );
}

export default EditProfile;