import css from './ImageGallery.module.css';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { useState, useEffect } from 'react';
import { Button } from 'components/Button/Button';
import { ThreeDots } from 'react-loader-spinner';
import PropTypes from 'prop-types';
export const ImageGallery = ({ searchedItem }) => {
  const [searchedItemsCollection, setCollection] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(false);
  const [leftToLoad, setLeftToLoad] = useState(0);

  useEffect(() => {
    if (searchedItem === '') {
      return;
    }
    setCollection([]);
    setLoading(true);
    fetch(
      `https://pixabay.com/api/?q=${searchedItem}&page=1&key=27847639-8e847d0d7182257a527cf2e5a&image_type=photo&orientation=horizontal&per_page=12`
    )
      .then(response => response.json())
      .then(res => {
        setLeftToLoad(res.totalHits - res.hits.length);
        setCollection(res.hits);
      })
      .finally(() => setLoading(false));
  }, [searchedItem]);

  useEffect(() => {
    if (pageNumber === 1) {
      return;
    }
    fetch(
      `https://pixabay.com/api/?q=${searchedItem}&page=${pageNumber}&key=27847639-8e847d0d7182257a527cf2e5a&image_type=photo&orientation=horizontal&per_page=12`
    )
      .then(response => response.json())
      .then(res => {
        setLeftToLoad(prevState => prevState - res.hits.length);
        setCollection([...searchedItemsCollection, ...res.hits]);
      });
  }, [pageNumber]);

  const onClick = data => {
    setPageNumber(prevState => prevState + data);
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
      <ul className={css.gallery}>
        {searchedItemsCollection.map(
          ({ id, webformatURL, tags, largeImageURL }) => {
            return (
              <ImageGalleryItem
                key={id.toString()}
                src={webformatURL}
                alt={tags}
                modalImage={largeImageURL}
              />
            );
          }
        )}
      </ul>
      {!leftToLoad <= 0 && <Button onClick={onClick} />}
    </div>
  );
};

ImageGallery.propTypes = {
  searchedItem: PropTypes.string.isRequired,
};
