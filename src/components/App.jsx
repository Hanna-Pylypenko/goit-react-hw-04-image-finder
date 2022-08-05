import { useState, useEffect } from 'react';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { SearchBar } from './SearchBar/SearchBar';
import { ToastContainer } from 'react-toastify';
import { Button } from 'components/Button/Button';
import { ThreeDots } from 'react-loader-spinner';
import 'react-toastify/dist/ReactToastify.css';

export const App = () => {
  const [searchedItem, setSearchedItem] = useState('');
  const [searchedItemsCollection, setCollection] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(false);
  const [leftToLoad, setLeftToLoad] = useState(0);

  useEffect(() => {
    if (searchedItem === '') {
      return;
    }
    setLoading(true);
    fetch(
      `https://pixabay.com/api/?q=${searchedItem}&page=${pageNumber}&key=27847639-8e847d0d7182257a527cf2e5a&image_type=photo&orientation=horizontal&per_page=12`
    )
      .then(response => response.json())
      .then(res => {
        console.log(pageNumber);
        setLeftToLoad(res.totalHits - res.hits.length * pageNumber);
        setCollection(prevState => [...prevState, ...res.hits]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [searchedItem, pageNumber]);

  const onClick = () => {
    setPageNumber(prevState => prevState + 1);
  };
  const onSubmit = data => {
    if (data !== searchedItem) {
      setCollection([]);
      setPageNumber(1);
      setSearchedItem(data);
    }
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
      {loading && (
        <ThreeDots
          style={{
            height: '80',
            width: '80',
            radius: '9',
            color: 'green',
          }}
        />
      )}
      <ImageGallery searchedItemsCollection={searchedItemsCollection} />
      {!leftToLoad <= 0 && <Button onClick={onClick} />}
    </div>
  );
};
