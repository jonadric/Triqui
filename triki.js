
// var container = document.querySelector('.triki');
// var startButton = document.getElementById('startButton')
// container.addEventListener("click", onCellClick);

// function onCellClick(event) {
// 	var target = event.target;
// 	var dataset = target.dataset;
// 	0if (dataset && dataset.row) {
// 		console.log('pos', dataset.row, dataset.column);
// 	}
// }

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

var jugando = true // con esta empieza ajugar //
// FUNCION COMPRUEBA JUGADA
function CompruebaJugada(triqui, ficha) {
   //comprueba que hay posibilidad de hacer 3 en raya en una fila, columna o diagonal
   //devuelve la posicion donde hay que colocar la ficha para hacerlo y -1 si no hay jugada
   var x, y
   var triquiX = document.getElementsByTagName('button');
   
   for(x = 0; x < 9; x += 3) {
      //comprueba las filas
      if ((triquiX[x].value == ficha) && (triquiX[x + 1].value == ficha))
      if (triquiX[x + 2].value == "")
         return (x + 2)
      if ((triquiX[x].value == ficha) && (triquiX[x + 2].value == ficha))
      if (triquiX[x + 1].value == "")
         return (x + 1)
      if ((triquiX[x + 1].value == ficha) && (triquiX[x + 2].value == ficha))
      if (triquiX[x].value == "")
      return (x)
   }
   for(x = 0; x < 3; x++) {
      //comprueba las columnas
      if ((triquiX[x].value == ficha) && (triquiX[x + 3].value == ficha))
      if (triquiX[x + 6].value == "")
      return (x + 6)
      if ((triquiX[x].value == ficha) && (triquiX[x + 6].value == ficha))
      if (triquiX[x + 3].value == "")
      return (x + 3)
      if ((triquiX[x + 3].value == ficha) && (triquiX[x + 6].value == ficha))
      if (triquiX[x].value == "")
      return (x)
   }
   //comprueba las diagonales
   if ((triquiX[2].value == ficha) && (triquiX[4].value == ficha) && (triquiX[6].value == ""))
   return (6)
   if ((triquiX[2].value == ficha) && (triquiX[4].value == "") && (triquiX[6].value == ficha))
   return (4)
   if ((triquiX[2].value == "") && (triquiX[4].value == ficha) && (triquiX[6].value == ficha))
   return (2)
   if ((triquiX[0].value == ficha) && (triquiX[4].value == ficha) && (triquiX[8].value == ""))
   return (8)
   if ((triquiX[0].value == ficha) && (triquiX[4].value == "") && (triquiX[8].value == ficha))
   return (4)
   if ((triquiX[0].value == "") && (triquiX[4].value == ficha) && (triquiX[8].value == ficha))
   return (0)
   return -1
}


//FUNCION PAREJA HORIZONTAL
function ParejaHorizontal(triqui, ficha) {


   //comprueba si es posible poner 2 en una fila, estando vacia la otra posicion...
   //...de esa misma fila
   //devuelve la fila que permite hacerlo, o -1 en caso contrario
   var triquiX = document.getElementsByTagName('button');
   var x, y
   for(x = 0; x < 9; x += 3) {
      //comprueba las filas
      if ((triquiX[x].value == ficha) && (triquiX[x + 1].value == "") && (triquiX[x + 2].value == ""))
      return (x)
      if ((triquiX[x].value == "") && (triquiX[x + 1].value == ficha) && (triquiX[x + 2].value == ""))
      return (x + 1)
      if ((triquiX[x].value == "") && (triquiX[x + 1].value == "") && (triquiX[x + 2].value == ficha))
      return (x + 2)
   }
   return -1
}


