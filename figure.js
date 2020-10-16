//images
//https://www.pngegg.com/en/png-hromm

window.onbeforeunload = function () {
  window.scrollTo(0, 0);
}

// using d3 for convenience
var main = d3.select("main");
var scrolly = main.select("#scrolly");
var figure = scrolly.select("figure").attr('position', 'absolute');
var article = scrolly.select("article");
var step = article.selectAll(".step");

// initialize the scrollama
var scroller = scrollama();

// generic window resize listener event
function handleResize() {
  // 1. update height of step elements
  var stepH = Math.floor(window.innerHeight * 0.75);
  step.style("height", stepH + "px");

  var figureHeight = window.innerHeight / 2;
  var figureMarginTop = (window.innerHeight - figureHeight) / 2;

  figure
    .style("height", figureHeight + "px")
    .style("top", figureMarginTop + "px");

  // 3. tell scrollama to update new element dimensions
  scroller.resize();
}



// scrollama event handlers
function handleStepEnter(response) {
  console.log(response);
  // response = { element, direction, index }

  // add color to current step only
  step.classed("is-active", function(d, i) {

    return i === response.index;
  });

  // update graphic based on step

  /*
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                                Transitions
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  */
  
  if (response.index === 0 & response.direction == 'down') {
    transitionZeroDown()
  } else if (response.index == 0 & response.direction == 'up') {
    transitionZeroUp()
  } else if (response.index === 1 & response.direction == 'down') {
    transitionOneDown()
  } else if (response.index === 1 & response.direction == 'up') {
    transitionOneUp()
  } else if (response.index === 2 & response.direction == 'down') {
    transitionTwoDown()
  } else if (response.index === 2 & response.direction == 'up') {
    transitionTwoUp()
  } else if (response.index === 3 & response.direction == 'down') {
    transitionThreeDown()
  } else if (response.index === 3 & response.direction == 'up') {
    transitionThreeUp()
  } else if (response.index === 4 & response.direction == 'down') {
    transitionFourDown()
  } else if (response.index === 7 & response.direction == 'up') {
    transitionEightUp()
    transitionThreeDown()
  } else if (response.index === 8 & response.direction == 'down') {
    transitionNineDown()
  } else if (response.index === 8 & response.direction == 'up'){

  } else if (response.index === 9 & response.direction == 'down'){
    transitionTenDown()
  }
  
}

function setupStickyfill() {
  d3.selectAll(".sticky").each(function() {
    Stickyfill.add(this);
  });
}

function init() {
  setupStickyfill();

  // 1. force a resize on load to ensure proper dimensions are sent to scrollama
  handleResize();

  // 2. setup the scroller passing options
  // 		this will also initialize trigger observations
  // 3. bind scrollama event handlers (this can be chained like below)
  scroller
    .setup({
      step: "#scrolly article .step",
      offset: 0.33,
      debug: false
    })
    .onStepEnter(handleStepEnter);

  // setup resize event
  window.addEventListener("resize", handleResize);
}

// Colors

var selectedColor = '#FC814A';
var tickColor = '#FE5F55';
var carColor = '#4C9F70';
var doorColor = '#202030';

// Game values

function canReveal(playerChoice, carChoice){
  // Iterate over each door (j) and return the value of the door that can be revealed
  for(var j = 0; j < 3; j++){
    if(j != playerChoice & j != carChoice){
      return j;
    }
  }
}

var playerChoice = 0;
var carChoice = Math.floor(Math.random()*3);
var carReveal = canReveal(playerChoice, carChoice);
var isRevealed = false;

// Constants and data for 

