import './MoreButton.css';

function MoreButton({ handleMoreClick }) {
  return (
    <section className="more">
      <button
        type="more__button"
        className={'page__button more__button'}
        onClick={handleMoreClick}
      >
        Ещё
      </button>
    </section>
  );
}

export default MoreButton;
