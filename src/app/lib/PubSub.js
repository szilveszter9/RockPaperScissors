let subscribers = {};

export default class PubSub {
  async publish(...args) {
    return await amap(
      (subscribers[args[0]] || [])
        .map(async callback => await callback(...args))
    );
  }

  subscribe(event, callback) {
    subscribers[event] = subscribers[event] || [];
    subscribers[event].push(callback);
  }
}
