import { useDispatch } from 'react-redux';
import styles from './Filter.module.css';
import { setFilter } from '../../redux/filterSlice';

const Filter = () => {
  const dispatch = useDispatch();
  const handleChange = event => {
    console.log(event.target.value);
    dispatch(setFilter(event.target.value));
  };
  return (
    <input
      placeholder="What currency are you looking for?🧐"
      className={styles.input}
      onChange={handleChange}
    />
  );
};

export default Filter;
