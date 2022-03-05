import { Checkbox, Col, DatePicker, Divider, Modal, Row } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import StripeCheckout from 'react-stripe-checkout';
import DefaultLayout from '../components/DefaultLayout';
import Spinner from '../components/Spinner';
import { bookCar } from '../redux/actions/bookingActions';
import { getAllCars } from '../redux/actions/carsActions';


const { RangePicker } = DatePicker;

function BookingCar({ match }) {
  const {cars} = useSelector(state => state.carsReducer)
  const {loading} = useSelector(state => state.alertsReducer)
  const [car, setcar] = useState({})
  const dispatch = useDispatch()
  const [from, setFrom] = useState()
  const [to, setTo] = useState()
  const [totalHours, setTotalHours] = useState(0)
  const [driver, setdriver] = useState(false)
  const [totalAmount, setTotalAmount] = useState(0)
  const [showModal, setShowModal] = useState(false)

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
      setTotalAmount(totalAmount + (35 * totalHours))
    }

  }, [driver, totalHours])

  function selectTimeSlots(values) {

    setFrom(moment(values[0]).format('MMM DD YYYY hh:00 a'));
    setTo(moment(values[1]).format('MMM DD YYYY hh:00 a'));

    setTotalHours( (values[1].diff(values[0], 'Hours')));
  }

function onToken(token) {
  const reqObj = {
    token,
    user : JSON.parse(localStorage.getItem('user'))._id,
    car: car._id,
    totalHours,
    totalAmount,
    driverRequired : driver,
    bookedTimeSlots : {
      from,
      to,
    },
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
        <Divider type='horizontal' dashed >Car Info</Divider>
        <div className="" style={{ textAlign: 'right' }} >
          <p>{car.name}</p>
          <p>Max. Occupants : {car.capacity}</p>
          <p>Fuel Type : {car.fuelType}</p>
          <p>${car.rentPerHour} /Hour</p>
        </div>

        <Divider type='horizontal' dashed >Select Time Slots</Divider>
        {/* <RangePicker format='MMM DD YYYY h:00 a' onChange={selectTimeSlots} /> */}
        <RangePicker showTime={{format: 'hh:00 a'}} format='MMM DD YYYY hh:00 a' onChange={selectTimeSlots} />
        <br />
        <button className="btn4 mt-2" onClick={() => {setShowModal(true)}}>Booked Slots
        </button>
        { from && to && (
          <div className="">
          <p>Hours Booked : <b>{totalHours}</b></p>
          <p>Price /Hour : <b>${car.rentPerHour}</b></p>
          <Checkbox onChange = {(e) => {
            if(e.target.checked)
            {
              setdriver(true);
            }
            else {
              setdriver(false)
            }
          }}
          >
            Driver Requested ($35/hr)
          </Checkbox>

          <h3 className="">Total Booking Price : ${totalAmount}</h3>

          <StripeCheckout
          shippingAddress
            token={onToken}
            amount={totalAmount * 100}
            stripeKey="pk_test_51KOtvLAN05eIhtIj1iz7Ajp76EUwp5NorezDTrub1s2g1BnYDtwD1Q9QwsXZp172uwICnxYGzkNCgTWSAER58oI100QqAdGTzF"
          >
            <button className="btn4">
              <b>Book Your Ride</b>
            </button>
          </StripeCheckout>

        </div>
        )}

      </Col>

    </Row>
    {car.name && (
    <Modal visible={showModal} closable={false} footer={false} bodyStyle={{fontWeight: 'bold', backgroundColor: '#e9eef0', border: '1px #000 solid'}} title={<b>Booked time slots</b>}>
      <div className="p-2">
        {car.bookedTimeSlots.map(slot => {
          return <button className="btn4 mt-2"><b>{slot.from} - {slot.to}</b></button>
        })}

        <div className="text-right mt-5">
          <button className="btn4 mt-2" onClick={() => {setShowModal(false)}}>CLOSE</button>
        </div>
      </div>

    </Modal>
    )}
  </DefaultLayout>
  );
}

export default BookingCar;
