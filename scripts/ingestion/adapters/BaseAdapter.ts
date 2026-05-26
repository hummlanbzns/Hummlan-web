export interface AffiliateProduct {
  sku: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  currency: string;
  url: string;
  imageUrl: string;
  description: string;
}

export abstract class AffiliateAdapter {
  abstract vendorName: string;
  abstract fetchProducts(): Promise<AffiliateProduct[]>;
}
