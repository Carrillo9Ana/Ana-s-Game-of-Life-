import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { ButtonToolbar, DropdownItem, DropdownButton } from 'react-bootstrap';

class Box extends React.Component {
  
  selectBox = () => {
    this.props.selectBox(this.props.row, this.props.col)
  }
  
  render() {
    return (
      <div className={this.props.boxClass} id={this.props.id} onClick={this.selectBox}/>
    )
  }
}

class Grid extends React.Component {
  
  render() {
    const width = (this.props.cols * 14) + 1;
    var rowsArr = [];
    var boxClass = "";
    for (var i = 0; i < this.props.rows; i++) {
      for (var j = 0; j < this.props.cols; j++) {
        let boxID = i + "_" + j;

        boxClass = this.props.gridFull[i][j] ? "box on" : "box off";
        rowsArr.push(
          <Box
            boxClass={boxClass}
            key={boxID}
            row={i}
            col={j}
            selectBox={this.props.selectBox}
            />
        );
      }
    }

    return (
      <div className="grid" style={{width: width}}>
        {rowsArr}
      
      </div>
    )
  }
}

class Buttons extends React.Component {

	handleSelect = (evt) => {
		this.props.gridSize(evt);
	}

	render() {
		return (
			<div className="center">
				<ButtonToolbar>
					<button class="button" variant="light" onClick={this.props.playButton}>
						Play
					</button>
					<button class="button" variant="light" onClick={this.props.pauseButton}>
					  Pause
					</button>
					<button class="button" variant="light" onClick={this.props.clear}>
					  Clear
					</button>
					<button class="button" variant="light" onClick={this.props.slow}>
					  Slow
					</button>
					<button class="button" variant="light" onClick={this.props.fast}>
					  Fast
					</button>
					<button class="button" variant="light" onClick={this.props.seed}>
					  Random
					</button>
					<DropdownButton
            class="button"
						title="Grid Size"
						id="size-menu"
            onSelect={this.handleSelect}
					>
						<DropdownItem eventKey="1">20x10</DropdownItem>
						<DropdownItem eventKey="2">50x30</DropdownItem>
						<DropdownItem eventKey="3">70x50</DropdownItem>
					</DropdownButton>
				</ButtonToolbar>
			</div>
			)
	}
}

class Container extends React.Component {
    constructor() {
      super();
      this.speed = 100;
      this.rows = 30;
      this.cols = 50;
      this.state = {
        generation: 0,
        gridFull: Array(this.rows).fill().map(() => Array(this.cols).fill(false))
      }
    }

    selectBox = (row, col) => {
      let gridCopy = arrayClone(this.state.gridFull);
      gridCopy[row][col] = !gridCopy[row][col];
      this.setState({
        gridFull: gridCopy
      })
    }

    seed = () => {
      let gridCopy = arrayClone(this.state.gridFull);
      for (let i = 0; i < this.rows; i ++) {
        for (let j = 0; j < this.cols; j ++) {
          if (Math.floor(Math.random() * 4) === 1) {
            gridCopy[i][j] = true;
          }
        }
      }
      this.setState({
        gridFull: gridCopy
      });
    }

    playButton = () => {
      clearInterval(this.intervalId);
      this.intervalId = setInterval(this.play, this.speed);
    }

    pauseButton = () => {
      clearInterval(this.intervalId);
    }

    slow = () => {
      this.speed = 1000;
      this.playButton();
    }
  
    fast = () => {
      this.speed = 100;
      this.playButton();
    }
  
    clear = () => {
      var grid = Array(this.rows).fill().map(() => Array(this.cols).fill(false));
      this.setState({
        gridFull: grid,
        generation: 0
      });
    }

    gridSize = (size) => {
      switch (size) {
        case "1":
          this.cols = 20;
          this.rows = 10;
          
        break
        case "2":
          this.cols = 50;
          this.rows = 30;
        break
        default:
          this.cols = 70;
          this.rows = 50;
      }
      this.clear();      
    }

    play = () => {
      let g = this.state.gridFull;
      let g2 = arrayClone(this.state.gridFull);

      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.cols; j++) {
          let count = 0;
          if (i > 0) if (g[i - 1][j]) count++;
          if (i > 0 && j > 0) if (g[i - 1][j - 1]) count++;
          if (i > 0 && j < this.cols - 1) if (g[i - 1][j + 1]) count++;
          if (j < this.cols - 1) if (g[i][j + 1]) count++;
          if (j > 0) if (g[i][j - 1]) count++;
          if (i < this.rows - 1) if (g[i + 1][j]) count++;
          if (i < this.rows - 1 && j > 0) if (g[i + 1][j - 1]) count++;
          if (i < this.rows - 1 && j < this.cols - 1) if (g[i + 1][j + 1]) count++;
          if (g[i][j] && (count < 2 || count > 3)) g2[i][j] = false;
          if (!g[i][j] && count === 3) g2[i][j] = true;        
        }
      }
      
      this.setState({
        gridFull: g2,
        generation: this.state.generation + 1
      });
    }

    componentDidMount() {
      this.seed();
    }

    render() {
        return (
            <div class="boxcontent">
                <h1>Conway's Game of Life</h1>
                <div class="textinfo">
                  <a href="https://en.wikipedia.org/wiki/Conway's_Game_of_Life" target="_blank"><p>Sourced from Wikipedia.org</p></a>
                  <p>The Game of Life, also known simply as Life, is a cellular automaton devised by the British mathematician John Horton Conway in 1970. It is a zero-player game, meaning that its evolution is determined by its initial state, requiring no further input. One interacts with the Game of Life by creating an initial configuration and observing how it evolves. It is Turing complete and can simulate a universal constructor or any other Turing machine.</p>
                  <h2>Rules</h2>
                  <p>The universe of the Game of Life is an infinite, two-dimensional orthogonal grid of square cells, each of which is in one of two possible states, live or dead, (or populated and unpopulated, respectively). Every cell interacts with its eight neighbours, which are the cells that are horizontally, vertically, or diagonally adjacent. At each step in time, the following transitions occur:</p>
                  <ol>
                    <li>Any live cell with two or three live neighbours survives.</li>
                    <li>Any dead cell with three live neighbours becomes a live cell.</li>
                    <li>All other live cells die in the next generation. Similarly, all other dead cells stay dead.</li>
                  </ol>
                </div>
                <div class="game">
                  <Buttons
                    playButton={this.playButton}
                    pauseButton={this.pauseButton}
                    slow={this.slow}
                    fast={this.fast}
                    clear={this.clear}
                    seed={this.seed}
                    gridSize={this.gridSize}
                  />
                  <Grid
                    gridFull={this.state.gridFull}
                    rows={this.rows}
                    cols={this.cols}
                    selectBox={this.selectBox}
                  />
                  <h2>Generations: {this.state.generation}</h2>
                </div>    
            </div>
        );
    }
}

function arrayClone(arr) {
  return JSON.parse(JSON.stringify(arr));
}

ReactDOM.render(<Container />, document.getElementById('root'));