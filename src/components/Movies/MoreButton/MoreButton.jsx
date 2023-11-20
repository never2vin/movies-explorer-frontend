import './MoreButton.css';

function MoreButton({ onClick }) {
  return (
    <div className="more">
      <button
        type="button"
        className={'page__button more__button'}
        onClick={onClick}
      >
        Ещё
      </button>
    </div>
  );
}

export default MoreButton;