function transitionZeroDown(){
  // doors appear with monty at the microphone
  var svgHeight = parseFloat(figure.style("height"));
  var svgWidth = parseFloat(figure.style("width"));

  var fig1 = document.getElementById("fig1");

  if(!fig1){
    var svg = d3.select("figure")
    .append("svg")
    .attr("id", "fig1")
    .attr('position', 'absolute')
    .attr("width", svgWidth)
    .attr("height", svgHeight);

    var doors = svg.selectAll("rect").data([1,2,3])

    var doorWidth = svgWidth/6;
    var doorHeight = doorWidth*1.618;

    var bigTicks = doors.enter().append("svg:image")
    .attr('width', doorWidth)
    .attr('y', doorHeight/2 - doorWidth/2)
    .attr("xlink:href", "images/times-circle-regular.svg")
    .attr("id", function(d,i){return "bigtick_" + i})
    .attr("x", function(d,i){return (i+1)*svgWidth/4 - doorWidth/2})
    .attr("y", svgHeight/2 - doorHeight/3)
    .attr('class', 'bigTick')
    .style("opacity", 0.0);



    var doorsEnter = doors.enter().append("rect")
    .style('fill', '#202030')
    doorsEnter.attr("width", doorWidth);
    doorsEnter.attr("height", doorHeight);
    doorsEnter.attr("y", svgHeight/2 - doorHeight/2);
    doorsEnter.style("opacity", 0.0);
    doorsEnter.attr("x", 
    function(d,i){
      return (i+1)*svgWidth/4 - doorWidth/2;
    });
    doorsEnter.attr("id", function(d,i){
      return "door_" + i;
    }).attr('class', 'mainDoors');

    /*
      TODO: Add some clicks
    */

    d3.selectAll('.mainDoors')
    .on("click", function(d, i){

      

      console.log(this.id)
      d3.select("#"+this.id).transition().style('fill', selectedColor)
      if (isRevealed){
        if(0 == parseInt(this.id.slice(-1)) & parseInt(this.id.slice(-1)) != carReveal){

          d3.select("#"+this.id).transition().style('fill', selectedColor)
          d3.select("#door_"+1).transition().style('fill', doorColor)
          d3.select("#door_"+2).transition().style('fill', doorColor)
          playerChoice = 0
        } else if (1 == parseInt(this.id.slice(-1)) & parseInt(this.id.slice(-1)) != carReveal){

          d3.select("#"+this.id).transition().style('fill', selectedColor)
          d3.select("#door_"+ 0).transition().style('fill', doorColor)
          d3.select("#door_"+2).transition().style('fill', doorColor)
          playerChoice = 1
        } else if (2 == parseInt(this.id.slice(-1)) & parseInt(this.id.slice(-1)) != carReveal){

          d3.select("#"+this.id).transition().style('fill', selectedColor)
          d3.select("#door_"+ 0).transition().style('fill', doorColor)
          d3.select("#door_"+1).transition().style('fill', doorColor)
          playerChoice = 2
        }
      } else{
        if(0 == parseInt(this.id.slice(-1))){
          d3.select("#"+this.id).transition().style('fill', selectedColor)
          d3.select("#door_"+1).transition().style('fill', doorColor)
          d3.select("#door_"+2).transition().style('fill', doorColor)
          playerChoice = 0
        } else if (1 == parseInt(this.id.slice(-1))){
          d3.select("#"+this.id).transition().style('fill', selectedColor)
          d3.select("#door_"+ 0).transition().style('fill', doorColor)
          d3.select("#door_"+2).transition().style('fill', doorColor)
          playerChoice = 1
        } else if (2 == parseInt(this.id.slice(-1))){
          d3.select("#"+this.id).transition().style('fill', selectedColor)
          d3.select("#door_"+ 0).transition().style('fill', doorColor)
          d3.select("#door_"+1).transition().style('fill', doorColor)
          playerChoice = 2
        }
        carReveal = canReveal(playerChoice, carChoice)
      }


        console.log('player: ' + playerChoice + ', car: ' + carChoice + ', can reveal: ' + carReveal)

      return 
    });




    
    var monty = svg.append('image')
      .attr('id', 'montyImage')
      .attr('xlink:href', './images/monty.svg')
      .attr('width', doorWidth*1.618)
      .attr('height', doorWidth*1.618)
      .attr("x", svgWidth*0.8)
      .attr("y", 2/3 * svgHeight - doorWidth/2)
      .style("opacity", 0.0);

    window.doorOneOriginalX = d3.select('#fig1').select("#door_0").style("x")
    window.doorOneOriginalY = d3.select('#fig1').select("#door_0").style("y")
    window.doorOneOriginalW = d3.select('#fig1').select("#door_0").style("width")
    window.doorOneOriginalH = d3.select('#fig1').select("#door_0").style("height")
  }

  doorsEnter.transition()
  .duration(2000)
  .style("opacity", 1.0);


  monty.transition()
  .duration(500)
  .style("opacity", 1.0)
  .attr("x", 3/4 * svgWidth + doorWidth/2);

  d3.selectAll('.bigTick').transition().delay(2000)
  .style("opacity", 1.0);
}

