import renderer from 'react-test-renderer';

import LoaderFeed from './loader-feed';

describe('ui/loader-feed', () => {
  def('items', () => [1, 2]);
  def('subject', () => renderer.create(<LoaderFeed items={$items} />).toJSON());

  it('renders loader', () => {
    expect($subject).toMatchSnapshot();
  });
});
