import { Fragment } from 'react';
import { useInfiniteQuery } from 'react-query';

import getLoaderItems from '@/helpers/loader-items';

import ErrorFeed from '@/ui/error-feed';
import FetchMore from '@/ui/fetch-more';
import ItemPost from '@/ui/item-post';
import LoaderFeed from '@/ui/loader-feed';
import Message from '@/ui/message';

import style from './feed.module.scss';

const PAGE_SIZE = 30;
const LOADER_ITEMS_OF_INTIAL = getLoaderItems(PAGE_SIZE);
const LOADER_ITEMS_OF_REFETCH = getLoaderItems(Math.ceil((PAGE_SIZE * 20) / 100));

function Feed() {
  const fetchFeed = ({ pageParam = 0 }) =>
    fetch(
      `https://api-user.taringa.net/feed/list/globalHome?count=${PAGE_SIZE}&filter=article&sort=created-desc&page=${pageParam}&globalSafe=true&nsfw=false&withTips=true`,
    ).then((response) => response.json());

  const feed = useInfiniteQuery('home-feed', fetchFeed, {
    getNextPageParam: (lastPage) => {
      return lastPage.count === 0 ||
        lastPage.count < PAGE_SIZE ||
        lastPage.after === '' ||
        lastPage.before === ''
        ? undefined
        : lastPage.page + 1;
    },
  });

  if (feed.status === 'loading' || feed.status === 'idle') {
    return <LoaderFeed items={LOADER_ITEMS_OF_INTIAL} />;
  }

  if (feed.status === 'error' && !feed.isRefetchError) {
    return <ErrorFeed onRetry={feed.refetch} />;
  }

  return (
    <div className={style.wrapper}>
      {feed.data.pages.map((group, i) => (
        <Fragment key={i}>
          {group.items.map((item) => (
            <ItemPost {...item} key={item.id} />
          ))}
        </Fragment>
      ))}

      {feed.isFetching && <LoaderFeed items={LOADER_ITEMS_OF_REFETCH} />}

      {!feed.isFetchingNextPage && feed.hasNextPage && !feed.isRefetchError && (
        <div className={style.message}>
          <FetchMore onClick={feed.fetchNextPage} />
        </div>
      )}

      {!feed.isFetchingNextPage && feed.isRefetchError && (
        <div className={style.message}>
          <ErrorFeed onRetry={feed.fetchNextPage} />
        </div>
      )}

      {!feed.isFetchingNextPage && !feed.hasNextPage && (
        <div className={style.message}>
          <Message>End of stories</Message>
        </div>
      )}
    </div>
  );
}

export default Feed;
