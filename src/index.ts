import { idxes, state } from "./constants";
import { indLvl, indScore, wrapper } from "./elements";


function generateBoard() {
  let idx = state.levels.findIndex(item => item.id === state.currentLevel)

    for (let i = state.levels[idx].board.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [state.levels[idx].board[i], state.levels[idx].board[j]] = [state.levels[idx].board[j], state.levels[idx].board[i]];
    }
    return state.levels[idx].board;
}

function renderGame() {
  let idx = state.levels.findIndex(item => item.id === state.currentLevel)

  let res = state.levels[idx].board.map((item,idx)=> {
    if(item) {
      
      return `
        <div class="w-[70px] h-[70px] cursor-pointer bg-[#B9B9B9] p-[2px] border p-3">
          <button id='cell' onclick="cellAction(${idx})" ${idxes.includes(idx) ? "disabled" : ''} class="w-full h-full block bg-[#184853]"></button>
        </div>
      `
    }   
    else {
      return `
          <button onclick="cellAction(${idx})" class="w-[70px] h-[70px] cursor-pointer bg-[#B9B9B9] border p-3"></button>
      `
    }
  }).join('')

  wrapper.innerHTML = res.toString()
  indLvl.innerHTML = state.currentLevel.toString()
  indScore.innerHTML = state.score.toString()

}


function cellAction(idx: number) {
  idxes.push(idx)
  calculateScore(idx)
  checkWin()

}

function calculateScore(idx: number) {
  let levelidx = state.levels.findIndex(item => item.id === state.currentLevel)

  let cell = state.levels[levelidx].board[idx]


  if(cell) {
    state.score += 100
    state.correctAnswers++
  } 
  else {
    state.currentLevel = 1
    state.score = 0
    generateBoard()
    renderGame()
  } 
    
  indScore.innerHTML = state.score.toString()
}



function checkWin() {
  let levelidx = state.levels.findIndex(item => item.id === state.currentLevel)
  let filtredBoard = state.levels[levelidx].board.filter(item => item)
  if(filtredBoard.length === state.correctAnswers) {
    state.correctAnswers = 0
    state.currentLevel <= 9 ? state.currentLevel++ : ''
    state.score += 1000
    idxes.splice(0, idxes.length)
    generateBoard()
    if(state.score === 13000) {
      alert("win")
      state.currentLevel = 1
      state.score = 0
    }
  }
  renderGame()
}


function init() {
  generateBoard()
  renderGame();
}

window.addEventListener('load', init);


(window as any).cellAction = cellAction;