import { useState } from 'react';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { SearchBar } from './SearchBar/SearchBar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const App = () => {
  const [searchedItem, setSearchedItem] = useState('');

  const onSubmit = data => {
    setSearchedItem(data);
  };

  return (
    <div
      style={{
        margin: 0,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 40,
        color: '#010101',
      }}
    >
      <SearchBar onSubmit={onSubmit} />

      <ToastContainer className="toastContainer" />
      <ImageGallery searchedItem={searchedItem} />
    </div>
  );
};
