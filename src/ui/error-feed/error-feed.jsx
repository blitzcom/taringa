import style from './error-feed.module.scss';

function ErrorFeed(props) {
  const { onRetry } = props;

  return (
    <div className={style.wrapper}>
      <h2 className={style.title}>We have a little problem</h2>

      <p className={style.description}>
        Can&apos;t fetch feed. Please make sure you are connected to the internet.
      </p>

      <button className={style.button} onClick={onRetry}>
        Try again
      </button>
    </div>
  );
}

export default ErrorFeed;
