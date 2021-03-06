import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Col, DatePicker, Popconfirm, Row } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import DefaultLayout from "../components/DefaultLayout";
import Spinner from "../components/Spinner";
import { deleteCar, getAllCars } from "../redux/actions/carsActions";

const { RangePicker } = DatePicker;

function AdminHome() {
  const { cars } = useSelector((state) => state.carsReducer);
  const { loading } = useSelector((state) => state.alertsReducer);
  const [totalCars, setTotalCars] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCars());
  }, [dispatch]);

  useEffect(() => {
    setTotalCars(cars);
  }, [cars]);

  return (
    <DefaultLayout>
      <Row gutter={16} className="mt-4 pt-4">
        <Col lg={20} sm={24}>
          <div className="text-right">
            <button className="btn4">
              <a href="/addcar">
                <b>ADD CAR</b>
              </a>
            </button>
          </div>
        </Col>
      </Row>
      {loading === true && <Spinner />}

      <Row justify="center" gutter={16}>
        {totalCars.map((car) => {
          return (
            <Col lg={5} sm={24} xs={24}>
              <div className="card p-2 bs1">
                <img src={car.image} className="card-img" alt="" />

                <div className="card-content d-flex align-items-center justify-content-between">
                  <div className="text-left pl-2">
                    <p>
                      <b>{car.name}</b>
                    </p>
                    <p>${car.rentPerHour} Per Hour </p>
                  </div>

                  <div className="mr-4">
                    <Link to={`/editcar/${car._id}`}>
                      <EditOutlined
                        className="mr-3"
                        style={{ color: "green", cursor: "pointer" }}
                      />
                    </Link>
                    <Popconfirm
                      title="Are you sure to delete this Car?"
                      onConfirm={() => {
                        dispatch(deleteCar({ carid: car._id }));
                      }}
                      okText="Yes"
                      cancelText="No"
                    >
                      <DeleteOutlined
                        className=""
                        style={{ color: "#af1c1c", cursor: "pointer" }}
                      />
                    </Popconfirm>
                  </div>
                </div>
              </div>
            </Col>
          );
        })}
      </Row>
    </DefaultLayout>
  );
}

export default AdminHome;
