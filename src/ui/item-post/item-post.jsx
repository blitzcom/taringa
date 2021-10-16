function ItemPost(props) {
  const { title, summary, id } = props;

  return (
    <article key={id}>
      <h2>{title}</h2>
      <p>{summary.excerpt}</p>
    </article>
  );
}

export default ItemPost;
