export interface OrderType {
  pickupName: string;
  pickupPhoneNumber: string;
  pickupEmail: string;
  appUserId: string;
  orderTotal: number;
  stripePaymentIntentID: string;
  status: string;
  totalItems: number;
  orderDetailsDTO: OrderDetailsDTO[];
}

export interface OrderDetailsDTO {
  productId: number;
  quantity: number;
  itemName: string;
  price: number;
}
