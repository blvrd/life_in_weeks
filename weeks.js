var container = document.getElementById("weeks")

for (i = 0; i < 4693; i++) {
  var weekBlock = document.createElement("li")
  weekBlock.className = "week"
  if (i <= 1095) {
    weekBlock.className += " active"
  }
  container.appendChild(weekBlock)
}
