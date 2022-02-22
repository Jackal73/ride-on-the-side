import { message } from "antd";
import axios from "axios";

export const bookCar = (reqObj) => async (dispatch) => {
  dispatch({
    type: "LOADING",
    payload: true,
  });

  try {
    await axios.post("/api/bookings/bookcar", reqObj);

    dispatch({
      type: "LOADING",
      payload: false,
    });
    message.success("Your car and time slot have been booked!");
    setTimeout(() => {
      window.location.href = "/userBookings";
    }, 1000);
  } catch (error) {
    console.log(error);
    dispatch({
      type: "LOADING",
      payload: false,
    });
    message.error("Something went wrong. Please try again later");
  }
};

export const getAllBookings = () => async (dispatch) => {
  dispatch({
    type: "LOADING",
    payload: true,
  });

  try {
    const response = await axios.get("/api/bookings/getallbookings");
    dispatch({
      type: "GET_ALL_BOOKINGS",
      payload: response.data,
    });
    dispatch({
      type: "LOADING",
      payload: false,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: "LOADING",
      payload: false,
    });
  }
};
