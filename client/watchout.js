(function() {

  window.enemies = [];
  window.players = [];
  var gameOptions = {
    height: 400,
    width: 700,
    nEnemies: 30,
    padding: 20
  };

  var gameStats = {
    score: 0,
    highScore: 0,
    collisions: 0
  };

  // var axes = {
  //   x: d3.scale.linear().domain([0, 100]).range([0, gameOptions.width]),
  //   y: d3.scale.linear().domain([0, 100]).range([0, gameOptions.height])
  // };

  var gameBoard = d3.select(".container").append("svg:svg").attr("height", gameOptions.height).attr("width", gameOptions.width);

  var updateCurrentScore = function() {
    return d3.select("#currentScore").text(gameStats.score.toString());
  };

  var updateHighScore = function() {
    return d3.select("#bestScore").text(gameStats.highScore.toString());
  };

  var updateCollisions = function() {
    return d3.select("#numCollisions").text(gameStats.collisions.toString());
  };

  // var increaseScore = function() {
  //   gameStats.score++;

  // };

  setInterval(function() {
    gameStats.score++;
    updateCurrentScore();
    updateHighScore();
  }, 50);

  var Enemy = function(id) {
    this.id = id;
    this.x = Math.random() * 700;
    this.y = Math.random() * 400;
  };

  var move = function() {
      return d3.selectAll("circle")
        .data(window.enemies)
        .transition()
        .duration(1000)
        .tween("circle", function(d) {
          var detectCollision = function(data) {
            // console.log(d3.select("#player").attr("cx"));
            console.log("score: "+gameStats.score);
            console.log("d.x: " + d.x);
            console.log("d.y: " + d.y);
            var distanceX = d.x - d3.select("#player").attr("cx");
            var distanceY = d.y - d3.select("#player").attr("cy");
            var totalDistance = Math.sqrt(Math.pow(distanceX, 2) + Math.pow(distanceY, 2));
            console.log("total distance: " + totalDistance);
            if (totalDistance < radius + enemyRadius) {
              gameStats.collisions++;
              updateCollisions();
              if (gameStats.score > gameStats.highScore) {
                gameStats.highScore = gameStats.score;
                // updateHighScore();
              }
              gameStats.score = 0;
              // updateCurrentScore();
            }
          };
          detectCollision(d);
          
          
          return;
        })
        .attr("cx", function() {return Math.random() * 700;})
        .attr("cy", function() {return Math.random() * 400;});
  };

  var createEnemies = (function() {
    for (var i = 0; i < gameOptions.nEnemies; i++) {
      window.enemies.push(new Enemy(i));
    }
    return d3.select("svg").selectAll("circle")
      .data(window.enemies)
      .enter()
      .append("svg:circle")
      .attr("cx", function(d) {return d.x})
      .attr("cy", function(d){return d.y})
      .attr("r", 10)
      .attr("fill", "black")
      .attr("stroke", "black");

  })();

  setInterval(move, 2000);

  var Player = function() {
    this.x = gameOptions.width / 2;
    this.y = gameOptions.height / 2;
  };

  Player.prototype.render = function(x, y) {

  };

  var detectCollision = function() {
    v = player1.x - this.x;

    
  };


  var dragmove = function(d) {
    d3.select(this)
        .attr("cx", d.x = Math.max(radius, Math.min(gameOptions.width - radius, d3.event.x)))
        .attr("cy", d.y = Math.max(radius, Math.min(gameOptions.height - radius, d3.event.y)));
  };

  var drag = d3.behavior.drag()
      .on("drag", dragmove);

  var radius = 8;
  var enemyRadius = 10;

  var player1 = new Player();

  var createPlayer = (function() {
    window.players.push(player1);

    return d3.select("svg").selectAll("#player")
    .data(window.players)
    .enter()
    .append("svg:circle")
    .call(drag)
    .attr("cx", function(d) {return d.x})
    .attr("cy", function(d){return d.y})
    .attr("r", radius)
    .attr("id", "player")
    .attr("fill", "#ff6600")
    .attr("stroke", "black");
  })();


}).call(this);







