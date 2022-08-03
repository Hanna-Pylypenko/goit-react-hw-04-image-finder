import css from './Button.module.css';
import PropTypes from 'prop-types';
export const Button = ({ onClick }) => {
  const onBtnClick = () => {
    onClick(1);
  };

  return (
    <button type="button" className={css.button} onClick={onBtnClick}>
      Load more
    </button>
  );
};
Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};
