/*
   De eerste interactie is al voor jullie uitgewerkt
   Als je op het 12e linkje klikt (“Interaction”), springt deze omhoog
*/

// Stap 1: selecteer het 12e linkje, en sla deze op in een variabele
const parent = document.querySelector('section')
const number = parent.childElementCount
const allButtons = document.querySelectorAll("a");

// Stap 2: voeg de (click) event listener toe aan de link, met een callback functie

// Deze jumpHandler functie staat klaar voor als we 'm aanroepen; deze wordt dus
// _niet_ meteen bij het laden van de pagina aangeroepen
const animationNames = ["bibber", "stepper", "sadness", "glowow", "joe", "joe", "joe", "joe", "joe", "joe", "joe", "jump"];

// In dit geval wordt de jumpHandler functie aangeroepen, zodra je op het linkje klikt
allButtons.forEach((button, i) => {
  const eventType = i % 3 === 0 
    ? "mouseover"
    : i % 3 === 1
    ? "click"
    : "mouseleave";
  button.addEventListener(eventType, () => {
    button.classList.toggle(animationNames[i]);
    console.log(`Triggered ${eventType} for button ${i}`);
  })
  button.addEventListener('animationiteration', () => {

  })
  // Extraatje, waardoor de class weer weggehaald wordt zodra de animatie afgelopen is
  button.addEventListener("animationend", () => {
    button.classList.remove(animationNames[i]);
  })
  // console.log(button);
})
// interaction12.addEventListener('click', jumpHandler)
let i = allButtons.length - 1
document.addEventListener("keydown", (e) => {
if(e.key === "Backspace") allButtons[i].remove();
console.log(allButtons[i]);
console.log(number);


  
})
// Ga zelf verder met de overige elementen, aan de hand van de instructies
// Maak bijvoorbeeld een bibber animatie als je op iets klikt

// Stap 1: querySelector
// let bibberLink = document.querySelector...

// Stap 2: addEventListener
// bibberLink.addEventListener...

// Stap 3: (Callback functie met) classList (.toggle(), .add(), etc.)
// bibberLink.classList.toggle...
