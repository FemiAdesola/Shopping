import ProductType from "./product";

export default interface CartItemsType {
  productId?: number;
  product?: ProductType;
  quantity?: number;
  id?: number;
}
