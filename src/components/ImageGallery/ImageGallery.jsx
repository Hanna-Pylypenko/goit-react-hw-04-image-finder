import css from './ImageGallery.module.css';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

import PropTypes from 'prop-types';
export const ImageGallery = ({ searchedItemsCollection }) => {
  console.log(searchedItemsCollection);
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
    </div>
  );
};

ImageGallery.propTypes = {
  searchedItemsCollection: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    })
  ).isRequired,
};
