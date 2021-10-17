import ArrowDownBoldCircleOutlineIcon from 'mdi-react/ArrowDownBoldCircleOutlineIcon';
import ArrowUpBoldCircleOutlineIcon from 'mdi-react/ArrowUpBoldCircleOutlineIcon';
import Image from 'next/image';

import knn from '@/helpers/image/knn';

import style from './item-post.module.scss';

function ItemPost(props) {
  const { title, summary, id, thumbnail, upvotes, downvotes } = props;

  return (
    <article key={id} className={style.article}>
      <div>
        <h2 className={style.title}>{title}</h2>
        <p className={style.excerpt}>{summary.excerpt}</p>

        <div className={style.meta}>
          <span className={`${style.vote} ${style.upvotes}`}>
            <ArrowUpBoldCircleOutlineIcon size={22} />
            {upvotes > 0 && <span className={style.count}>{upvotes}</span>}
          </span>

          <span className={`${style.vote} ${style.downvotes}`}>
            <ArrowDownBoldCircleOutlineIcon size={22} />

            {downvotes > 0 && <span className={style.count}>{downvotes}</span>}
          </span>
        </div>
      </div>

      <div className={style.thumbnail}>
        <Image
          alt={title}
          className={style.src}
          height={120}
          src={knn.formatThumbnail(thumbnail)}
          width={120}
          objectFit="cover"
          unoptimized
        />
      </div>
    </article>
  );
}

export default ItemPost;
