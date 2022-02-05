import React from 'react';
import { useSelector } from 'react-redux';
import DefaultLayout from '../components/DefaultLayout';

function Home() {
  const {cars} = useSelector(state=>state.carsReducer)
  return (
    <DefaultLayout>
        <h1>Home page</h1>
        <h1>The length of the cars array is {cars.length}</h1>
    </DefaultLayout>
    );
  }

export default Home;