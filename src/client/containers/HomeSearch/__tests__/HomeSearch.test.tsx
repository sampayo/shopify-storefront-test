import renderer from 'react-test-renderer';
import { shallow, mount } from 'enzyme';
import sinon, { SinonSandbox } from 'sinon';
import HomeSearch from '../HomeSearch';

describe('Containers', () => {
  describe('HomeSearch', () => {
    let sandbox: SinonSandbox;
    beforeEach(() => {
      sandbox = sinon.createSandbox();
    });

    afterEach(() => {
      sandbox?.restore();
    });

    test('render home search(snapshot)', () => {
      const tree = renderer.create(<HomeSearch />).toJSON();
      expect(tree).toMatchSnapshot();
    });

    test('submit without changes', () => {
      const submitSpy = sinon.spy();
      const wrapper = mount(<HomeSearch onSubmit={submitSpy} />);

      const forms = wrapper.find('form');
      expect(forms.length).toEqual(1);
      const form = forms.at(0);

      form.simulate('submit');

      expect(submitSpy.calledOnce).toBeTruthy();
      const call = submitSpy.getCall(0);
      expect(call.args[0]).toEqual({ search: undefined, sort: 'RELEVANCE' });
    });

    test('submit after changing the search values', async () => {
      sandbox.stub(window, 'setTimeout').callsFake((c: any) => c());

      const submitSpy = sandbox.spy();
      const wrapper = shallow(<HomeSearch onSubmit={submitSpy} />);

      const forms = wrapper.find('form');
      expect(forms.length).toEqual(1);
      const searchInputs = wrapper.find('input[type="input"]');
      expect(searchInputs.length).toEqual(1);

      const searchInput = searchInputs.at(0);

      searchInput.simulate('change', { target: { value: 'abcdefg' } });

      expect(submitSpy.calledOnce).toBeTruthy();
      const call = submitSpy.getCall(0);
      expect(call.args[0]).toEqual({ search: 'abcdefg' });
    });
  });
});
