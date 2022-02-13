import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import DefaultLayout from '../components/DefaultLayout';
import { getAllCars } from '../redux/actions/carsActions';
import { Row, Col, Button } from 'antd';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';

function Home() {
  const {cars} = useSelector(state=>state.carsReducer)
  const {loading} = useSelector(state => state.alertsReducer)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllCars())

  }, [])

  return (
    <DefaultLayout>

    {loading === true && (<Spinner />)}

      <Row justify="center" gutter={16} className="mt-5">

        {cars.map(car => {
          return <Col xl={5} lg={5} sm={12} xs={24}>
            <div className="card p-2 bs1">
              <img src={car.image} className="card-img" alt=""/>

              <div className="card-content d-flex align-items-center justify-content-between">

                <div className="">
                  <p>{car.name}</p>
                  <p>{car.rentPerHour} Per Hour </p>
                </div>

                <div>
                  <button className="btn2 mr-2"><Link to={`/booking/${car._id}`} className="btn3">Book Now<span className="appear"> !</span></Link></button>
                </div>

              </div>
            </div>
          </Col>
        })}
      </Row>
    </DefaultLayout>
  );
}

export default Home;