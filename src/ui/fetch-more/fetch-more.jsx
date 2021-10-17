import style from './fetch-more.module.scss';

function FetchMore(props) {
  return (
    <button {...props} className={style.wrapper}>
      Fetch more
    </button>
  );
}

export default FetchMore;
