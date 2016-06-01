let messageQueue = [];
let subscribers = {};

export default class PubSub {
  async publish(...args) {
    messageQueue.push(args);
    await amap(
      (subscribers[args[0]] || []).map(async callback => await callback(...args))
    );
    return;
  }

  subscribe(event, callback) {
    subscribers[event] = subscribers[event] || [];
    subscribers[event].push(callback);
  }
}
