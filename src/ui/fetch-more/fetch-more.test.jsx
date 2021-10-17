import renderer from 'react-test-renderer';

import FetchMore from './fetch-more';

describe('ui/fetch-more', () => {
  def('onClick', () => jest.fn());
  def('tree', () => renderer.create(<FetchMore onClick={$onClick} />));
  def('subject', () => $tree.toJSON());

  it('renders fetch more', () => {
    expect($subject).toMatchSnapshot();
  });

  it('calls on click', () => {
    $tree.root.findByType('button').props.onClick();
    expect($onClick).toHaveBeenCalled();
  });
});
