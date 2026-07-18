export interface MaterialImage {
  id: string;
  url: string;
  alt: string;
}

export interface MaterialColor {
  id: string;
  name: string;
  hex: string;
}

export interface MaterialSize {
  id: string;
  label: string;
  value: string;
}

export interface MaterialCharacteristic {
  label: string;
  value: string;
}

export interface Material {
  id: string;
  title: string;
  collection: string;
  categoryId: string;
  manufacturerId: string;
  price: number;
  unit: string;
  description: string;
  images: MaterialImage[];
  colors: MaterialColor[];
  sizes: MaterialSize[];
  characteristics: MaterialCharacteristic[];
  countryOfOrigin: string;
  deliveryDays: string;
  isActive: boolean;
  isPopular: boolean;
  createdAt: string;
  seoTitle: string;
  seoDescription: string;
}
