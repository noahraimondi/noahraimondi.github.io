// This is a small program. There are only two sections. This first section is what runs
// as soon as the page loads.
$(document).ready(function () {
  render($("#display"), image);
  $("#apply").on("click", applyAndRender);
  $("#reset").on("click", resetAndRender);
  //Add more buttons ... hehehehe

});

/////////////////////////////////////////////////////////
//////// event handler functions are below here /////////
/////////////////////////////////////////////////////////

// this function resets the image to its original value; do not change this function
function resetAndRender() {
  reset();
  render($("#display"), image);
}

// this function applies the filters to the image and is where you should call
// all of your apply functions
function applyAndRender() {
  // Multiple TODOs: Call your apply function(s) here
  applyFilterOnlyBackground(reddify);
  applyFilter(decreaseBlue);
  applyFilterNoBackground(increaseGreenByBlue);
  
  // do not change the below line of code
  render($("#display"), image);
}

/////////////////////////////////////////////////////////
// "apply" and "filter" functions should go below here //
/////////////////////////////////////////////////////////

// TODO 1, 2 & 4: Create the applyFilter function here
function applyFilter (filterFunction){
  for(var i = 0; i < image.length; i++){
    for(var j = 0; j < image[i].length;j++){
      var rgbString = image[i][j]
      var rgbNumbers = rgbStringToArray(rgbString);
      filterFunction(rgbNumbers)
      //rgbNumbers[RED]= 255;
      rgbString = rgbArrayToString(rgbNumbers)
      console.log(rgbString)
      image[i][j] =rgbString
    }
  }
}

// TODO 7: Create the applyFilterNoBackground function
function applyFilterNoBackground (filterFunction){
  var backColor = image[0][0];
  for(var i = 0; i < image.length; i++){
    for(var j = 0; j < image[i].length;j++){
      var rgbString = image[i][j]
      var rgbNumbers = rgbStringToArray(rgbString);
      rgbString === backColor ? rgbString : filterFunction(rgbNumbers)
      //filterFunction(rgbNumbers)
      rgbString = rgbArrayToString(rgbNumbers)
      image[i][j] =rgbString
    }
  }
}

function applyFilterOnlyBackground (filterFunction){
  var backColor = image[0][0];
  for(var i = 0; i < image.length; i++){
    for(var j = 0; j < image[i].length;j++){
      var rgbString = image[i][j]
      var rgbNumbers = rgbStringToArray(rgbString);
      rgbString === backColor ? filterFunction(rgbNumbers) : rgbString
      rgbString = rgbArrayToString(rgbNumbers)
      image[i][j] =rgbString
    }
  }
}

// TODO 5: Create the keepInBounds function
function keepInBounds (num){
  return num > 255 ? 255 : num < 0 ? 0 : num
  /*
  num = Math.min(num, 255)
  num = Math.max(num, 0)
  */
}

// TODO 3: Create reddify function
function reddify (arr){
  arr[RED] = 200
}

// TODO 6: Create more filter functions
function decreaseBlue (arr){
  arr[BLUE] = keepInBounds(arr[BLUE] -50)
}

function increaseGreenByBlue (arr){
  arr[GREEN] = keepInBounds(arr[GREEN] + arr[BLUE])
}

function smudgeLess (arr){

}

// CHALLENGE code goes below here
function applySmudge (filterFunction){
  var backColor = image[0][0];
  for(var i = 0; i < image.length; i++){
    for(var j = 0; j < image[i].length;j++){
      var l = i-1
      var m = j-1
      l === -1 ? 0 : l
      m === -1 ? 0 : m
      


      //Get the left brick color and apply it to the right brick
      
















      var rgbString = image[i][j]
      var rgbNumbers = rgbStringToArray(rgbString);
      filterFunction()
      rgbString = rgbArrayToString(rgbNumbers)
      image[i][j] =rgbString
    }
  }
}