function transitionZeroUp(){
  // door 1 goes back to original position
  
  d3.select('#fig1').select("#door_" + playerChoice)
  .transition().duration(500)
  .style("opacity", 1.0).style('fill', selectedColor);
}

function transitionOneDown(){
  // door 1 scales up and moves back
  

  d3.select('#fig1').select("#door_" + playerChoice)
  .transition().duration(500)
  .style("opacity", 1.0).style('fill', selectedColor);

  
}

function transitionOneUp(){
  // prevents door scaling up twice
  d3.select('#fig1').select('#door_' + carReveal).transition().style('opacity', 1)
}

function transitionTwoDown(){
  isRevealed = true
  console.log(isRevealed)

  d3.select('#fig1').select('#door_' + carReveal).transition().style('opacity', 0)

}

function transitionTwoUp(){
  d3.select('#fig1').select('#door_0').transition().style('opacity', 1)
  d3.select('#fig1').select('#door_2').transition().style('opacity', 1)
  d3.select('#animationSvg').transition().style('opacity', 0).remove()
  d3.select('#montyImage').transition().style('opacity', 1)
  d3.selectAll('.bigTick').transition()
  .style("opacity", 1.0);
}

/*
~~~~~~~~~~~~~~~~~~~~~~~~~~
      TRANSITION 3 
~~~~~~~~~~~~~~~~~~~~~~~~~~
*/

// Data generation

var data = []

for(var i = 0; i < 100; i++){
  var sR = Math.floor(Math.random() * 3)
  var cR = Math.floor(Math.random() * 3)

  if(i % 2 == 0){
    var stR = 0
  } else {
    var stR = 1
  }
  data.push({"selected": sR, "car": cR, "stay": stR, "id": i})
}

// Door size and positioning

var simDoorWidth = 25;
var simDoorHeight = simDoorWidth*1.618;
var threeDoorXOffset = 10;
var threeDoorY = 10;

var rectangleData = [
  {"rx": 0, "ry": 0, "height": simDoorHeight, "width": simDoorWidth, "color": doorColor},
  {"rx": 50/1.618, "ry": 0, "height": simDoorHeight, "width": simDoorWidth, "color": doorColor},
  {"rx": 100/1.618, "ry": 0, "height": simDoorHeight, "width": simDoorWidth, "color": doorColor}
];


// Tick size and positioning

function ticks(id){
  for (var i = 0; i < 3; i++){
    d3.select("#group_" + id)
    .append("svg:image")
    .attr('width', simDoorWidth)
    .attr('y', simDoorHeight/2 - simDoorWidth/2)
    .attr("xlink:href", "images/times-circle-regular.svg")
    .attr("id", "tick_" + i)
    .attr("x", i*50 / 1.618)
    .attr("value", i)
    .attr('class', 'tick')
  }
}

/*

transition 3 timing

*/

var durationA = 500;
var durationB = durationA/2;
var totalDuration = durationA*5 + durationB*3;

/*

transition 3 win counters

*/

var swapGameCounter = 0;
var swapWins = 0;
var stayGameCounter = 0;
var stayWins = 0;
var swapWinProb = 0;
var stayWinProb = 0;

function canReveal(selectedDoor, car){
  // Iterate over each door (j) and return the value of the door that can be revealed
  for(var j = 0; j < 3; j++){
    if(j != selectedDoor & j != car){
      return j;
    }
  }
}

function canSwapTo(selectedDoor, revealDoor){
  for(var j = 0; j < 3; j++){
    if(j != selectedDoor & j != revealDoor){
      return j;
    }
  }
}

