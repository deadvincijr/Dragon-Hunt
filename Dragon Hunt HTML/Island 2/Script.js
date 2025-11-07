// This is a helper function to check if two rectangle objects are overlapping
// We put it outside the event listener so it's only defined once.
function areRectsOverlapping(r1, r2) {
  return !(
    r1.right < r2.left ||
    r1.left > r2.right ||
    r1.bottom < r2.top ||
    r1.top > r2.bottom
  );
}

document.addEventListener('keydown', function(event) {
  
  const key = event.key.toLowerCase();
  const yourperson = document.getElementById('you');
  
  // Get all elements with the class 'obstacles'
  // This returns a NodeList (like an array)
  const obstacles = document.querySelectorAll('.obstacles'); 

  const logPosition = function() {
    const style = window.getComputedStyle(yourperson);
    const yourxposition = style.getPropertyValue('left');
    const youryposition = style.getPropertyValue('bottom');
    console.log(yourxposition + youryposition);
  };

  // --- Get player's current position BEFORE any checks ---
  const playerRect = yourperson.getBoundingClientRect();
  
  // --- Get relic's position ---
  const relic = document.getElementById('orangeamulet'); 
  let relicRect = null;
  if (relic) {
      relicRect = relic.getBoundingClientRect();
  }

  // --- Get sailboat's position ---
  const sailboat = document.getElementById('sailboat'); 
  let sailboatRect = null;
  if (sailboat) {
      sailboatRect = sailboat.getBoundingClientRect();
  }


  if (key === 'd') {
    console.log('The "d" key was pressed!');
    
    // 1. Define the player's future position
    const futureRect = {
      top: playerRect.top,
      bottom: playerRect.bottom,
      left: playerRect.left + 2,
      right: playerRect.right + 2
    };

    // 2. Check if the future position hits any obstacle
    let canMove = true;
    for (const obstacle of obstacles) {
      const obstacleRect = obstacle.getBoundingClientRect();
      if (areRectsOverlapping(futureRect, obstacleRect)) {
        canMove = false;
        break; // Found a collision, no need to check others
      }
    }
    
    // --- Check for relic collision (does NOT block movement) ---
    if (relicRect && areRectsOverlapping(futureRect, relicRect)) {
        alert("You found the orange dragon amulet");
        console.log("Touching orange amulet!"); // Example action
    }

    // --- Check for sailboat collision (does NOT block movement) ---
    if (sailboatRect && areRectsOverlapping(futureRect, sailboatRect)) {
        alert("you have found the sailboat");
        console.log("Touching sailboat!"); // Example action
    }

    // 3. Check boundaries (like you had before)
    const style = window.getComputedStyle(yourperson);
    const currentX = parseInt(style.getPropertyValue('left'), 10);
    
    // 4. Only move if boundary is OK AND we can move
    if (currentX + 2 <= 1290 && canMove) {
      $('#you').animate({
          left: '+=2px' 
      }, 0, logPosition);
    }

  } else if (key === 'a') {
    console.log('The "a" key was pressed!');
    
    const futureRect = {
      top: playerRect.top,
      bottom: playerRect.bottom,
      left: playerRect.left - 2,
      right: playerRect.right - 2
    };

    let canMove = true;
    for (const obstacle of obstacles) {
      const obstacleRect = obstacle.getBoundingClientRect();
      if (areRectsOverlapping(futureRect, obstacleRect)) {
        canMove = false;
        break;
      }
    }
    
    // --- Check for relic collision (does NOT block movement) ---
    if (relicRect && areRectsOverlapping(futureRect, relicRect)) {
        alert("You found the orange dragon amulet");
        console.log("Touching orange amulet!"); // Example action
    }

    // --- Check for sailboat collision (does NOT block movement) ---
    if (sailboatRect && areRectsOverlapping(futureRect, sailboatRect)) {
        alert("you have found the sailboat");
        console.log("Touching sailboat!"); // Example action
    }
    
    const style = window.getComputedStyle(yourperson);
    const currentX = parseInt(style.getPropertyValue('left'), 10);

    if (currentX - 2 > 0 && canMove) {
      $('#you').animate({
          left: '-=2px'
      }, 0, logPosition);
    }
  } else if (key === 's') {
    console.log('The "s" key was pressed!');
    
    // Moving "down" on screen increases the 'top' value
    const futureRect = {
      top: playerRect.top + 2,
      bottom: playerRect.bottom + 2,
      left: playerRect.left,
      right: playerRect.right
    };

    let canMove = true;
    for (const obstacle of obstacles) {
      const obstacleRect = obstacle.getBoundingClientRect();
      if (areRectsOverlapping(futureRect, obstacleRect)) {
        canMove = false;
        break;
      }
    }
    
    // --- Check for relic collision (does NOT block movement) ---
    if (relicRect && areRectsOverlapping(futureRect, relicRect)) {
        alert("You found the orange dragon amulet");
        console.log("Touching orange amulet!"); // Example action
    }

    // --- Check for sailboat collision (does NOT block movement) ---
    if (sailboatRect && areRectsOverlapping(futureRect, sailboatRect)) {
        alert("you have found the sailboat");
        console.log("Touching sailboat!"); // Example action
    }
    
    const style = window.getComputedStyle(yourperson);
    const currentY = parseInt(style.getPropertyValue('bottom'), 10);

    if (currentY - 2 >= 0 && canMove) {
      $('#you').animate({
          bottom: '-=2px'
      }, 0, logPosition);
    }
  } else if (key === 'w') {
    console.log('The "w" key was pressed!');

    // Moving "up" on screen decreases the 'top' value
    const futureRect = {
      top: playerRect.top - 2,
      bottom: playerRect.bottom - 2,
      left: playerRect.left,
      right: playerRect.right
    };

    let canMove = true;
    for (const obstacle of obstacles) {
      const obstacleRect = obstacle.getBoundingClientRect();
      if (areRectsOverlapping(futureRect, obstacleRect)) {
        canMove = false;
        break;
      }
    }
    
    // --- Check for relic collision (does NOT block movement) ---
    if (relicRect && areRectsOverlapping(futureRect, relicRect)) {
        alert("You found the orange dragon amulet");
        console.log("Touching orange amulet!"); // Example action
    }

    // --- Check for sailboat collision (does NOT block movement) ---
    if (sailboatRect && areRectsOverlapping(futureRect, sailboatRect)) {
        alert("you have found the sailboat");
        console.log("Touching sailboat!"); // Example action
    }

    const style = window.getComputedStyle(yourperson);
    const currentY = parseInt(style.getPropertyValue('bottom'), 10);

    if (currentY + 2 <= 790 && canMove) {
      $('#you').animate({
          bottom: '+=2px'
      }, 0, logPosition);
    }
  }
});