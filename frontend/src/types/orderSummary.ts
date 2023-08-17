import CartType from "./cart";

export interface orderSummaryType {
  data: {
    id?: number;
    cartItems?: CartType[];
    cartTotal?: number;
    userId?: string;
  };
  userInput: {
    name: string;
    email: string;
    phoneNumber: string;
  };
}
