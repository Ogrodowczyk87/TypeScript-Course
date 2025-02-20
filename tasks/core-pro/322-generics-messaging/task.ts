type MessageType = 'orderCreated' | 'orderCancelled';

interface Message {
  type: MessageType;
}

interface Order {
  orderId: string;
  items: { productId: string; quantity: number }[];
}

export interface OrderCreatedMessage extends Message {
  type: 'orderCreated';
  payload: Order;
}

export interface OrderCancelledMessage extends Message {
  type: 'orderCancelled';
  payload: { orderId: string };
}

type Subscriber<T extends Message> = (message: T) => void;

export class MessageBus {
  private subscribers: { [K in MessageType]?: Subscriber<any>[] } = {};

  subscribe<T extends Message>(type: T['type'], subscriber: Subscriber<T>): void {
    if (!this.subscribers[type]) {
      this.subscribers[type] = [];
    }
    this.subscribers[type]!.push(subscriber);
  }

  publish<T extends Message>(message: T): void {
    const subscribers = this.subscribers[message.type];
    if (subscribers) {
      subscribers.forEach(subscriber => subscriber(message));
    }
  }
}

export class InventoryStockTracker {
  private orders: Record<string, Order> = {};

  constructor(
    private bus: MessageBus,
    private stock: Record<string, number>,
  ) {
    this.subscribeToMessages();
  }

  private subscribeToMessages(): void {
    this.bus.subscribe<OrderCreatedMessage>('orderCreated', this.handleOrderCreated.bind(this));
    this.bus.subscribe<OrderCancelledMessage>('orderCancelled', this.handleOrderCancelled.bind(this));
  }

  private handleOrderCreated(message: OrderCreatedMessage): void {
    this.orders[message.payload.orderId] = message.payload;
    message.payload.items.forEach(item => {
      this.stock[item.productId] = (this.stock[item.productId] || 0) - item.quantity;
    });
  }

  private handleOrderCancelled(message: OrderCancelledMessage): void {
    const order = this.orders[message.payload.orderId];
    if (order) {
      order.items.forEach(item => {
        this.stock[item.productId] = (this.stock[item.productId] || 0) + item.quantity;
      });
      delete this.orders[message.payload.orderId];
    }
  }

  getStock(productId: string): number {
    return this.stock[productId] || 0;
  }
}
