import { Col, Form, Input, Row } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DefaultLayout from "../components/DefaultLayout";
import Spinner from "../components/Spinner";
import { editCar, getAllCars } from "../redux/actions/carsActions";

function EditCar({ match }) {
  const { cars } = useSelector((state) => state.carsReducer);
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.alertsReducer);
  const [car, setcar] = useState();
  const [totalcars, settotalcars] = useState([]);

  useEffect(() => {
    if (cars.length === 0) {
      dispatch(getAllCars());
    } else {
      settotalcars(cars);
      setcar(cars.find((o) => o._id === match.params.carid));
      console.log(car);
    }
  }, [cars]);
  function onFinish(values) {
    values._id = car._id;
    dispatch(editCar(values));
    console.log(values);
  }
  return (
    <DefaultLayout>
      {loading && <Spinner />}
      <Row justify="center" className="mt-4">
        <Col lg={12} sm={24} xs={24}>
          {totalcars.length > 0 && (
            <Form
              initialValues={car}
              className="bs1 p-3 mt-4 EB dark"
              layout="vertical"
              onFinish={onFinish}
            >
              <h2 className="mt-2">Edit Car</h2>
              <div className="mb-3">
                <img
                  src={car.image}
                  style={{ float: "center" }}
                  className="carimg3 bs1"
                  alt=""
                />
              </div>
              <h4>{car.name}</h4>

              <hr />
              <Form.Item
                name="name"
                label="Car Name"
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
                name="rentPerHour"
                label="Rent Per Hour"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="capacity"
                label="Capacity"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="fuelType"
                label="Fuel Type"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>

              <div className="text-right mb-2">
                <button className="btn4">
                  <b>EDIT CAR</b>
                </button>
              </div>
            </Form>
          )}
        </Col>
      </Row>
    </DefaultLayout>
  );
}

export default EditCar;
