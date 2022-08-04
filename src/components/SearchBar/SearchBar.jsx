import css from './SearchBar.module.css';
import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PropTypes from 'prop-types';

export const SearchBar = ({ onSubmit }) => {
  const [searchedItem, setSearchedItem] = useState('');

  const inputHandler = evt => {
    setSearchedItem(evt.currentTarget.value);
  };
  const onFormSubmit = evt => {
    evt.preventDefault();
    console.log(searchedItem);
    if (searchedItem.trim() === '') {
      toast.warn(' Please, type something.');
      return;
    }
    if (searchedItem.trim()) {
      onSubmit(searchedItem);
    }
  };

  return (
    <header className={css.searchBar}>
      <form className={css.searchForm} onSubmit={onFormSubmit}>
        <button type="submit" className={css.button}>
          <span className={css.buttonLabel}>Search</span>
        </button>

        <input
          value={searchedItem}
          onChange={inputHandler}
          className={css.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
