import style from './loader-feed.module.scss';

function FeedLoader(props) {
  return (
    <div className={style.loader}>
      {props.items.map((id) => (
        <div key={id} className={style.wrapper}>
          <div className={style.meta}>
            <div className={style.title} />
            <div className={style.subtitle} />
          </div>

          <div className={style.thumbnail} />
        </div>
      ))}
    </div>
  );
}

export default FeedLoader;
