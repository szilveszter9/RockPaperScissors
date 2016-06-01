import Games from './Games.js';

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

  setName(name) {
    this.name = name;
  }

  //getName() {
  //  return this.name;
  //}

  setGame(name) {
    let game =Games.find(game => game.name === name);
    this.setName(name);
    this.setCharacters(game.characters);
    this.setRules(game.rules);
  }

  async askPlayersToChoose() {
    let choices = await amap(
      this.players.map(
        async player => await player.choose(Object.assign([], this.characters))
      )
    );
    return choices;
  }

  async getResults(choices) {
    if(choices[0] === choices[1])
      return [0, 'YouChoseTheSameNoOneWinsPlayAgain.png'];
    let choice1 = choices[0].replace(/\..*/, '');
    let choice2 = choices[1].replace(/\..*/, '');

    let regex1stWinsStart = new RegExp('^' + choice1 + '.*');
    let regex1stWinsEnd = new RegExp('.*' + choice2 + '\\.\\w{3,4}$');

    let firstWins = this.rules.find(
      rule => rule.match(regex1stWinsStart) && rule.match(regex1stWinsEnd)
    );

    if(firstWins)
      return [this.players[0], firstWins];
    else {
      let regex2ndWinsStart = new RegExp('^' + choice2 + '.*');
      let regex2ndWinsEnd = new RegExp('.*' + choice1 + '\\.\\w{3,4}$');

      let secondWins = this.rules.find(
        rule => rule.match(regex2ndWinsStart) && rule.match(regex2ndWinsEnd)
      );

      if(secondWins)
        return [this.players[1], secondWins];
      else
        return [-1, 'CouldNotDecideWhoWinsGameMightBeIncomplete.png'];
    }
  }
}
