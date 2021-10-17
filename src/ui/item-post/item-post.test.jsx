import renderer from 'react-test-renderer';

import ItemPost from './item-post';

describe('ui/item-post', () => {
  def('thumbnail', () => 'gs://kn3/30440004e3257a156d1291863ff21ef4.jpg');
  def('upvotes', () => 99);
  def('downvotes', () => 49);

  def('props', () => ({
    id: 'baz',
    summary: { excerpt: 'bar' },
    thumbnail: $thumbnail,
    title: 'foo',
    upvotes: $upvotes,
    downvotes: $downvotes,
  }));

  def('subject', () => renderer.create(<ItemPost {...$props} />).toJSON());

  it('renders item post', () => {
    expect($subject).toMatchSnapshot();
  });

  context('when thumbnail is empty', () => {
    def('thumbnail', () => '');

    it('renders default thumbnail', () => {
      expect($subject).toMatchSnapshot();
    });
  });

  context('when upvotes is zero', () => {
    def('upvotes', () => 0);

    it('renders only with upvotes icon', () => {
      expect($subject).toMatchSnapshot();
    });
  });

  context('when downvotes is zero', () => {
    def('downvotes', () => 0);

    it('renders only with downvotes icon', () => {
      expect($subject).toMatchSnapshot();
    });
  });
});
