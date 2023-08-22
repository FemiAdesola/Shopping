import { PaymentStatus } from "../Utils/StaticDetails";
import ProductType from "./product";

export interface OrderType {
  orderId?: number;
  pickupName?: string;
  pickupPhoneNumber?: string;
  pickupEmail?: string;
  appUserId?: string;
  user?: any;
  orderTotal?: number;
  orderDate?: Date;
  stripePaymentIntentID?: string;
  status?: PaymentStatus;
  totalItems?: number;
  orderDetails?: OrderDetailType[];
}

export interface OrderDetailsDTO {
  productId: number;
  quantity: number;
  itemName: string;
  price: number;
}

export default interface OrderDetailType {
  orderDetailId?: number;
  orderHeaderId?: number;
  menuItemId?: number;
  menuItem?: ProductType;
  quantity?: number;
  itemName?: string;
  price?: number;
}

export default interface OrderListType {
  isLoading: boolean;
  orderData: OrderType[];
}