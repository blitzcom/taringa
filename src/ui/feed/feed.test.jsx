import renderer from 'react-test-renderer';

describe('ui/feed', () => {
  def('useQuery', () => require('react-query').useQuery);
  def('isFetching', () => false);
  def('isIdle', () => false);
  def('isError', () => false);
  def('data', () => ({ items: [{ id: 'a1', summary: { excerpt: 'a1' } }] }));
  def('extra', () => ({}));

  def('result', () => ({
    ...$extra,
    isFetching: $isFetching,
    isIdle: $isIdle,
    isError: $isError,
    data: $data,
  }));

  def('tree', () => {
    $useQuery.__setMockResult($result);
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
    expect($useQuery.__mockKey).toHaveBeenCalledWith('home-feed');
  });

  it('calls fetched', async () => {
    fetchMock.mockResponse(JSON.stringify({ foo: 'bar' }));
    const response = await $useQuery.__fetcher();
    expect(response).toEqual({ foo: 'bar' });
    expect(fetchMock).toHaveBeenCalledWith(
      'https://api-user.taringa.net/feed/list/globalHome?count=20&filter=article&sort=created-desc&page=0&globalSafe=true&nsfw=false&withTips=true',
    );
  });

  context('when isFetching data', () => {
    def('isFetching', () => true);

    it('renders loader', () => {
      expect($subject).toMatchSnapshot();
    });
  });

  context('when isIdle', () => {
    def('isIdle', () => true);

    it('renders loader', () => {
      expect($subject).toMatchSnapshot();
    });
  });

  context('when isError', () => {
    def('isError', () => true);
    def('refetch', () => jest.fn());
    def('extra', () => ({ refetch: $refetch }));

    it('renders error and try again button', () => {
      expect($subject).toMatchSnapshot();
    });

    it('allows to call refetch', () => {
      $tree.root.findByType('button').props.onClick();
      expect($refetch).toHaveBeenCalled();
    });
  });
});
