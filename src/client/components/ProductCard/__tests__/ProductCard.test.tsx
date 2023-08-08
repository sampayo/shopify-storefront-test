import renderer from 'react-test-renderer';
import ProductCard from '../ProductCard';

describe('Components', () => {
  describe('ProductCard', () => {
    test('render product card (snapshot)', () => {
      const tree = renderer
        .create(
          <ProductCard
            product={{
              id: '1243',
              handle: 'abc',
              priceRange: {
                minVariantPrice: { amount: '123', currencyCode: 'GBP' },
                maxVariantPrice: { amount: '124', currencyCode: 'GBP' },
              },
              productType: 'product',
              title: 'do proident sunt do id sint nostrud',
            }}
          />,
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