var swapAnimations;

function animate(index){
  if(index < swapAnimations.length - 1){
      index = index + 1
      return swapAnimations[index]().on("end", function() { animate(index); })
  } else {
      return true
  }
}


function delay() {
  return new Promise(resolve => setTimeout(resolve, totalDuration));
}

async function delayedLog(item) {

  if (document.getElementById('animationSvg') == null){
    return;
  }

  /*
    3 transition offsets
  */

  var widthOffset = 100;

  var widthClassStay = d3.select('figure').node().getBoundingClientRect().width/3 - widthOffset;
  var widthClassSwap = d3.select('figure').node().getBoundingClientRect().width * 2/3 - widthOffset;
  var center = d3.select('figure').node().getBoundingClientRect().width / 2 - widthOffset;
  var startHeight = d3.select('figure').node().getBoundingClientRect().height / 4;
  var finishHeight = d3.select('figure').node().getBoundingClientRect().height * (3 / 4);

  if (item.stay === 1){
    d3.select('#animationSvg').append("g").attr('id', 'group_' + item.id).attr("transform", `translate(${widthClassStay}, ${startHeight})`);
  } else {
    d3.select('#animationSvg').append("g").attr('id', 'group_' + item.id).attr("transform", `translate(${widthClassSwap}, ${startHeight})`);
  }

  ticks(item.id);

  d3.select('#group_' + item.id).selectAll("rect")
    .data(rectangleData)
    .enter()
    .append("rect");

  d3.select('#group_' + item.id).selectAll("rect")
  .attr("id", function (d, g) {return "door_" + g})
  .attr('class', 'door' + item.id)
  .attr("x", function (d) {return d.rx;})
  .attr("y", function (d) {return d.ry;})
  .attr("height", function (d) {return d.height;})
  .attr("width", function (d) {return d.width;})
  .style("fill", function (d) {return d.color;})
  .style('opacity', 0);

  d3.selectAll('.tick').style('opacity', 0)


  d3.select('#group_' + item.id).select('#tick_' + item.car).attr("xlink:href", "images/car-solid.svg").style('opacity', 0);

  var revealDoor = canReveal(item.selected, item.car);

  swapDoor = canSwapTo(item.selected, revealDoor);

  if(item.stay == 0){
    swapAnimations = [
      // fade in items
      function(){
        d3.select('#group_' + item.id).selectAll('.door' + item.id).transition().duration(durationA/1.5).style("opacity", 1);
        d3.select('#group_' + item.id).selectAll('.tick').transition().duration(durationA).style("opacity", 1);
        return d3.select('#group_' + item.id).select('#tick_' + item.car).attr("xlink:href", "images/car-solid.svg").transition().duration(durationA).style("opacity", 1);
      },
      // Turn selected door a color
      function(){ 
        return d3.select('#group_' + item.id).select('#door_' + item.selected).transition().duration(durationA).style("fill", selectedColor) },
      // Reveal a door by fading
      function(){ return d3.select('#group_' + item.id).select('#door_' + revealDoor).transition().duration(durationA).style("opacity", 0) },
      // Switch door colors to signify a swap
      function(){ 
        d3.select('#group_' + item.id).select('#door_' + item.selected).transition().duration(durationB).style("fill", doorColor);
        d3.select('#group_' + item.id).select('#door_' + swapDoor).transition().duration(durationB).style("fill", selectedColor);
        return d3.select('body').transition().duration(durationB).style("opacity", 1) 
      },
      // Fade out all but final result
      function(){
        // Reveal the final selected door
        d3.select('#group_' + item.id).select('#door_' + swapDoor).transition().duration(durationA).style("opacity", 0)
        // All doors fade
        d3.select('#group_' + item.id).selectAll('.door'+item.id).transition().duration(durationA).style("opacity", 0);
        // All ticks fade
        d3.select('#group_' + item.id).selectAll('.tick').transition().duration(durationB).style("opacity", 0);
        // Reveal won item
        return d3.select('#group_' + item.id).select('#tick_' + swapDoor).transition().duration(durationA).style("opacity", 1)
      },
      // Move to center
      function(){ return d3.select('#group_' + item.id).transition().duration(durationA).attr("transform", `translate(${widthClassSwap}, ${finishHeight})`) }, 
      // Fade out
      function(){ return d3.select('#group_' + item.id).transition().duration(durationA).style("opacity", 0) }
    ]
  }else{
    swapAnimations = [
      // fade in items
      function(){
        d3.select('#group_' + item.id).selectAll('.door'+item.id).transition().duration(durationA/1.5).style("opacity", 1);
        d3.select('#group_' + item.id).selectAll('.tick').transition().duration(durationA).style("opacity", 1);
        return d3.select('#group_' + item.id).select('#tick_' + item.car).attr("xlink:href", "images/car-solid.svg").transition().duration(durationA).style("opacity", 1);
      },
      // Turn selected door a color
      function(){ return d3.select('#group_' + item.id).select('#door_' + item.selected).transition().duration(durationA).style("fill", selectedColor) },
      // Reveal a door by fading
      function(){ return d3.select('#group_' + item.id).select('#door_' + revealDoor).transition().duration(durationA).style("opacity", 0) },
      // Reveal the final selected door
      function(){ return d3.select('#group_' + item.id).select('#door_' + item.selected).transition().duration(durationA).style("opacity", 0) },
      // Fade out all but final result
      function(){
        // All doors fade
        d3.select('#group_' + item.id).selectAll('.door'+item.id).transition().duration(durationA).style("opacity", 0);
        // All ticks fade
        d3.select('#group_' + item.id).selectAll('.tick').transition().duration(durationB).style("opacity", 0);
        // Reveal won item
        return d3.select('#group_' + item.id).select('#tick_' + item.selected).transition().duration(durationA).style("opacity", 1)
      },
      function(){ return d3.select('#group_' + item.id).transition().duration(durationA).attr("transform", `translate(${widthClassStay}, ${finishHeight})`) }, 
      function(){ return d3.select('#group_' + item.id).transition().duration(durationA).style("opacity", 0) }
    ]
  }


  animate(-1)

  if(item.stay == 0){
    swapGameCounter = swapGameCounter + 1;
    if (item.car == swapDoor){
      swapWins = swapWins + 1;
    }
  }
  if(item.stay == 1){
    stayGameCounter = stayGameCounter + 1;
    if (item.car == item.selected){
      stayWins = stayWins + 1;
    }
  }

  if(swapGameCounter > 0){
    swapWinProb = swapWins/swapGameCounter;
  }

  if(stayGameCounter > 0){
    stayWinProb = stayWins/stayGameCounter;
  }

  
  
  var pieData = {a: swapWinProb, b: stayWinProb}
  
  
  var pieWidth = 450;
  var pieHeight = 450;
  var pieMargin = 100;
  var pieRadius = Math.min(pieWidth, pieHeight) / 2 - pieMargin

  await delay();
  
  var pieColor = d3.scaleOrdinal()
  .domain(pieData)
  .range(["#98abc5", "#8a89a6"])

  
  var pieChart = d3.pie()
  .value(function(d) {
    return d.value})
    var dataReady = pieChart(d3.entries(pieData))
    
    d3.selectAll('.piePath').remove()
    
    /*
    TODO:
    
    Put in a legend
    
    */
   
   var piY = d3.select('figure').node().getBoundingClientRect().height * (3/4) - 50;
   var piX = d3.select('figure').node().getBoundingClientRect().width /2 - pieMargin/2;

   
   
   d3.select('#animationSvg').select('svg').selectAll('whatever')
   .data(dataReady)
   .enter()
   .append('path').attr('transform', `translate(${piX},${piY})`)
   .attr('class', 'piePath')
   .attr('d', d3.arc()
   .innerRadius(0)
   .outerRadius(pieRadius))
   .attr('fill', function(d){ 
     return(pieColor(d.data.key))
    })
    d3.select('#animationSvg').select('#swapWinCounter').html('Swap win rate: ' + Math.round(swapWinProb*100)+'%')
    d3.select('#animationSvg').select('#stayWinCounter').html('Stay win rate: ' + Math.round(stayWinProb*100)+'%')
    


  }
  
