
export default class Block {
  constructor(width = 1, height = 1, cleared = false, mine = false, id = 0/*id random maybe*/, neighborBlocks = [], gameEndedCallback) {

    this.width = width;
    this.height = height;
    this.cleared = cleared;
    this.mine = mine;
    this.id = id;
    //todo
    this.checkMate = false;
    this.neighborBlocks = neighborBlocks;
    this.render = this.render.bind(this);
    this.gameEnded = gameEndedCallback.bind(this);
  }

  onClick(event1, event2) {
    console.log(event1, event2);
    if (this.mine) {
      this.gameEnded('lose');
    } else {
      this.cleared = true;
    }
    //need a checker if all cleared
    this.render();
  }

  generateHtml(mine, cleared) {
    return `
      <button class="blockPlayer__container">
        ${mine && cleared ? '&#128163;' : ''}
        ${mine && !cleared ? '?' : ''}
        ${cleared & !mine ? '<span class="blockPlayer__smiley">&#x263a;</span>' : ''}
      </button>
    `
  }

  render() {
    if (this.block) {
      console.log('reset!');
      this.block.innerHTML = this.generateHtml(this.mine, this.cleared);
    }
    const block = document.createElement('section');
    block.addEventListener('click', this.onClick.bind(this));
    block.className = `block block__container blockId${this.id}`;
    block.innerHTML = this.generateHtml(this.mine, this.cleared);

    this.block = block;
    return this.block;
  }
}