function getCookie(cookieName, callback) {
    chrome.cookies.get({
      'url':'http://www.google.com',
      'name':cookieName
    },
    function(data){
        callback(data);
    });
}

function removeCookie(cookieName, callback) {
    chrome.cookies.remove({
      'url':'http://www.google.com',
      'name':cookieName
    },
    function(data){
        callback(data);
    });
}

function setCookie(cookieName, value, callback) {
  today = new Date()
  futureDate = today.setDate(today.getDate() + 365)

  chrome.cookies.set({
    url: 'http://www.google.com',
    name: cookieName,
    value: value.toString(),
    expirationDate: futureDate
  })
}

window.container = document.getElementById("weeks");
window.currentDate = new Date();
window.weeksLifespan = 4693 // 90 years
window.dateInput = document.getElementById("dob")

getCookie("birthDate", function(cookie) {
  if (cookie === null || cookie.value === "Invalid Date") {
    showInstructions()
  } else {
    var birthDate = new Date(cookie.value)
    dateInput.value = birthDate.toISOString().slice(0, 10)
    generateWeeks(birthDate)
  }
})


var calculateWeeksAlive = function(birthDate) {
  if (birthDate.toString().length > 1) {
    return parseInt((window.currentDate-birthDate)/(1000*60*60*24*7).toFixed())
  }
}

var generateWeeks = function(birthDate) {
  while(container.hasChildNodes()){
    container.removeChild(container.lastChild);
  }

  showDescription()
  var weeksAlive = calculateWeeksAlive(birthDate)

  for (i = 0; i < window.weeksLifespan; i++) {
    var weekBlock = document.createElement("li")
    weekBlock.className = "week"

    if (weeksAlive && i <= weeksAlive) {
      weekBlock.className += " active"
    }

    if (i === weeksAlive) {
      weekBlock.className += " pulse"
    }
    window.container.appendChild(weekBlock)
  }
  endOfLifeYears = document.createTextNode("90 years")
  window.container.appendChild(endOfLifeYears)
}

var setDate = function(e) {
  var birthDate = new Date(e.target.value)

  setCookie('birthDate', birthDate)
  generateWeeks(birthDate)
}

var showInstructions = function() {
  var instructions = document.getElementById("instructions")
  var description = document.getElementById("description")

  instructions.className = ""
  description.className += " hidden"
}

var showDescription = function() {
  var instructions = document.getElementById("instructions")
  var description = document.getElementById("description")

  instructions.className += " hidden"
  description.className = ""
}

dateInput.onchange = setDate

