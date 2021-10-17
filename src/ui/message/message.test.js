import renderer from 'react-test-renderer';

import Message from './message';

describe('ui/message', () => {
  def('children', () => 'My message');
  def('subject', () => renderer.create(<Message>{$children}</Message>).toJSON());

  it('renders message with children as message', () => {
    expect($subject).toMatchSnapshot();
  });
});
