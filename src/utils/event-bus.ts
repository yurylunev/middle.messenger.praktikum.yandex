class EventBus {
    private readonly listeners: any;
    constructor() {
      this.listeners = {};
    }

    on(event: string, callback: any) {
      if (!this.listeners[event]) {
        this.listeners[event] = [];
      }

      this.listeners[event].push(callback);
    }

    off(event: string, callback: object) {
      if (!this.listeners[event]) {
        throw new Error(`Нет события: ${event}`);
      }

      this.listeners[event] = this.listeners[event].filter(
          (listener: object) => listener !== callback,
      );
    }

    emit(event: string, ...args: (object | undefined)[]) {
      if (!this.listeners[event]) {
        return;
      }

      this.listeners[event].forEach(function(listener: any) {
        listener(...args);
      });
    }
}

export default EventBus;
