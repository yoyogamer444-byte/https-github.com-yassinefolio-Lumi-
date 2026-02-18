
export interface Message {
  role: 'user' | 'model';
  text: string;
}

export interface ManualItem {
  id: string;
  title: string;
  category: string;
  description: string;
  icon: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  price: string;
  icon: string;
}

export interface CheckoutTask {
  id: string;
  label: string;
  completed: boolean;
}
