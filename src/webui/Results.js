import config from '../config.js';

let cdn = config.default.web.cdn;

export default class Results {
  async render(results) {
    let winner = results.winner.getName();
    let appliedRuleText = results.rule
      .replace(/\..*/, '')
      .replace(/_/g, ' ')
      .replace(/([a-z])([A-Z])/g, '$1 $2');

    return `<div class="Winner"><h2>${winner} wins!</h2></div>
      <div class="AppliedRuleImage">
        <img src="${cdn}/${results.rule}"
          alt="${appliedRuleText}"
          onerror="this.style.display='none'">
      </div>
      <div class="AppliedRuleText"><h2>${appliedRuleText}</h2></div>
      <div class="ResultsMenu">
        <button onclick="window.pubSub.publish('goToMenu');">
          <img src="${cdn}/Back.png" alt="Go to Menu">
        </button><button onclick="window.pubSub.publish('playAgain');">
          <img src="${cdn}/Next.png" alt="Play again">
        </button>
      </div>
      `;
  }
}
