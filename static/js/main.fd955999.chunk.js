(this["webpackJsonpgame-of-life"]=this["webpackJsonpgame-of-life"]||[]).push([[0],{31:function(e,t,a){e.exports=a(32)},32:function(e,t,a){"use strict";a.r(t);var n=a(10),l=a(11),r=a(14),i=a(12),o=a(0),s=a.n(o),c=a(16),u=a.n(c),h=(a(37),a(41)),p=a(42),d=a(15),f=function(e){Object(r.a)(a,e);var t=Object(i.a)(a);function a(){var e;Object(n.a)(this,a);for(var l=arguments.length,r=new Array(l),i=0;i<l;i++)r[i]=arguments[i];return(e=t.call.apply(t,[this].concat(r))).selectBox=function(){e.props.selectBox(e.props.row,e.props.col)},e}return Object(l.a)(a,[{key:"render",value:function(){return s.a.createElement("div",{className:this.props.boxClass,id:this.props.id,onClick:this.selectBox})}}]),a}(s.a.Component),m=function(e){Object(r.a)(a,e);var t=Object(i.a)(a);function a(){return Object(n.a)(this,a),t.apply(this,arguments)}return Object(l.a)(a,[{key:"render",value:function(){for(var e=14*this.props.cols+1,t=[],a="",n=0;n<this.props.rows;n++)for(var l=0;l<this.props.cols;l++){var r=n+"_"+l;a=this.props.gridFull[n][l]?"box on":"box off",t.push(s.a.createElement(f,{boxClass:a,key:r,row:n,col:l,selectBox:this.props.selectBox}))}return s.a.createElement("div",{className:"grid",style:{width:e}},t)}}]),a}(s.a.Component),v=function(e){Object(r.a)(a,e);var t=Object(i.a)(a);function a(){var e;Object(n.a)(this,a);for(var l=arguments.length,r=new Array(l),i=0;i<l;i++)r[i]=arguments[i];return(e=t.call.apply(t,[this].concat(r))).handleSelect=function(t){e.props.gridSize(t)},e}return Object(l.a)(a,[{key:"render",value:function(){return s.a.createElement("div",{className:"center"},s.a.createElement(h.a,null,s.a.createElement("button",{class:"button",variant:"light",onClick:this.props.playButton},"Play"),s.a.createElement("button",{class:"button",variant:"light",onClick:this.props.pauseButton},"Pause"),s.a.createElement("button",{class:"button",variant:"light",onClick:this.props.clear},"Clear"),s.a.createElement("button",{class:"button",variant:"light",onClick:this.props.slow},"Slow"),s.a.createElement("button",{class:"button",variant:"light",onClick:this.props.fast},"Fast"),s.a.createElement("button",{class:"button",variant:"light",onClick:this.props.seed},"Random"),s.a.createElement(p.a,{class:"button",title:"Grid Size",id:"size-menu",onSelect:this.handleSelect},s.a.createElement(d.a,{eventKey:"1"},"20x10"),s.a.createElement(d.a,{eventKey:"2"},"50x30"),s.a.createElement(d.a,{eventKey:"3"},"70x50"))))}}]),a}(s.a.Component),g=function(e){Object(r.a)(a,e);var t=Object(i.a)(a);function a(){var e;return Object(n.a)(this,a),(e=t.call(this)).selectBox=function(t,a){var n=b(e.state.gridFull);n[t][a]=!n[t][a],e.setState({gridFull:n})},e.seed=function(){for(var t=b(e.state.gridFull),a=0;a<e.rows;a++)for(var n=0;n<e.cols;n++)1===Math.floor(4*Math.random())&&(t[a][n]=!0);e.setState({gridFull:t})},e.playButton=function(){clearInterval(e.intervalId),e.intervalId=setInterval(e.play,e.speed)},e.pauseButton=function(){clearInterval(e.intervalId)},e.slow=function(){e.speed=1e3,e.playButton()},e.fast=function(){e.speed=100,e.playButton()},e.clear=function(){var t=Array(e.rows).fill().map((function(){return Array(e.cols).fill(!1)}));e.setState({gridFull:t,generation:0})},e.gridSize=function(t){switch(t){case"1":e.cols=20,e.rows=10;break;case"2":e.cols=50,e.rows=30;break;default:e.cols=70,e.rows=50}e.clear()},e.play=function(){for(var t=e.state.gridFull,a=b(e.state.gridFull),n=0;n<e.rows;n++)for(var l=0;l<e.cols;l++){var r=0;n>0&&t[n-1][l]&&r++,n>0&&l>0&&t[n-1][l-1]&&r++,n>0&&l<e.cols-1&&t[n-1][l+1]&&r++,l<e.cols-1&&t[n][l+1]&&r++,l>0&&t[n][l-1]&&r++,n<e.rows-1&&t[n+1][l]&&r++,n<e.rows-1&&l>0&&t[n+1][l-1]&&r++,n<e.rows-1&&l<e.cols-1&&t[n+1][l+1]&&r++,t[n][l]&&(r<2||r>3)&&(a[n][l]=!1),t[n][l]||3!==r||(a[n][l]=!0)}e.setState({gridFull:a,generation:e.state.generation+1})},e.speed=100,e.rows=30,e.cols=50,e.state={generation:0,gridFull:Array(e.rows).fill().map((function(){return Array(e.cols).fill(!1)}))},e}return Object(l.a)(a,[{key:"componentDidMount",value:function(){this.seed()}},{key:"render",value:function(){return s.a.createElement("div",{class:"boxcontent"},s.a.createElement("h1",null,"Conway's Game of Life"),s.a.createElement("div",{class:"textinfo"},s.a.createElement("a",{href:"https://en.wikipedia.org/wiki/Conway's_Game_of_Life",target:"_blank"},s.a.createElement("p",null,"Sourced from Wikipedia.org")),s.a.createElement("p",null,"The Game of Life, also known simply as Life, is a cellular automaton devised by the British mathematician John Horton Conway in 1970. It is a zero-player game, meaning that its evolution is determined by its initial state, requiring no further input. One interacts with the Game of Life by creating an initial configuration and observing how it evolves. It is Turing complete and can simulate a universal constructor or any other Turing machine."),s.a.createElement("h2",null,"Rules"),s.a.createElement("p",null,"The universe of the Game of Life is an infinite, two-dimensional orthogonal grid of square cells, each of which is in one of two possible states, live or dead, (or populated and unpopulated, respectively). Every cell interacts with its eight neighbours, which are the cells that are horizontally, vertically, or diagonally adjacent. At each step in time, the following transitions occur:"),s.a.createElement("ol",null,s.a.createElement("li",null,"Any live cell with two or three live neighbours survives."),s.a.createElement("li",null,"Any dead cell with three live neighbours becomes a live cell."),s.a.createElement("li",null,"All other live cells die in the next generation. Similarly, all other dead cells stay dead."))),s.a.createElement("div",{class:"game"},s.a.createElement(v,{playButton:this.playButton,pauseButton:this.pauseButton,slow:this.slow,fast:this.fast,clear:this.clear,seed:this.seed,gridSize:this.gridSize}),s.a.createElement(m,{gridFull:this.state.gridFull,rows:this.rows,cols:this.cols,selectBox:this.selectBox}),s.a.createElement("h2",null,"Generations: ",this.state.generation)))}}]),a}(s.a.Component);function b(e){return JSON.parse(JSON.stringify(e))}u.a.render(s.a.createElement(g,null),document.getElementById("root"))},37:function(e,t,a){}},[[31,1,2]]]);
//# sourceMappingURL=main.fd955999.chunk.js.map