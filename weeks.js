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
    console.log(cookie)
    generateWeeks(new Date())
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
  var title = document.getElementById("title")
  title.className += " active"
  var dobInputGroup = document.getElementById("dobInputGroup")
  dobInputGroup.className += " active"

  while(container.hasChildNodes()){
    container.removeChild(container.lastChild);
  }

  var weeksAlive = calculateWeeksAlive(birthDate)

  var lastYearSet = null
  for (i = 0; i < window.weeksLifespan; i++) {
    var weekBlock = document.createElement("li")
    weekBlock.className = "week"

    if (weeksAlive && i <= weeksAlive) {
      weekBlock.className += " active"
    }

    var birth = moment(birthDate)
    if (i == 0) {
      weekBlock.dataset.weekOfYear = birth.week()
    } else {
      var allWeeks = document.getElementsByClassName("week")
      weekBlock.dataset.weekOfYear = parseInt(allWeeks[allWeeks.length-1].dataset.weekOfYear) + 1
    }

    if (lastYearSet) {
      var weeksInYear = moment(lastYearSet, "YYYY").weeksInYear()
    } else {
      var weeksInYear = birth.weeksInYear()
    }

    if (weekBlock.dataset.weekOfYear > weeksInYear) {
      weekBlock.dataset.weekOfYear = 1
      weekBlock.className += " newYear"
      weekBlock.dataset.year = birth.add(i+1, 'weeks')._d.getFullYear()
      lastYearSet = weekBlock.dataset.year
    }

    window.container.appendChild(weekBlock)
    if (weekBlock.dataset.weekOfYear == 1 && weekBlock.className.includes("active")) {
      weekBlock.innerHTML = `<div class='yearToolTip' id='yearToolTip'><span>${weekBlock.dataset.year}</span></div>`
    }
  }
  endOfLifeYears = document.createTextNode("90 years")
  window.container.appendChild(endOfLifeYears)
}

var setDate = function(e) {
  var birthDate = new Date(e.target.value)
  console.log(birthDate)

  setCookie('birthDate', birthDate)
  generateWeeks(birthDate)
}

dateInput.onchange = function(e) { window.setTimeout(setDate(e), 0) }

window.onload = function() {
  document.getElementById("body").style.opacity = 1
}
