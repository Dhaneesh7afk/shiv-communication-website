export type OrderStatus =
  | "CREATED"
  | "PAID"
  | "PACKED"
  | "READY"
  | "DELIVERED"
  | "CANCELLED"
  | "FAILED"

const transitions: Record<OrderStatus, OrderStatus[]> = {
  CREATED: ["PAID", "CANCELLED", "FAILED"],
  PAID: ["PACKED", "CANCELLED", "FAILED"],
  PACKED: ["READY", "CANCELLED"],
  READY: ["DELIVERED", "CANCELLED"],
  DELIVERED: [],
  CANCELLED: [],
  FAILED: [],
}

export function canTransition(from: OrderStatus, to: OrderStatus) {
  return transitions[from]?.includes(to)
}

export function getNextStatuses(current: OrderStatus) {
  return transitions[current] || []
}
