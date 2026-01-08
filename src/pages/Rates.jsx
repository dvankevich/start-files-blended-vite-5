import { Wave } from 'react-animated-text';
import Section from '../components/Section/Section';
import Container from '../components/Container/Container';
import Heading from '../components/Heading/Heading';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import {
  selectBaseCurrency,
  selectFilteredRates,
  selectIsError,
  selectIsLoading,
  selectRates,
} from '../redux/selectors';
import { fetchLatestRates } from '../redux/operations';
import RatesList from '../components/RatesList/RatesList';
import Loader from '../components/Loader/Loader';
import Filter from '../components/Filter/Filter';

const Rates = () => {
  const dispatch = useDispatch();
  const isError = useSelector(selectIsError);
  const isLoading = useSelector(selectIsLoading);
  const baseCurrency = useSelector(selectBaseCurrency);
  const filteredRates = useSelector(selectFilteredRates);
  const rates = useSelector(selectRates);

  useEffect(() => {
    dispatch(fetchLatestRates(baseCurrency));
  }, [baseCurrency, dispatch]);

  // Визначення, що відображати на основі стану
  const renderContent = () => {
    if (isLoading) {
      return <Loader />;
    }

    if (isError) {
      return (
        <Heading
          error
          title="Something went wrong...😐 We cannot show current rates!"
        />
      );
    }

    if (rates.length === 0) {
      return <Heading info title="We cannot find this currency!" />;
    }

    return (
      <>
        {filteredRates.length > 0 && <Filter />}
        <RatesList rates={filteredRates} />
      </>
    );
  };

  return (
    <Section>
      <Container>
        <Heading
          info
          bottom
          title={
            <Wave
              text={`$ $ $ Current exchange rate for 1 ${baseCurrency} $ $ $`}
              effect="fadeOut"
              effectChange={4.0}
            />
          }
        />
        {renderContent()}
      </Container>
    </Section>
  );
};

export default Rates;
