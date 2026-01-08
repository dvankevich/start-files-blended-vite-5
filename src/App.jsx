import { Navigate, Route, Routes } from 'react-router-dom';
import { Suspense, lazy } from 'react';
const Home = lazy(() => import('./pages/Home'));
const Rates = lazy(() => import('./pages/Rates'));
// const Header = lazy(() => import('./components/Header/Header'));
import Header from './components/Header/Header';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchBaseCurrency } from './redux/operations';
import { setBaseCurrency } from './redux/currencySlice';

import Loader from './components/Loader/Loader';

export const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    function success(pos) {
      dispatch(fetchBaseCurrency(pos.coords));
    }

    function error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
      dispatch(setBaseCurrency('USD'));
    }

    navigator.geolocation.getCurrentPosition(success, error, options);
  }, [dispatch]);
  return (
    <>
      <Header />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rates" element={<Rates />} />
          <Route path="*" element={<Navigate to={'/'} />} />
        </Routes>
      </Suspense>
    </>
  );
};
