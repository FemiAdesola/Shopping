export enum Roles {
  ADMIN = "admin",
  CUTOMER = "customer",
}


export enum PaymentStatus {
  PENDING = "Pending",
  CONFIRMED = "Confirmed",
  BEING_COOKED = "Being Cooked",
  READY_FOR_PICKUP = "Ready for Pickup",
  COMPLETED = "Completed",
  CANCELLED = "Cancelled",
}


export enum Categories {
  SHOES = "Shoes",
  BOOK = "Book",
  ELECTRONICS = "Electronics",
  FURNITURE = "Furniture",
  CLOTH = "Cloth",
  VEHICLE = "Vehicle",
  BAG = "Bag",
  OTHERS = "Others",
}

export enum SortTypes {
  PRICE_LOW_HIGH = "Price Low - High",
  PRICE_HIGH_LOW = "Price High - Low",
  NAME_A_Z = "Name A - Z",
  NAME_Z_A = "Name Z - A",
}