async function processArray(array) {
  for (const item of array) {
    await delayedLog(item);
  }

}

function transitionThreeDown(){

  d3.selectAll('.bigTick')
  .style("opacity", 0);

  swapGameCounter = 0;
  swapWins = 0;
  stayGameCounter = 0;
  stayWins = 0;
  swapWinProb = 0;
  stayWinProb = 0;

  // fading out monty and the doors
  d3.selectAll('rect').transition().style('opacity', 0)
  d3.select('#montyImage').transition().style('opacity', 0)

  // Container
  var svgContainer = d3.select("#fig1")
  .append("svg")
  .attr('id', 'animationSvg')
  .attr('position', 'absolute')
  // .attr("height", 'auto')
  // .attr("width", 'auto');
  // Group titles
  var titleOffset = 100;
  
  var titleHeight = d3.select('figure').node().getBoundingClientRect().height / 5
  var stayTitleX = d3.select('figure').node().getBoundingClientRect().width/3 - titleOffset
  var swapTitleX = d3.select('figure').node().getBoundingClientRect().width * 2/3 - titleOffset

  var stayTitle = d3.select('#animationSvg')
  .append('text')
  .html('STAY')
  .attr('transform', `translate(${stayTitleX}, ${titleHeight})`)
  .attr('class', 'groupTitle')

  /*
    pie chart init
  */

  var pieWidth = 1000;
  var pieHeight = 500;
  var pieMargin = 40;
  var pieX = 1000
  var pieY = 500
  var pieRadius = Math.min(pieWidth, pieHeight) / 2 - pieMargin
  var pie = d3.select('#animationSvg').append('svg')
  .attr('width', pieWidth)
  .attr('height', pieHeight)
  .append('g')
  .attr('transform', `translate(${pieX},${pieY})`)

  /*
    % text
  */

  var winPercentY = d3.select('figure').node().getBoundingClientRect().height * (3/4) + 50
  var winPercentStayX = d3.select('figure').node().getBoundingClientRect().width / 3 - 170
  var winPercentSwapX = d3.select('figure').node().getBoundingClientRect().width * (2/3) - 150

  d3.select('#animationSvg').append('text').attr('id', 'swapWinCounter').attr('transform', `translate(${winPercentSwapX},${winPercentY})`).html('Swap win rate: 0%');
  d3.select('#animationSvg').append('text').attr('id', 'stayWinCounter').attr('transform', `translate(${winPercentStayX},${winPercentY})`).html('Stay win rate: 0%');


  var swapTitle = d3.select('#animationSvg')
  .append('text')
  .html('SWAP')
  .attr('transform', `translate(${swapTitleX}, ${titleHeight})`)
  .attr('visibility', 'visible')
  .attr('class', 'groupTitle')

  var pieTitle = d3.select('#animationSvg')
  .append('text')
  .html('Win proportion: ')
  .attr('transform', `translate(${d3.select('figure').node().getBoundingClientRect().width/2 - 130}, ${titleHeight + 70})`)

  // ["#98abc5", "#8a89a6"]
  var stayLegend = d3.select('#animationSvg')
  .append('rect')
  .attr('width', 50)
  .attr('height', 50)
  .style('fill', '#8a89a6')
  .attr('transform', `translate(${winPercentStayX + 70},${winPercentY+ 20})`);
  
  var swapLegend = d3.select('#animationSvg')
  .append('rect')
  .attr('width', 50)
  .attr('height', 50)
  .style('fill', '#98abc5')
  .attr('transform', `translate(${winPercentSwapX + 70},${winPercentY+ 20})`);

  var swapLegend;



  processArray(data);
}

