import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import DefaultLayout from '../components/DefaultLayout';
import Spinner from '../components/Spinner';
import { Row, Col, Divider, DatePicker } from 'antd';
import { getAllCars } from '../redux/actions/carsActions';
import moment from 'moment';

const { RangePicker } = DatePicker;

function BookingCar({match}) {
  const {cars} = useSelector(state => state.carsReducer)
  const {loading} = useSelector(state => state.alertsReducer)
  const [car, setcar] = useState({})
  const dispatch = useDispatch()
  const[from, setFrom] = useState()
  const [to, setTo] = useState()
  const [totalHours, setTotalHours] = useState(0)

  useEffect(() => {

    if (cars.length === 0) {
      dispatch(getAllCars());
    } else {
      setcar(cars.find(o => o._id === match.params.carid))
    }

  }, [cars]);

  function selectTimeSlots(values) {
    console.log(moment(values[0]).format('MMM DD YYYY h:00 a'));
    console.log(moment(values[1]).format('MMM DD YYYY h:00 a'));
    setFrom(moment(values[0]).format('MMM DD YYYY h:00 a'))
    setTo(moment(values[1]).format('MMM DD YYYY h:00 a'))

    setTotalHours(values[1].diff(values[0], 'Hours'))

  }

  return (
  <DefaultLayout>
    {loading && (<Spinner />)}
    <Row justify='center' className='d-flex align-items-center' style={{minHeight: '90vh'}}>

      <Col lg={10} sm={24} xs={24}>
        <img src={car.image} className="carimg2 bs1" alt="" />
      </Col>

      <Col lg={10} sm={24} xs={24} className='text-right'>
        <Divider type='horizontal' dashed style={{fontWeight: 'semi-bold'}} >Car Info</Divider>
        <div className="" style={{ textAlign: 'right' }} >
          <p>{car.name}</p>
          <p>{car.rentPerHour} Rent Per Hour</p>
          <p>Fuel Type : {car.fuelType}</p>
          <p>Max Persons : {car.capacity}</p>
        </div>

        <Divider type='horizontal' dashed style={{fontWeight: 'semi-bold'}} >Select Time Slots</Divider>
        {/* <RangePicker format='MMM DD YYYY h:00 a' onChange={selectTimeSlots} /> */}
        <RangePicker showTime={{format: 'h:00 a'}} format='MMM DD YYYY h:00 a' onChange={selectTimeSlots} />

        <div className="">
          <p>Total Hours : {totalHours}</p>
        </div>

      </Col>

    </Row>
      {/* <h1>Booking Car</h1>
      <h1>Car Name = {car.name}</h1> */}
  </DefaultLayout>
  );
}

export default BookingCar;