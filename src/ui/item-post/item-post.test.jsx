import renderer from 'react-test-renderer';

import ItemPost from './item-post';

describe('ui/item-post', () => {
  def('props', () => ({ title: 'foo', summary: { excerpt: 'bar' }, id: 'baz' }));
  def('subject', () => renderer.create(<ItemPost {...$props} />).toJSON());

  it('renders item post', () => {
    expect($subject).toMatchSnapshot();
  });
});