/*
~~~~~~~~~~~~~~~~~~~~~~~~~~
      TRANSITION 3 END
~~~~~~~~~~~~~~~~~~~~~~~~~~
*/

function transitionThreeUp(){

}

function transitionFourDown(){

}

function transitionEightUp(){
  d3.select('#aniNine').transition().style('opacity', 0).remove()
  d3.select('#montyImage').transition().style('opacity', 0)
}

function transitionNineDown(){
  d3.select('#montyImage').transition().style('opacity', 1)
  d3.select('#animationSvg').transition().style('opacity', 0).remove()

  var figureStats = d3.select('figure').node().getBoundingClientRect()

  var aniNine = d3.select('#fig1')
  .append('svg')
  .attr('id', 'aniNine')
  .attr('width', figureStats.width)
  .attr('height', figureStats.height)
  .attr('position', 'absolute')

  var explainDoorsWidth = figureStats.height/15
  var explainDoorsHeight = 1.618*(explainDoorsWidth)
  var items = d3.select('#aniNine').selectAll('rect').data([0,1,2,3,4,5,6,7,8,9])

  var expTicks = items
    .enter()
    .append("svg:image")
    .attr('width', explainDoorsWidth)
    .attr('y', figureStats.height/2 - explainDoorsHeight)
    .attr("xlink:href", "images/times-circle-regular.svg")
    .attr("id", function(d,i){return "expTick_" + i})
    .attr("x", function(d,i){return (figureStats.width/2 - explainDoorsWidth*10) + (i*50)})
    .attr("y", figureStats.height/2 - explainDoorsHeight/1.2)
    .attr('class', 'expTick')
    .style("opacity", 1);


  var rects = items
  .enter()
  .append('rect')
  .attr('width', explainDoorsWidth)
  .attr('height', explainDoorsHeight)
  .attr('x', function(d,i){return (figureStats.width/2 - explainDoorsWidth*10) + (i*50)})
  .attr('y', figureStats.height/2 - explainDoorsHeight)
  .attr('id', function(d,i){return 'expDoor_' + i})



  d3.select('#expDoor_0')
  .transition()
  .duration(2000)
  .delay(1000)
  .style('fill', selectedColor)

  d3.select('#expDoor_1')
  .transition()
  .duration(2000)
  .delay(2000)
  .style('opacity', 0)
  d3.select('#expDoor_2')
  .transition()
  .duration(2000)
  .delay(2500)
  .style('opacity', 0)
  d3.select('#expDoor_3')
  .transition()
  .duration(2000)
  .delay(3000)
  .style('opacity', 0)
  d3.select('#expDoor_4')
  .transition()
  .duration(2000)
  .delay(3500)
  .style('opacity', 0)
  d3.select('#expDoor_5')
  .transition()
  .duration(2000)
  .delay(4000)
  .style('opacity', 0)
  d3.select('#expDoor_6')
  .transition()
  .duration(2000)
  .delay(4500)
  .style('opacity', 0)
  d3.select('#expDoor_7')
  .transition()
  .duration(2000)
  .delay(5000)
  .style('opacity', 0)
  d3.select('#expDoor_8')
  .transition()
  .duration(2000)
  .delay(5500)
  .style('opacity', 0)

}

function transitionTenDown(){

  d3.select('#aniNine').transition().style('opacity', 0).remove()

  d3.selectAll('.bigTick')
  .style("opacity", 1);



  // fading out monty and the doors
  d3.selectAll('rect').transition().style('opacity', 1)
  d3.select('#fig1').select('#door_' + carReveal).transition().style('opacity', 0)
  d3.select('#montyImage').transition().style('opacity', 1)

  d3.selectAll('.mainDoors')
    .on("click", function(d, i){

      return 
    });

  d3.select('#bigtick_' + carChoice).attr("xlink:href", "images/car-solid.svg")

  d3.select('#fig1').select('#door_' + playerChoice).transition().delay(1000).duration(2000).style('opacity', 0)
  d3.select('#fig1').select('#door_' + carChoice).transition().delay(3000).duration(2000).style('opacity', 0)
  
  if(playerChoice == carChoice){
    d3.select('#outcome').append('text').html('Congratulations! You won a brand new car!')
  } else {
    d3.select('#outcome').append('text').html('Unfortunately you picked a dud, but you can always refresh the page and play again!')
  }

}

// kick things off
init();