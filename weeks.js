window.container = document.getElementById("weeks");
window.currentDate = new Date();
window.weeksLifespan = 4693 // 90 years
window.dateInput = document.getElementById("dob")


const calculateWeeksAlive = birthDate => {
  if (birthDate.toString().length > 1) {
    return parseInt((window.currentDate-birthDate)/(1000*60*60*24*7).toFixed())
  }
};

const generateWeeks = birthDate => {
  const title = document.getElementById("title");
  title.className += " active"
  const dobInputGroup = document.getElementById("dobInputGroup");
  dobInputGroup.className += " active"

  while(container.hasChildNodes()){
    container.removeChild(container.lastChild);
  }

  const weeksAlive = calculateWeeksAlive(birthDate);

  let lastYearSet = null;
  for (i = 0; i < window.weeksLifespan; i++) {
    const weekBlock = document.createElement("li");
    weekBlock.className = "week"

    if (weeksAlive && i <= weeksAlive) {
      weekBlock.className += " active"
    }

    const birth = moment(birthDate);
    if (i == 0) {
      weekBlock.dataset.weekOfYear = birth.week()
    } else {
      const allWeeks = document.getElementsByClassName("week");
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
      weekBlock.dataset.year = birth.add(i+1, "weeks")._d.getFullYear()
      lastYearSet = weekBlock.dataset.year
    }

    window.container.appendChild(weekBlock)
    if (weekBlock.dataset.weekOfYear == 1 && weekBlock.className.includes("active")) {
      weekBlock.innerHTML = `<div class="yearToolTip" id="yearToolTip"><span>${weekBlock.dataset.year}</span></div>`
    }
  }
  endOfLifeYears = document.createTextNode("90 years")
  window.container.appendChild(endOfLifeYears)
};

const setDate = (e) => {
  const birthDate = new Date(e.target.value);

  localStorage.setItem("birthDate", birthDate)
  generateWeeks(birthDate)
};

if (typeof browser === "undefined") {
  dateInput.onchange = setDate
} else {
  dateInput.onchange = e => { window.setTimeout(setDate(e), 0) }
}

window.onload = () => {
  document.getElementById("body").style.opacity = 1
}

const savedBirthdate = localStorage.getItem("birthDate")

if (savedBirthdate) {
  const birthDate = new Date(savedBirthdate);
  dateInput.value = birthDate.toISOString().slice(0, 10)
  generateWeeks(birthDate)
} else {
  generateWeeks(new Date())
}
