import mitt, { Emitter, Handler } from 'mitt';
import { Planet } from '@/types';

type CustomEventTypes = {
  planetSelected: Planet; // Define your specific event types here
  // Add more event types as needed
};

// Create a strongly typed event bus
const emitter: Emitter<CustomEventTypes> = mitt<CustomEventTypes>();

export const eventBus = {
  on<T extends keyof CustomEventTypes>(type: T, handler: Handler<CustomEventTypes[T]>) {
    return emitter.on(type, handler);
  },
  off<T extends keyof CustomEventTypes>(type: T, handler: Handler<CustomEventTypes[T]>) {
    return emitter.off(type, handler);
  },
  emit<T extends keyof CustomEventTypes>(type: T, payload: CustomEventTypes[T]) {
    return emitter.emit(type, payload);
  },
};
