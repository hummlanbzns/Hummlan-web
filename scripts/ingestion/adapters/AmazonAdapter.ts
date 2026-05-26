import { AffiliateAdapter, AffiliateProduct } from './BaseAdapter';

export class AmazonAdapter extends AffiliateAdapter {
  vendorName = 'Amazon';

  constructor(private credentials: { accessKey: string; secretKey: string; tag: string }) {
    super();
  }

  async fetchProducts(): Promise<AffiliateProduct[]> {
    console.log('AmazonAdapter: Fetching products from PA-API (not implemented)...');
    // TODO: Implement actual PA-API call
    return [];
  }
}
