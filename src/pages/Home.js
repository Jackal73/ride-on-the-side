import { Col, DatePicker, Row } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import DefaultLayout from '../components/DefaultLayout';
import Spinner from '../components/Spinner';
import { getAllCars } from '../redux/actions/carsActions';

const { RangePicker } = DatePicker

function Home() {
  const {cars} = useSelector(state=>state.carsReducer)
  const {loading} = useSelector(state => state.alertsReducer)
  const [totalCars , setTotalcars] = useState([])
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllCars())
  }, []);

  useEffect(() => {
    setTotalcars(cars)
  }, [cars])

  function setFilter(values) {
    var selectedFrom = moment(values[0], 'MMM DD YYYY h:00 a')
    var selectedTo = moment(values[1], 'MMM DD YYYY h:00 a')


    var temp = []

    for(var car of cars) {
      if(car.bookedTimeSlots.length === 0) {
        temp.push(car)
      }
      else {
        for(var booking of car.bookedTimeSlots) {

          if(selectedFrom.isBetween(booking.from, booking.to) ||
          selectedTo.isBetween(booking.from, booking.to) ||
          moment(booking.from).isBetween(selectedFrom, selectedTo) ||
          moment(booking.to).isBetween(selectedFrom, selectedTo)
          )
        {

        }
        else {
          temp.push(car)
        }
      }
    }
  }
  setTotalcars(temp)

  }

  return (
    <DefaultLayout>

    <Row className="mt-3" justify='center'>

      <Col lg={20} sm={24} className="d-flex justify-content-left">

        <RangePicker showTime={{format: 'h:00 a'}} format='MMM DD YYYY h:00 a' onChange={setFilter} />

      </Col>

    </Row>

    {loading === true && (<Spinner />)}



      <Row justify="center" gutter={16} className="">

        {totalCars.map(car => {
          return <Col xl={5} lg={5} sm={12} xs={24}>
            <div className="card p-2 bs1">
              <img src={car.image} className="card-img" alt=""/>

              <div className="card-content d-flex align-items-center justify-content-between">

                <div className="">
                  <p>{car.name}</p>
                  <p>${car.rentPerHour} Per Hour </p>
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