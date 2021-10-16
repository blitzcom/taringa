import renderer from 'react-test-renderer';

import Content from './content';

describe('ui/content', () => {
  def('children', () => <p>__CHILDREN__</p>);
  def('subject', () => renderer.create(<Content>{$children}</Content>).toJSON());

  it('renders content', () => {
    expect($subject).toMatchSnapshot();
  });
});
