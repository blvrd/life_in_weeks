var container = document.getElementById("weeks");
var birthDate = new Date("1994", "05", "29");
var currentDate = new Date();
var weeksAlive = parseInt((currentDate-birthDate)/(1000*60*60*24*7).toFixed())

for (i = 0; i < 4693; i++) {
  var weekBlock = document.createElement("li")
  weekBlock.className = "week"
  if (i <= weeksAlive) {
    weekBlock.className += " active"
  }
  container.appendChild(weekBlock)
}
