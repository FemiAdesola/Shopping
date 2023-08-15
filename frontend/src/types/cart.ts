import CartItemsType from "./cartItems";

export default interface CartType {
  userId: string;
  cartItems: CartItemsType[];
  stripePaymentIntentId: any;
  clientSecret: any;
  cartTotal: number;
  id: number;
}
