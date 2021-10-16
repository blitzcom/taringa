import style from './content.module.scss';

function Content(props) {
  const { children } = props;

  return <main className={style.content}>{children}</main>;
}

export default Content;
