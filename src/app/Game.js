import { NoOne } from './Players.js';
import config from '../config.js';

let gameConfig = config.default.game;

export default class Game {
  constructor() {
    this.players = [];
    this.characters = [];
    this.rules = [];
  }

  addPlayer(player) {
    this.players.push(player);
  }

  setCharacters(characters) {
    Object.assign(this.characters, characters);
  }

  setRules(rules) {
    Object.assign(this.rules, rules);
  }

  setGame(game) {
    this.setCharacters(game.characters);
    this.setRules(game.rules);
  }

  async askPlayersToChoose() {
    let choices = await amap(
      this.players.map(
        async player => await player.choose(Object.assign([], this.characters))
      )
    );
    return choices.map(arr => arr[1]).map(Number);
  }

  async getResults(choiceIndices) {
    if(choiceIndices[0] === choiceIndices[1]){
      return { winner: new NoOne(), rule: gameConfig.rules.sameFigureSelected };
    }
    let character1;
    let character2;
    try {
      character1 = this.characters[choiceIndices[0]].name;
      character2 = this.characters[choiceIndices[1]].name;
    } catch(e) {
      return { winner: new NoOne(), rule: gameConfig.rules.couldNotDecide };
    }

    let firstWins = isWinner(this.rules, character1, character2);
    if(firstWins) {
      return { winner: this.players[0], rule: firstWins.image };
    }
    else {
      let secondWins = isWinner(this.rules, character2, character1);

      if(secondWins) {
        return { winner: this.players[1], rule: secondWins.image };
      }
      else {
        return { winner: NoOne, rule: gameConfig.rules.couldNotDecide };
      }
    }

    function isWinner(rules, first, second) {
      return rules.find(
        rule => rule.prior === first && rule.after === second
      );
    }
  }
}
