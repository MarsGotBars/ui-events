const heading = document.querySelector("h1");
const allButtons = document.querySelectorAll("a");
const glow = document.querySelector(".glow");
// added multiple in case I want to add more...
const animations = [
  { name: "bibber", event: "mouseenter" },
  { name: "stepper", event: "click" },
  { name: "sadness", event: "mouseleave" },
  { name: "glowow", event: "mouseover" },
  { name: "toggle", event: "mouseleave" },
  { name: "wtfhello", event: "mouseleave" },
  { name: "joe", event: "mouseover" },
  { name: "joe", event: "click" },
  { name: "joe", event: "mouseleave" },
  { name: "joe", event: "mouseover" },
  { name: "joe", event: "click" },
  { name: "jump", event: "mouseenter" },
];

let iterationCount = 0;

let sprintBool = true;

let mouseX = 0,
  mouseY = 0;
let isTracking = false;
let trackingElement = null;

function trackMouse() {
  if (trackingElement) {
    // Trying out setProperty to change the pos
    document.documentElement.style.setProperty("--mouseX", `${mouseX}px`);
    document.documentElement.style.setProperty("--mouseY", `${mouseY}px`);
  }

  if (isTracking) {
    // 60fps tracking with requestAnimationFrame
    requestAnimationFrame(trackMouse);
  }
}

allButtons.forEach((button, i) => {
  // Skip the loop if there are more buttons than animations
  if (i >= animations.length) return;
  // destructuring object for use in functions and such
  const { name, event } = animations[i];

  // Handle "mouseover" separately for tracking mouse position with RAF
  if (event === "mouseover" && name === "glowow") {
    button.addEventListener("mouseover", () => {
      trackingElement = button; // Start tracking this button
      button.classList.add(name); // Add animation class to button

      if (!isTracking) {
        isTracking = true;
        requestAnimationFrame(trackMouse); // Start the RAF loop
      }
    });

    button.addEventListener("mousemove", (e) => {
      const rect = button.getBoundingClientRect(); // Get element's position relative to the viewport
      mouseX = e.clientX - rect.left; // Subtract the element's left offset to get mouseX relative to the element
      mouseY = e.clientY - rect.top; // Subtract the element's top offset to get mouseY relative to the element
    });

    button.addEventListener("mouseleave", () => {
      trackingElement = null; // Stop tracking
      button.classList.remove(name); // Remove animation class
      isTracking = false; // Stop RAF loop
    });
  } else {
    // Handle other events the normal way
    button.addEventListener(event, () => {
      button.classList.toggle(name);
      console.log(`Triggered ${event} for button ${i}`);
      button.addEventListener('animationiteration', (e)=> {
        const targetCount = 5;
        iterationCount++
        console.log(e);
        
        if(iterationCount >= targetCount){
          console.log('hey');
          
          button.classList.add('cold')
        }
        if(iterationCount >= targetCount * 5){
          button.classList.remove('cold')
          button.classList.add('frozen')
        }
        
      })
      // Specifically for element 4 (5 - 1)
      if (i === 4) {
        if (sprintBool === true) {
          button.innerText = "come back!";
        } else button.innerText = "😎";
        console.log(sprintBool);
        sprintBool = !sprintBool;
      }
    });
  }

  button.addEventListener("animationend", () => {
    button.classList.remove(name); // Clean up animation class after animation ends
  });
});

// Handling Backspace key press to remove elements
let i = allButtons.length - 1;
document.addEventListener("keydown", (e) => {
  if (e.key === "Backspace") {
    // Iterate backwards through non-hidden buttons
    for (let j = i; j >= 0; j--) {
      if (!allButtons[j].classList.contains("hidden")) {
        allButtons[j].classList.add("hidden");
        setTimeout(() => {
          allButtons[j].remove();
          const updatedAllButtons = document.querySelectorAll("a");
          console.log(updatedAllButtons.length); // Log updated buttons length

          if (updatedAllButtons.length === 0) {
            heading.classList.add("freedom"); // Apply "freedom" class if no buttons left
            console.log("All buttons removed, heading updated.");
          }
        }, 300);
        i = j;
        break;
      }
    }
    console.log(allButtons[i]); // Log the last button
    console.log(allButtons.length); // Log the total number of buttons
  }
});
