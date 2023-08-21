import { PaymentStatus } from "../Utils/StaticDetails";
import CartType from "./cart";

export interface orderSummaryType {
  data: {
    id?: number;
    cartItems?: CartType[];
    cartTotal?: number;
    userId?: string;
    stripePaymentIntentId?: string;
    status?: PaymentStatus;
  };
  userInput: {
    name: string;
    email: string;
    phoneNumber: string;
  };
}