//FUNCION PAREJA VERTICAL
function ParejaVertical(triqui, ficha, jugadaHtal) {
   //comprueba si es posible poner 2 en una columna, estando vacia la otra posicion...
   //...de esa misma columna y teniendo en cuenta si esa posicion ya es pareja horizontal
   //devuelve la columna que permite hacerlo si no es pareja horizontal, o -1 en caso contrario
   var x, y
   var triquiX = document.getElementsByTagName('button');
   for(x = 0; x < 3; x++) {
      //comprueba las columnas
      if ((triquiX[x].value == ficha) && (triquiX[x + 3].value == "") && (triquiX[x + 6].value == ""))
      if (x != jugadaHtal)
         //si es pareja horizontal no interesa como vertical
         return (x)
      if ((triquiX[x].value == "") && (triquiX[x + 3].value == ficha) && (triquiX[x + 6].value == ""))
      if ((x + 3) != jugadaHtal)
      return (x + 3)
      if ((triquiX[x].value == "") && (triquiX[x + 3].value == "") && (triquiX[x + 6].value == ficha))
      if ((x + 6) != jugadaHtal)
      return (x + 6)
   }
   return -1
}


//FUNCION OBTEN POSICION
function ObtenPosicion(jugadaHtal, jugadaVcal) {
   //busca la posicion que permite hacer jugada vertical y jugada horizontal a la vez
   //conocidas la fila y la columna donde pueden hacerse parejas
   var x, y, fila, columna;
   var posicion = 0;
   matriz = new Array(3)
   for (x = 0; x < 3; x++) {
      //crea un matriz que asigna posicion a fila y columna
      matriz[x] = new Array(3)
      for (y = 0; y < 3; y++) {
         matriz[x][y] = posicion
         posicion ++
      }
   }
   for (x = 0; x < 3; x++) {
      //busca la fila y la columna
      for (y = 0; y < 3; y++) {
         if (matriz[x][y] == jugadaHtal)
            //encontro la fila
         fila = x
         if (matriz[x][y] == jugadaVcal)
            //encontro la columna
            columna = y
      }
   }
   return (matriz[fila][columna])
   //devuelve posicion jugada
}


//FUNCION PONER REDONDEL
function PonerRedondel(triqui) {
   //juega el ordanador
   var triquiX = document.getElementsByTagName('button');
   var jugada, jugadaHtal, jugadaVcal
   
   //ataca y gana
   jugada = CompruebaJugada(triqui, "O")
   
   if (jugada != -1) {
      //triquiX[jugada].value = "O"
      triquiX[jugada].setAttribute('value', 'O');
      triquiX[jugada].innerHTML = "O";
      alert('Te Gane Puto')
      jugando = false
      return 1
   }
   //defiende evitando que gane el rival
   jugada = CompruebaJugada(triqui, "X")
   if (jugada != -1) {
      //triquiX[jugada].value = "O"
      triquiX[jugada].setAttribute('value', 'O');
      triquiX[jugada].innerHTML = "O";
      return 1
   }
   //ataca y gana a la siguiente
   jugadaHtal = ParejaHorizontal(triqui, "O")
   jugadaVcal = ParejaVertical(triqui, "O", jugadaHtal)
   if ((jugadaHtal != -1) && (jugadaVcal != -1)) {
      //puede poner 2 en fila y 2 en columna
      if ((jugadaHtal != 4) || (jugadaVcal != 4)) {
         //no es el centro
         jugada = ObtenPosicion(jugadaHtal, jugadaVcal)
         //obtiene donde debe poner

         //triqui.elements[jugada].value = "O"

         triquiX[jugada].setAttribute('value', 'O');
         triquiX[jugada].innerHTML = "O"; 
         return 1
      }
   }
   //ataca y pone dos en fila
   if ((jugadaHtal != -1) && (jugadaVcal == -1)) {
      if ((jugadaHtal != 2) && (jugadaHtal != 5) && (jugadaHtal != 8)){
         //esto es arbitrario
         triquiX[jugadaHtal + 1].setAttribute('value', 'O');
         triquiX[jugadaHtal + 1].innerHTML = "O"; 
      //pone a la derecha
      }else{
         triquiX[jugadaHtal - 1].setAttribute('value', 'O');
         triquiX[jugadaHtal - 1].innerHTML = "O"; 
         //pone a la izquierda
         return 1}
  }
      //ataca y pone dos en columna
      if ((jugadaHtal == -1) && (jugadaVcal != -1)) {
         if ((jugadaVcal != 6) && (jugadaVcal != 7) && (jugadaVcal != 8)){

            triquiX[jugadaHtal + 3].setAttribute('value', 'O');
            triquiX[jugadaHtal + 3].innerHTML = "O"; 
            
         //pone abajo
         }else{
            triquiX[jugadaHtal - 3].setAttribute('value', 'O');
            triquiX[jugadaHtal - 3].innerHTML = "O"; }
            
         //pone arriba
         return 1
   }
   //ocupa el centro
   if (triquiX[4].value == "") {

      triquiX[4].setAttribute('value', 'O');
      triquiX[4].innerHTML = "O";
      //triquiX[4].value = "O"
      return 1
   }
   //ocupa la primera que este libre
   for (x = 0; x < 9; x++)
   if (triquiX[x].value == "") {

      triquiX[x].setAttribute('value', 'O');
      triquiX[x].innerHTML = "O";
      
      return 1
   }
   alert('Empatamos Puto.')
   
   jugando = false
   return -1

   console.log(jugada);
}


