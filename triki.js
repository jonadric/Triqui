
var container = document.querySelector('.triki');
var startButton = document.getElementById('startButton')
container.addEventListener("click", onCellClick);

function onCellClick(event) {
	var target = event.target;
	var dataset = target.dataset;
	console.log(target);
	// if (dataset && dataset.row) {
	// 	console.log('pos', dataset.row, dataset.column);
	// }
}

// function tablero(){
// 	this.matrix = [
// 	[null,null,null],
// 	[null,null,null],
// 	[null,null,null]
// 	];
// }
// tablero.prototype.output = function () {
// 	return this.matrix;
// };
// function Start (){
// 	var juego = new tablero ();
// 	render(juego.output());
// }
// function render(matrix) {
// 	var values = matrix.reduce(function(array, row, rowIndex){
// 		return array.concat(row.map(function (cell, cellIndex){
// 			return {
// 				value: cell,
// 				id: 'cell-'+ rowIndex + '-' + cellIndex
// 			};
// 		}))
// 	},[]);
// 	console.log(values);
// }
// start();