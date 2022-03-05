import { Col, Row } from "antd";
import moment from "moment";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DefaultLayout from "../components/DefaultLayout";
import Spinner from "../components/Spinner";
import { getAllBookings } from "../redux/actions/bookingActions";

function UserBookings() {
  const dispatch = useDispatch();
  const { bookings } = useSelector((state) => state.bookingsReducer);
  const { loading } = useSelector((state) => state.alertsReducer);
  const user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    dispatch(getAllBookings());
  }, [dispatch]);

  return (
    <DefaultLayout>
      {loading && <Spinner />}
      <h2 className="text-center mt-3">My Bookings</h2>
      <Row justify="center" gutter={16}>
        <Col lg={16} sm={24}>
          {bookings.filter((o) => o.user === user._id).map((booking) => {
              // eslint-disable-next-line array-callback-return
              return <Row className="bs1 m-2 text-left align-items-center"
                  // style={{ backgroundColor: "#c6d166" }}
                  // style={{ backgroundColor: "#8b944fbd" }}
                  style={{ backgroundColor: "rgba(231, 224, 224, .8)" }}
                  gutter={16}
                >
                  <Col lg={8} sm={24}>
                    <h6 className="">
                      <b>{booking.car.name}</b>
                    </h6>
                    <p>
                      Hours Booked : <b>{booking.totalHours}</b>
                    </p>
                    <p>
                      Price /Hr : <b>${booking.car.rentPerHour}</b>
                    </p>
                    <p>
                      Total Booking Price :" "
                      <span>
                        <b>${booking.totalAmount}</b>
                      </span>
                    </p>
                  </Col>
                  <Col lg={8} sm={24}>
                    <p>
                      Transaction Id : <b>{booking.transactionId}</b>
                    </p>
                    <p>
                      From: <b>{booking.bookedTimeSlots.from}</b>
                    </p>
                    <p>
                      To: <b>{booking.bookedTimeSlots.to}</b>
                    </p>
                    <p>
                      Date Of Booking:" "
                      <b>{moment(booking.createdAt).format("MMM DD YYYY")}</b>
                    </p>
                  </Col>
                  <Col lg={8} sm={24} className="text-right">
                    <img
                      style={{ borderRadius: 15 }}
                      src={booking.car.image}
                      height="140"
                      className="p-2"
                      alt=""
                    />
                  </Col>
                </Row>

            })}
          ;
        </Col>
      </Row>
    </DefaultLayout>
  );
}

export default UserBookings;

