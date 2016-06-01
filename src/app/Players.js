export class Player {
  async choose(characters) {
    return characters[0];
  }
}

export class Computer {
  async choose(characters) {
    return characters[1];
  }
}
