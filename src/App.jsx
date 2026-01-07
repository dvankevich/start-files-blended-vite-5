import { Navigate, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Rates from './pages/Rates';
import Header from './components/Header/Header';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchBaseCurrency } from './redux/operations';

export const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    function success(pos) {
      //const crd = pos.coords;
      dispatch(fetchBaseCurrency(pos.coords));
      // console.log('Your current position is:');
      // console.log(`Latitude : ${crd.latitude}`);
      // console.log(`Longitude: ${crd.longitude}`);
      // console.log(`More or less ${crd.accuracy} meters.`);
      // console.log(crd);
    }

    function error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    navigator.geolocation.getCurrentPosition(success, error, options);
  }, [dispatch]);
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rates" element={<Rates />} />
        <Route path="*" element={<Navigate to={'/'} />} />
      </Routes>
    </>
  );
};
