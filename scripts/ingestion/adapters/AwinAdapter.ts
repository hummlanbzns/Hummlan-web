import { AffiliateAdapter, AffiliateProduct } from './BaseAdapter';

export class AwinAdapter extends AffiliateAdapter {
  vendorName = 'Awin';

  constructor(private apiKey: string, private publisherId: string) {
    super();
  }

  async fetchProducts(): Promise<AffiliateProduct[]> {
    console.log('AwinAdapter: Fetching products from Awin API (not implemented)...');
    // TODO: Implement actual Awin API call
    return [];
  }
}
