var lastClicked;
var blankId = "44";
var rowBar = 4;
var colBar = 4;
var noOfMoves = 0;
var flag = 0;

function randperm(maxValue){
  // first generate number sequence
  var permArray = new Array(maxValue);
  for(var i = 0; i < maxValue; i++){
    permArray[i] = i;
  }
  // draw out of the number sequence
  for (var i = (maxValue - 1); i >= 0; --i){
    var randPos = Math.floor(i * Math.random());
    var tmpStore = permArray[i];
    permArray[i] = permArray[randPos];
    permArray[randPos] = tmpStore;
  }
  return permArray;
}

arr = randperm(15)
console.log(arr)

var grid = clickableGrid(4, 4, function(el, row, col, i) {
  console.log("You clicked on element:", el);
  console.log("You clicked on row:", row);
  console.log("You clicked on col:", col);
  console.log("You clicked on item #:", i);
  el.className = 'clicked';
  if (lastClicked) lastClicked.className = '';
  lastClicked = el;
});

document.body.appendChild(grid);

function checkGrid() {
  var t = 0;
  console.log("--------------------------")
  for (var r = 1; r <= rowBar; ++r) {
    for (var c = 1; c <= colBar; ++c) {
      if (r == rowBar && c == colBar) return 1;
      rr = r.toString()
      cc = c.toString()
      k = document.getElementById(rr + cc).innerHTML
      console.log(k + "----" + t)
      if (k != (t + 1)) return 0;
      t++;
    }
  }
  return 1;
}

function clickableGrid(rows, cols, callback) {
  var i = 0;
  var grid = document.createElement('table');
  grid.className = 'grid';
  for (var r = 1; r <= rows; ++r) {
    var tr = grid.appendChild(document.createElement('tr'));
    for (var c = 1; c <= cols; ++c) {
      var cell = tr.appendChild(document.createElement('td'));
      rr = r.toString()
      cc = c.toString()
      cell.setAttribute("id", rr + cc);
      cell.className = "Value";
      if (r == rows && c == cols) {
        cell.className = "Blank"
      }
      console.log(cell.id)
      console.log(cell.className)
      if (r == 4 && c == 4) {
        return grid
      }
      cell.innerHTML = arr[i];
      i++;
      cell.addEventListener('click', (function(el, r, c, i) {
        return function() {
          callback(el, r, c, i);
        }
      })(cell, r, c, i), false);
    }
  }
  return grid;
}

document.addEventListener("keydown", keyDownTextField, false);
var table = document.createElement("table");
var divContainer = document.getElementById('moves');
divContainer.innerHTML = "";
divContainer.appendChild(table);

function updateGrid(x, y) {
  valueId = x.toString() + y.toString()
  if ((x > 0 && x < 5) && (y > 0 && y < 5)) {
    var tr = table.insertRow(-1)
    var td = document.createElement("td");
    td.innerHTML = blankId + "-->" + valueId;
    tr.appendChild(td);
    document.getElementById(blankId).innerHTML = document.getElementById(valueId).innerHTML

    document.getElementById(valueId).innerHTML = ""
    blankId = valueId
  }
}

function keyDownTextField(e) {
  if (flag == 0) {
    timer();
    flag = 1;
  }

  var keyCode = e.keyCode;
  noOfMoves++;
  document.getElementById("noOfMoves").innerHTML = noOfMoves
  if (keyCode == 37) {
    x = parseInt(blankId[0])
    y = parseInt(blankId[1]) - 1
    updateGrid(x, y)
    var x = checkGrid()
    console.log(x)
    if (x == 1) {
      clearTimeout(t);
      clearTimeout(t);
      alert("you Won")
    }
  }
  if (keyCode == 38) {
    x = parseInt(blankId[0]) - 1
    y = parseInt(blankId[1])
    updateGrid(x, y)
    var x = checkGrid()
    console.log(x)
    if (x == 1) {
      clearTimeout(t);
      clearTimeout(t);
      alert("you Won")
    }
  }
  if (keyCode == 39) {
    x = parseInt(blankId[0])
    y = parseInt(blankId[1]) + 1
    updateGrid(x, y)
    var x = checkGrid()
    console.log(x)
    if (x == 1) {
      clearTimeout(t);
      clearTimeout(t);
      alert("you Won")
    }
  }
  if (keyCode == 40) {
    x = parseInt(blankId[0]) + 1
    y = parseInt(blankId[1])
    updateGrid(x, y)
    var x = checkGrid()
    console.log(x)
    if (x == 1) {
      clearTimeout(t);
      clearTimeout(t);
      alert("you Won")
    }
  }
}

var h1 = document.getElementsByTagName('h1')[0],
  start = document.getElementById('start'),
  stop = document.getElementById('stop'),
  clear = document.getElementById('clear'),
  seconds = 0,
  minutes = 0,
  hours = 0,
  t;

function add() {
  seconds++;
  if (seconds >= 60) {
    seconds = 0;
    minutes++;
    if (minutes >= 60) {
      minutes = 0;
      hours++;
    }
  }

  h1.textContent = (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);

  timer();
}

function timer() {
  t = setTimeout(add, 1000);
}



/* Start button */
start.onclick = timer;
clearTimeout(t);
/* Stop button */
stop.onclick = function() {
  clearTimeout(t);
}

/* Clear button */
clear.onclick = function() {
  h1.textContent = "00:00:00";
  seconds = 0;
  minutes = 0;
  hours = 0;
}
