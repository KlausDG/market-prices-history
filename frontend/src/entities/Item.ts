export default class Item {
  done: boolean;
  constructor(readonly id: string | null, readonly description: string, done: boolean = false ) {
    if (id === null) {
      this.id = Math.random().toString(36).slice(2, 7)
    }
    this.done = done
  }
}