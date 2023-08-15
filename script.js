const game = document.getElementById('game');
const leo = document.getElementById('leo');
const monster = document.getElementById('monster');
const counts = document.getElementById('counts');

document.addEventListener('keydown', function (event) {
  if (event.ctrlKey) {
    jump();
  }
});
document.addEventListener('mousedown', function (event) {
  jump();
});
/*const eventList = ['keydown', 'mousedown'];
eventList.forEach(function (event) {
  document.addEventListener(event, function () {
    jump();
  });
});*/

// delete jump after 700 ms (one time)
function jump() {
  if (leo.classList != 'jump') {
    leo.classList.add('jump');
  }
  setTimeout(function () {
    leo.classList.remove('jump');
  }, 700);
}

function randomIntFromInterval(min, max) {
  // generate min and max included (amount of monsters)
  return Math.floor(Math.random() * (max - min + 1) + min);
}

let monsterLeft = '';
let leoTop = '';
let goodJumps = 0;

function jumpCount() {
  return ++goodJumps;
}

setInterval(function () {
  counts.innerHTML = 'Рекорд: ' + jumpCount();
}, 2000);

let isAlive = setInterval(function () {
  if (monsterLeft === '' || monsterLeft >= 717) {
    monster.style.backgroundImage = 'url(img/monster' + randomIntFromInterval(1, 2) + '.png)';
  }

  leoTop = parseInt(window.getComputedStyle(leo).getPropertyValue('top'));
  monsterLeft = parseInt(window.getComputedStyle(monster).getPropertyValue('left'));

  if (monsterLeft < 85 && monsterLeft > 0 && leoTop > 170) {
    const div = document.createElement('div');
    div.innerHTML = 'GAME OVER !!!' + "<br /><br /><a href='#' onclick='location.reload(); return false;' >PLAY AGAIN</a>";

    div.style.position = 'relative';
    div.style.top = '150px';
    div.style.textAlign = 'center';

    game.innerHTML = '';
    game.append(div);

    //
  }
}, 50);

let bullets = []; // Array to store bullets

// Function to create and move bullets
function shoot() {
  const bullet = document.createElement('div');
  bullet.classList.add('bullet');
  leo.appendChild(bullet);
  bullets.push(bullet);

  let bulletPos = 100;
  let bulletInterval = setInterval(() => {
    bulletPos += 10;
    bullet.style.left = bulletPos + 'px';
    /*bullet.style.top = leoTop + 'px';*/

    if (bulletPos > monsterLeft) {
      clearInterval(bulletInterval);
      bullet.remove();

      monster.style.display = 'none'; // Hide the monster upon hit
      setTimeout(() => {
        monster.style.display = 'block'; // Show the monster again after a delay
      }, 1000);
    }

    if (bulletPos >= 350) {
      clearInterval(bulletInterval);
      bullet.remove();
    }
  }, 50);
}

function powerAttack() {
  if (leo.classList != 'power-attack') {
    leo.classList.add('power-attack');
  }
  setTimeout(function () {
    leo.classList.remove('power-attack');
  }, 200);
}

// Event listener for shooting
document.addEventListener('keydown', (event) => {
  if (event.code === 'Space') {
    shoot();
    powerAttack();
  }
});