//FUNCION PONER ASPA
function PonerX(triqui, posicion, valor) {
   //comprueba  se esta jugando valida campo de la x
   var posicionX = valor.value;
   if (jugando) {
      if (posicionX != "")
         //casilla no vacia
         alert('Esa casilla ya está ocupada.')
      else {
         //casilla vacia, puede poner

         valor.setAttribute('value', 'X');
         valor.innerHTML = "X";
         
         if ( CompruebaVictoria(triqui, "X") ) {
            alert('¡Felicidades! Tú ganas.')
            
            jugando = false
         } else
            PonerRedondel(triqui)
      }
   } else {
      alert('Recargar Volver a jugar ')
   }
}


//FUNCION COMPRUEBA VICTORIA
function CompruebaVictoria(triqui, ficha) {
   var triquiX = document.getElementsByTagName('button');
   for(x = 0; x < 9; x += 3) {
      
      if ((triquiX[x].value == ficha) && (triquiX[x + 1].value == ficha) && (triquiX[x + 2].value == ficha))
      return true
   }
   for(x = 0; x < 3; x++) {
      //comprueba las columnas
      if ((triquiX[x].value == ficha) && (triquiX[x + 3].value == ficha) && (triquiX[x + 6].value == ficha))
      return true
   }
   //comprueba las diagonales
   if ((triquiX[2].value == ficha) && (triquiX[4].value == ficha) && (triquiX[6].value == ficha))
      return true
   if ((triquiX[0].value == ficha) && (triquiX[4].value == ficha) && (triquiX[8].value == ficha))
      return true
   return false
}

  var jugando = true ;

   function PintarX(whois) {
      whois.value="X";     //formulario forma objeto num propiedad objeto//

   }

function ponermarca(triqui, posicion) {
   //comprueba primero que se esta jugando
   var triquiX = document.getElementsByTagName('button');
   if (jugando) {
      if (triquiX[posicion].value != "")
         //casilla no vacia
         alert('Esa casilla ya está ocupada.')
         //casilla vacia, puede poner
         else {
         //triquiX[posicion].value = "X";
         console.log(posicion);
         triquiX[posicion].setAttribute('value', 'X');
         triquiX[posicion].innerHTML = "X";
        }
    } else {
      alert('Para comenzar una nueva partida\npulsa Iniciar Juego nuevo.')
   }
}

   //ayuda sobre el juego//
   function apareceayuda(){
    ayuda.style.visibility="visible";
    return true;
  }

   function desapareceayuda(){
     ayuda.style.visibility="hidden";
     return true;
    }