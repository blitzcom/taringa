import { useQuery } from 'react-query';

import ItemPost from 'ui/item-post';

import style from './feed.module.scss';

function Feed() {
  const feed = useQuery('home-feed', () =>
    fetch(
      'https://api-user.taringa.net/feed/list/globalHome?count=20&filter=article&sort=created-desc&page=0&globalSafe=true&nsfw=false&withTips=true',
    ).then((response) => response.json()),
  );

  if (feed.isFetching || feed.isIdle) {
    return <p>Loading...</p>;
  }

  if (feed.isError) {
    return (
      <p>
        Error <button onClick={feed.refetch}>try again</button>
      </p>
    );
  }

  return (
    <div className={style.wrapper}>
      {feed.data.items.map((item) => (
        <ItemPost {...item} key={item.id} />
      ))}
    </div>
  );
}

export default Feed;
