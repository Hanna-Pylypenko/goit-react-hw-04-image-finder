import css from './ImageGalleryItem.module.css';
import { Modal } from 'components/Modal/Modal';
import { useState } from 'react';
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ src, alt, modalImage }) => {
  const [modalOpen, setModalState] = useState('closed');

  const toggleModal = () => {
    if (modalOpen === 'closed') {
      setModalState('opened');
    }
    if (modalOpen === 'opened') {
      setModalState('closed');
    }
  };

  return (
    <li className={css.galleryItem} onClick={toggleModal}>
      <img src={src} alt={alt} />
      {modalOpen === 'opened' && (
        <Modal toggleModal={toggleModal} modalImage={modalImage} alt={alt} />
      )}
    </li>
  );
};

ImageGalleryItem.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  modalImage: PropTypes.string.isRequired,
};
