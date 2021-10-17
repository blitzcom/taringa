import renderer from 'react-test-renderer';

import ErrorFeed from './error-feed';

describe('ui/error-feed', () => {
  def('onRetry', () => jest.fn());
  def('tree', () => renderer.create(<ErrorFeed onRetry={$onRetry} />));
  def('subject', () => $tree.toJSON());

  it('renders error feed', () => {
    expect($subject).toMatchSnapshot();
  });

  it('calls on retry', () => {
    $tree.root.findByType('button').props.onClick();
    expect($onRetry).toHaveBeenCalled();
  });
});
