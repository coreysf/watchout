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

  var axes = {
    x: d3.scale.linear().domain([0, 100]).range([0, gameOptions.width]),
    y: d3.scale.linear().domain([0, 100]).range([0, gameOptions.height])
  };

  var gameBoard = d3.select(".container").append("svg:svg").attr("height", gameOptions.height).attr("width", gameOptions.width);

  var updateCurrentScore = function() {
    return d3.select("#currentScore").text(gameStats.score.toString());
  };

  var updateHighScore = function() {
    return d3.select("#bestScore").text(gameStats.highScore.toString());
  };

  var Enemy = function(id) {
    this.id = id;
    this.x = Math.random() * 100;
    this.y = Math.random() * 100;
  };

  Enemy.prototype.move = function() {

  };

  var createEnemies = function() {
    for (var i = 0; i < gameOptions.nEnemies; i++) {
      window.enemies.push(new Enemy(i));
    }
    return d3.select("svg").selectAll("circle").data(window.enemies).enter().append("circle").attr("cx", function(d) {return d.x}).attr("cy", function(d){return d.y}).attr("r", 25).attr("fill", "black").attr("stroke", "red");
  };

  var Player = function() {
    this.x = gameOptions.height * 0.5;
    this.y = gameOptions.width * 0.5;
  };

  Player.prototype.render = function(x, y) {

  };

  Player.prototype.detectCollision = function() {

    setTimeout(this.detectCollision, 25);
  };

  var createPlayer = function() {
    window.players.push(new Player());
  };

  createEnemies();

}).call(this);







