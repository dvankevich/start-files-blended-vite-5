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
  const isError = useSelector(selectIsError);
  const isLoading = useSelector(selectIsLoading);
  const baseCurrency = useSelector(selectBaseCurrency);
  const filteredRates = useSelector(selectFilteredRates);
  const dispatch = useDispatch();
  const rates = useSelector(selectRates);

  useEffect(() => {
    dispatch(fetchLatestRates(baseCurrency));
  }, [baseCurrency, dispatch]);

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
        {rates.length > 0 && <Filter />}
        {filteredRates.length > 0 ? (
          <RatesList rates={filteredRates} />
        ) : (
          <Heading info title="We cannot find this currency!" />
        )}
        {isError && (
          <Heading
            error
            title="Something went wrong...😐 We cannot show current rates!"
          />
        )}
        {isLoading && <Loader />}
      </Container>
    </Section>
  );
};

export default Rates;
