import { useEffect } from 'react';
import css from './Modal.module.css';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ toggleModal, modalImage, alt }) => {
  useEffect(() => {
    window.addEventListener('keydown', e => {
      if (e.code === 'Escape') {
        toggleModal();
      }
    });
  });

  return createPortal(
    <div className={css.overlay} onClick={toggleModal}>
      <div className={css.modal}>
        <img src={modalImage} alt={alt} width="700" />
      </div>
    </div>,
    modalRoot
  );
};
Modal.propTypes = {
  toggleModal: PropTypes.func.isRequired,
  modalImage: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};
