import { message } from 'antd';
import axios from 'axios';

export const userLogin = (reqObj) => async dispatch => {

  dispatch({
    type: 'LOADING',
    payload: true
  })

  try {
    const response = await axios.post('/api/users/login', reqObj)
    localStorage.setItem('user', JSON.stringify(response.data))
    message.success('Login was successful!')
    dispatch({
      type: 'LOADING',
      payload: false
    })
    setTimeout(() => {
      window.location.href='/'

    }, 500);
  } catch (error) {
    console.log(error)
    message.error('Something went wrong...')
    dispatch({
      type: 'LOADING',
      payload: false
    })
  }
}

export const userRegister = (reqObj) => async dispatch => {

  dispatch({
    type: 'LOADING',
    payload: true
  })

  try {
    const response = await axios.post('/api/users/register', reqObj)
    message.success('Registration was successful!')
    setTimeout(() => {
      window.location.href='/'

    }, 500);



    dispatch({
      type: 'LOADING',
      payload: false
    })

  } catch (error) {
    console.log(error)
    message.error('Something went wrong...')
    dispatch({
      type: 'LOADING',
      payload: false
    })
  }
}