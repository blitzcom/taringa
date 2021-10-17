import style from './message.module.scss';

function Message(props) {
  const { children } = props;

  return <div className={style.wrapper}>{children}</div>;
}

export default Message;
