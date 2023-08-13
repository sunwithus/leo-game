const game = document.getElementById('game');
const leo = document.getElementById('leo');
const monster = document.getElementById('monster');


document.addEventListener("keydown", function (event) {
    jump();
})

// delete jump after 700 ms (one time)
function jump() { 
    if (leo.classList != "jump") {
        leo.classList.add("jump");
    }
    setTimeout( function() {
        leo.classList.remove("jump")
    }, 800)   
}

let isAlive = setInterval ( function() {
    let leoTop = parseInt(window.getComputedStyle(leo).getPropertyValue("top"));
    let monsterLeft = parseInt(window.getComputedStyle(monster).getPropertyValue("left"));

    if(monsterLeft < 90 && monsterLeft > 0 && leoTop > 170) {
        const div = document.createElement("div");
        div.innerHTML = "GAME OVER !!!" + "<br /><br /><a href='#' onclick='location.reload(); return false;' >PLAY AGAIN</a>";

        div.style.position = 'relative';
        div.style.top = '150px';
        div.style.textAlign = 'center';
        
        game.innerHTML = "";
        game.append(div)

    }

}, 30)
