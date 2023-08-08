import Sinon, { SinonSandbox } from 'sinon';
import { objectKeys } from '@/common/utils/objectHelper';
import { environments } from '..';

describe('Common', () => {
  describe('configuration', () => {
    let sandbox: SinonSandbox;
    beforeEach(() => {
      sandbox = Sinon.createSandbox();
    });

    afterEach(() => {
      sandbox?.restore();
    });

    test('environments', () => {
      const copyEnv = { ...process.env };
      const stubEnvironments: any = {
        ...copyEnv,
        SHOPIFY_API_KEY: 'SHOPIFY_API_KEY',
        SHOPIFY_DOMAIN: 'SHOPIFY_DOMAIN',
        SHOPIFY_SECRET_API_KEY: 'SHOPIFY_SECRET_API_KEY',
        STOREFRONT_API_KEY: 'STOREFRONT_API_KEY',
      };

      sandbox.stub(process, 'env').get(() => stubEnvironments);
      const values = environments();

      objectKeys(values).forEach((x) => {
        expect(values[x]).toEqual(stubEnvironments[x]);
      });
    });
  });
});
