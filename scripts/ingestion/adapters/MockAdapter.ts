import { AffiliateAdapter, AffiliateProduct } from './BaseAdapter';

export class MockAdapter extends AffiliateAdapter {
  constructor(public vendorName: string, private baseProducts: Partial<AffiliateProduct>[]) {
    super();
  }

  async fetchProducts(): Promise<AffiliateProduct[]> {
    return this.baseProducts.map(p => ({
      sku: p.sku || `MOCK-${Math.random().toString(36).substring(7)}`,
      name: p.name || 'Mock Product',
      brand: p.brand || 'Mock Brand',
      category: p.category || 'Mock Category',
      price: this.generateRandomPrice(p.price || 50),
      currency: p.currency || 'USD',
      url: p.url || `https://mock.com/${p.sku}`,
      imageUrl: p.imageUrl || 'https://images.mock.com/placeholder.jpg',
      description: p.description || 'Mock description',
    }));
  }

  private generateRandomPrice(basePrice: number): number {
    // Generate a price between 80% and 120% of base price
    const variation = (Math.random() * 0.4) + 0.8;
    return parseFloat((basePrice * variation).toFixed(2));
  }
}
