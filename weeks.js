var container = document.getElementById("weeks");
var birthDate = null
var currentDate = new Date();
var weeksLifespan = 4693 // 90 years
var dateInput = document.getElementById("dob")

var calculateWeeksAlive = function() {
  window.weeksAlive = parseInt((currentDate-birthDate)/(1000*60*60*24*7).toFixed())
}

var setDate = function(e) {
  window.birthDate = new Date(e.target.value)
  calculateWeeksAlive()
  generateWeeks()
}

dateInput.onchange = setDate

var generateWeeks = function() {
  while(container.hasChildNodes()){
    container.removeChild(container.lastChild);
  }

  for (i = 0; i < weeksLifespan; i++) {
    var weekBlock = document.createElement("li")
    weekBlock.className = "week"
    if (i <= weeksAlive) {
      weekBlock.className += " active"
    }
    container.appendChild(weekBlock)
  }
}

generateWeeks()
