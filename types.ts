
export type UserRole = 'user' | 'admin';

export interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Product {
  id: string;
  name: string;
  series: string;
  category: 'Figures' | 'Apparel' | 'Accessories' | 'Collectibles' | 'Collection' | 'Figure';
  price: number;
  originalPrice?: number;
  description: string;
  image: string;
  image2?: string;
  images?: string[];
  videoUrl?: string;
  videoMoments?: { label: string; time: number }[];
  isFeatured?: boolean;
  stock: number;
  features?: string[];
  specs?: {
    material?: string;
    dimensions?: string;
    weight?: string;
    origin?: string;
    rarity?: 'Common' | 'Rare' | 'Epic' | 'Zenith';
  };
  reviews?: Review[];
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  total: number;
  status: 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  paymentMethod: string;
  trackingNumber: string;
}

export interface UserProfile {
  name: string;
  email: string;
  avatar: string;
  joinDate: string;
  loyaltyPoints: number;
  role: UserRole;
}

export type Category = 'Figures' | 'Apparel' | 'Accessories' | 'Collectibles' | 'All';

export interface AppState {
  cart: CartItem[];
  wishlist: string[];
}
