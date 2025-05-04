type ToastType = 'success' | 'error' | 'info' | 'warning';

type ToastPayload = {
  type?: ToastType;
  title: string;
  description?: string;
};

type Subscriber = (payload: ToastPayload) => void;

class ToastObserver {
  private subscribers = new Set<Subscriber>();

  subscribe(fn: Subscriber) {
    this.subscribers.add(fn);
  }

  unsubscribe(fn: Subscriber) {
    this.subscribers.delete(fn);
  }

  notify(payload: ToastPayload) {
    for (const sub of this.subscribers) {
      sub(payload);
    }
  }

  // shortcut
  emit(payload: ToastPayload) {
    this.notify(payload);
  }
}

export const toastObserver = new ToastObserver();
