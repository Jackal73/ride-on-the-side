import axios from 'axios'
import { message } from 'antd';

export const bookCar = (reqObj) => async dispatch => {

  dispatch({
    type: 'LOADING',
    payload: true
  })

  try {
    const response = await axios.post('/api/bookings/bookcar')

    dispatch({
      type: 'LOADING',
      payload: false
    })
    message.success('Your car and time slot have been booked!')
  } catch (error) {
    console.log(error)
    dispatch({
      type: 'LOADING',
      payload: false
    })
    message.error('Something went wrong. Please try again later')
  }
}