import { Checkbox, Col, DatePicker, Divider, Row } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DefaultLayout from '../components/DefaultLayout';
import Spinner from '../components/Spinner';
import { bookCar } from '../redux/actions/bookingActions';
import { getAllCars } from '../redux/actions/carsActions';


const { RangePicker } = DatePicker;

function BookingCar({match}) {
  const {cars} = useSelector(state => state.carsReducer)
  const {loading} = useSelector(state => state.alertsReducer)
  const [car, setcar] = useState({})
  const dispatch = useDispatch()
  const [from, setFrom] = useState()
  const [to, setTo] = useState()
  const [totalHours, setTotalHours] = useState(0)
  const [driver, setdriver] = useState(false)
  const [totalAmount, setTotalAmount] = useState(0)

  useEffect(() => {

    if (cars.length === 0) {
      dispatch(getAllCars());
    } else {
      setcar(cars.find(o => o._id === match.params.carid))
    }

  }, [cars]);

  useEffect(() => {

    setTotalAmount((totalHours * car.rentPerHour))
    if (driver) {
      setTotalAmount(totalAmount + (20 * totalHours))
    }

  }, [driver, totalHours, car.rentPerHour])

  function selectTimeSlots(values) {

    setFrom(moment(values[0]).format('MMM DD YYYY h:00 a'));
    setTo(moment(values[1]).format('MMM DD YYYY h:00 a'));

    setTotalHours(1 + (values[1].diff(values[0], 'Hours')));

  }

  function bookNow() {
    const reqObj = {
      user : JSON.parse(localStorage.getItem('user'))._id,
      car: car._id,
      totalHours,
      totalAmount,
      driverRequired : driver,
      bookedTimeSlots : {
        from,
        to
      }
    }

    dispatch(bookCar(reqObj));

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
          <p>Total Hours : <b>{totalHours}</b></p>
          <p>Price Per Hour : <b>{car.rentPerHour}</b></p>
          <Checkbox onChange = {(e) => {
            if(e.target.checked)
            {
              setdriver(true);
            }
            else {
              setdriver(false)
            }
          }}>Driver Required (20/hr)</Checkbox>
          <h3 className="">Total Amount : {totalAmount}</h3>
          <button className="btn4" onClick={bookNow}><b>Save Your Booking</b></button>
        </div>

      </Col>

    </Row>
  </DefaultLayout>
  );
}

export default BookingCar;