function getCookie (cookieName, callback){
    chrome.cookies.get({
      'url':'http://www.google.com',
      'name':cookieName
    },
    function(data){
        callback(data);
    });
}

window.container = document.getElementById("weeks");
getCookie("birthDate", function(cookie) {
  generateWeeks(new Date(cookie.value))
})
window.currentDate = new Date();
window.weeksLifespan = 4693 // 90 years
window.dateInput = document.getElementById("dob")

var calculateWeeksAlive = function(birthDate) {
  if (birthDate.toString().length > 1) {
    return parseInt((window.currentDate-birthDate)/(1000*60*60*24*7).toFixed())
  }
}

var generateWeeks = function(birthDate) {
  while(container.hasChildNodes()){
    container.removeChild(container.lastChild);
  }

  var weeksAlive = calculateWeeksAlive(birthDate)

  for (i = 0; i < weeksLifespan; i++) {
    var weekBlock = document.createElement("li")
    weekBlock.className = "week"
    if (weeksAlive && i <= weeksAlive) {
      weekBlock.className += " active"
    }
    container.appendChild(weekBlock)
  }
}

var setDate = function(e) {
  var birthDate = new Date(e.target.value)
  chrome.cookies.set({ url: 'http://www.google.com', name: 'birthDate', value: birthDate.toString() })
  generateWeeks(birthDate)
}

dateInput.onchange = setDate

