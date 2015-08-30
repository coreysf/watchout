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


  // var detectCollision = function(d) {
  //     // var oldX = d.x;
  //     // var oldY = d.y;
  //     // d.collisionStatus = false;
      
  //     return function(time) {
  //       var distanceX = (d.x - d3.select("#player").attr("cx")) * time;
  //       var distanceY = (d.y - d3.select("#player").attr("cy")) * time;
  //       var totalDistance = Math.sqrt(Math.pow(distanceX, 2) + Math.pow(distanceY, 2));
  //       if (totalDistance < radius + enemyRadius && d.collisionStatus === false) {
  //         d.collisionStatus = true;
  //         if (gameStats.score > gameStats.highScore) {
  //           gameStats.highScore = gameStats.score;
  //         }
  //         gameStats.score = 0;
  //         gameStats.collisions++;
  //       } 
  //       // else {
  //       //   if (d.collisionStatus === true) {
  //       //     d.collisionStatus = false;
  //       //   }
  //       // }
  //     };
  // };

  var detectCollision = function(d) {
    for (var i = 0; i < window.enemies.length; i++) {
      var distanceX = window.enemies[i].x - d3.select("#player").attr("cx");
      var distanceY = window.enemies[i].y - d3.select("#player").attr("cy");
      var totalDistance = Math.sqrt(Math.pow(distanceX, 2) + Math.pow(distanceY, 2));
      if (totalDistance < radius + enemyRadius) {
        window.enemies[i].collisionStatus = true;
        if (gameStats.score > gameStats.highScore) {
          gameStats.highScore = gameStats.score;
        }
        gameStats.score = 0;
      } else {
        if (window.enemies[i].collisionStatus === true) {
          gameStats.collisions++;
          window.enemies[i].collisionStatus = false;
        }
      }
    }
  };


  var Enemy = function(id) {
    this.id = id;
    this.collisionStatus = false;
    this.x = Math.random() * 700;
    this.y = Math.random() * 400;
  };


  var move = function() {
      return d3.select("svg").selectAll(".enemy")
        .data(window.enemies)
        .transition()
        .duration(1000)
        // .tween(".enemy", detectCollision)
        .attr("x", function(d) {
          d.x = Math.random() * 700;
          return d.x;
        })
        .attr("y", function(d) {
          d.y = Math.random() * 400;
          return d.y;
        });
        // .style({"-ms-transform": "rotate(36deg)", 
        // "-webkit-transform": "rotate(36deg)",
        // "transform": "rotate(36deg)",
        // "-ms-transition": "1s transform linear",
        // "-webkit-transition": "1s transform linear; -0- transition: 5s transform linear",
        // "transition": "1s transform linear",
        // "-ms-transform-origin": "50% 50%",
        // "-webkit-transform-origin": "50% 50%",
        // "transform-origin": "50% 50%"});
  };

  var createEnemies = (function() {
    for (var i = 0; i < gameOptions.nEnemies; i++) {
      window.enemies.push(new Enemy(i));
    }
    return d3.select("svg").selectAll("image")
      .data(window.enemies)
      .enter()
      .append("image")
      .classed("enemy", true)
      .attr("xlink:href", "./images/ninjastar.png")
      .attr("width", 40)
      .attr("height", 40)
      .attr("x", function(d) {return d.x})
      .attr("y", function(d){return d.y})
      .attr("r", 10);
      // .attr("class", "enemy")
      // .attr("fill", "black")
      // .attr("stroke", "black");

  })();
  d3.timer(detectCollision);

  setInterval(move, 2000);

  var Player = function() {
    this.x = gameOptions.width / 2;
    this.y = gameOptions.height / 2;
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
    .attr("stroke", "#ff6600");
  })();

  setInterval(function() {
    gameStats.score++;
    updateCurrentScore();
    updateHighScore();
    detectCollision();
    updateCollisions();
  }, 50);

}).call(this);







