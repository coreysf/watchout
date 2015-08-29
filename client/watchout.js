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
    highScore: 0
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
          var detectCollision = function() {
            var distanceX = d.x - d3.select("#player").attr("cx");
            var distanceY = d.y - d3.select("#player").attr("cy");
            var totalDistance = Math.sqrt(Math.pow(distanceX, 2) + Math.pow(distanceY, 2));
            if (totalDistance < radius + enemyRadius) {
              if (gameStats.score > gameStats.highScore) {
                gameStats.highScore = gameStats.score;
              }
              gameStats.score = 0;
            }
          };
          
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
      .attr("stroke", "black")
      .transition()
      .tween("text", function() {
        var i = XXX;
          return XXX;
          };
      });

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
    .attr("fill", "#ff6600")
    .attr("stroke", "black");
  })();


}).call(this);







