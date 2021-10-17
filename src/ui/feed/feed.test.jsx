import renderer from 'react-test-renderer';

describe('ui/feed', () => {
  def('useInfiniteQuery', () => require('react-query').useInfiniteQuery);
  def('isFetching', () => false);
  def('status', () => 'fetched');
  def('isFetchingNextPage', () => false);
  def('isRefetchError', () => false);
  def('hasNextPage', () => true);
  def('data', () => ({ pages: [{ items: [{ id: 'a1', summary: { excerpt: 'a1' } }] }] }));
  def('extra', () => ({}));

  def('result', () => ({
    ...$extra,
    data: $data,
    hasNextPage: $hasNextPage,
    isFetching: $isFetching,
    isFetchingNextPage: $isFetchingNextPage,
    isRefetchError: $isRefetchError,
    status: $status,
  }));

  def('tree', () => {
    $useInfiniteQuery.__setMockResult($result);
    const Feed = require('./feed').default;
    return renderer.create(<Feed />);
  });

  def('subject', () => {
    return $tree.toJSON();
  });

  it('renders items', () => {
    expect($subject).toMatchSnapshot();
  });

  it('gets called with home-feed key', () => {
    expect($useInfiniteQuery.__mockKey).toHaveBeenCalledWith('home-feed');
  });

  it('passes options', () => {
    expect($useInfiniteQuery.__mockOptions).toHaveBeenCalledTimes(1);
    const options = $useInfiniteQuery.__mockOptions.mock.calls[0][0];

    expect(options.getNextPageParam).toBeDefined();
    expect(options.getNextPageParam({ count: 0 })).toBeUndefined();
    expect(options.getNextPageParam({ count: 1 })).toBeUndefined();
    expect(options.getNextPageParam({ after: '' })).toBeUndefined();
    expect(options.getNextPageParam({ before: '' })).toBeUndefined();
    expect(options.getNextPageParam({ page: 0 })).toBe(1);
  });

  it('calls fetched', async () => {
    fetchMock.mockResponse(JSON.stringify({ foo: 'bar' }));
    const response = await $useInfiniteQuery.__fetcher({ pageParam: 0 });
    expect(response).toEqual({ foo: 'bar' });
    expect(fetchMock).toHaveBeenCalledWith(
      'https://api-user.taringa.net/feed/list/globalHome?count=30&filter=article&sort=created-desc&page=0&globalSafe=true&nsfw=false&withTips=true',
    );
  });

  context('when is fetching data', () => {
    def('status', () => 'loading');

    it('renders loader', () => {
      expect($subject).toMatchSnapshot();
    });
  });

  context('when is idle', () => {
    def('status', () => 'idle');

    it('renders loader', () => {
      expect($subject).toMatchSnapshot();
    });
  });

  context('when is fetching next page', () => {
    def('isFetching', () => true);
    def('isFetchingNextPage', () => true);

    it('renders feed and loader at the end', () => {
      expect($subject).toMatchSnapshot();
    });
  });

  context('when has no more items', () => {
    def('isFetchingNextPage', () => false);
    def('hasNextPage', () => false);

    it('renders end of stories message', () => {
      expect($subject).toMatchSnapshot();
    });
  });

  context('when is error', () => {
    def('status', () => 'error');

    def('refetch', () => jest.fn());
    def('extra', () => ({ refetch: $refetch }));

    it('renders error and try again button', () => {
      expect($subject).toMatchSnapshot();
    });

    it('allows to call refetch', () => {
      $tree.root.findByType('button').props.onClick();
      expect($refetch).toHaveBeenCalled();
    });

    context('when is refetch error', () => {
      def('isRefetchError', () => true);
      def('isFetchingNextPage', () => false);
      def('fetchNextPage', () => jest.fn());
      def('extra', () => ({ fetchNextPage: $fetchNextPage }));

      it('renders feed and error at the bottom', () => {
        expect($subject).toMatchSnapshot();
      });

      it('allows to call refetch next page', () => {
        $tree.root.findByType('button').props.onClick();
        expect($fetchNextPage).toHaveBeenCalled();
      });
    });
  });
});
