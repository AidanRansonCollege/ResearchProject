const goal = document.getElementById("goal");

var availableChar = ['A', 'B', 'C','D', 'E', 'F'];

var buttons = document.getElementsByClassName("button")

for(let i = 0; i < buttons.length; i++){
    randomChar = Math.floor(Math.random() * availableChar.length)
    buttons[i].textContent = availableChar[randomChar];
    availableChar.splice(randomChar, 1);
}

var trueButtonIndex = Math.floor(Math.random() * buttons.length)
var goalChar = Math.floor(Math.random() * availableChar.length);
var trueButton = buttons[trueButtonIndex];

trueButton.textContent = availableChar[goalChar];
goal.textContent = availableChar[goalChar];