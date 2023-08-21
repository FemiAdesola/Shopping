import { PaymentStatus } from "../../Utils/StaticDetails";


const statusColor = (status: PaymentStatus) => {
  return status === PaymentStatus.CONFIRMED
    ? "primary"
    : status === PaymentStatus.PENDING
    ? "secondary"
    : status === PaymentStatus.CANCELLED
    ? "danger"
    : status === PaymentStatus.COMPLETED
    ? "success"
    : status === PaymentStatus.BEING_COOKED
    ? "info"
    : status === PaymentStatus.READY_FOR_PICKUP && "warning";
};

export default statusColor;