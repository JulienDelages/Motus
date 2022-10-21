let word_to_guess
let split_truth
let guess_len

$.get( "/word", function( word ) {
    word_to_guess = word.trim().toUpperCase()
    split_truth = word_to_guess.split('')
    guess_len = word_to_guess.length
    initBoard()
});

function initBoard() {
    let board = document.getElementById("game-board");
    for (let i = 0; i < nb_guess; i++) {
        let row = document.createElement("div")
        row.className = "letter-row"
        for (let j = 0; j < guess_len; j++) {
            let box = document.createElement("div")
            box.className = "letter-box"
            row.appendChild(box)
        }
        board.appendChild(row)
    }
}

document.addEventListener("keyup", (e) => {
    if (remain_guess === 0) {
        return
    }
    let pressedKey = String(e.key)
    if (pressedKey === "Backspace" && parseInt(localStorage.getItem('nextLetter')) !== 0) {
        deleteLetter()
        return
    }
    if (pressedKey === "Enter") {
        checkGuess()
        return
    }
    let found = pressedKey.match(/[a-z]/gi)
    if (!found || found.length > 1) {
        return
    } else {
        insertLetter(pressedKey)
    }
})

let currentGuess = []
const nb_guess = 4
let remain_guess = nb_guess
localStorage.setItem('nextLetter', 0)

function insertLetter (pressedKey) {
    if (parseInt(localStorage.getItem('nextLetter')) === guess_len) {
        return
    }
    let row = document.getElementsByClassName("letter-row")[nb_guess - remain_guess]
    let box = row.children[parseInt(localStorage.getItem('nextLetter'))]
    box.textContent = pressedKey
    box.classList.add("filled-box")
    currentGuess.push(pressedKey)
    localStorage.setItem('nextLetter', (parseInt(localStorage.getItem('nextLetter')) + 1).toString())
}

function deleteLetter () {
    let row = document.getElementsByClassName("letter-row")[nb_guess - remain_guess]
    let box = row.children[parseInt(localStorage.getItem('nextLetter')) - 1]
    box.textContent = ""
    box.classList.remove("filled-box")
    currentGuess.pop()
    localStorage.setItem('nextLetter', (parseInt(localStorage.getItem('nextLetter')) - 1).toString())
}

function checkGuess() {
    let found = true
    let row = document.getElementsByClassName("letter-row")[nb_guess - remain_guess]
    let guessString = ''
    let rightGuess = Array.from(word_to_guess.toLowerCase())
    for (const val of currentGuess) {
        guessString += val
    }
    if (guessString.length != guess_len) {
        alert("Not enough letters!")
        return
    }
    // if (!WORDS.includes(guessString)) {
    //     alert("Word not in list!")
    //     return
    // }    
    for (let i = 0; i < guess_len; i++) {
        let letterColor = ''
        let box = row.children[i]
        let letter = currentGuess[i]
        
        let letterPosition = rightGuess.indexOf(currentGuess[i])
        if (letterPosition === -1) {
            letterColor = 'grey'
        } else {
            if (currentGuess[i] === rightGuess[i]) {
                letterColor = 'green'
            } else {
                letterColor = 'yellow'
            }
            rightGuess[letterPosition] = "#"
        }

        let delay = 250 * i
        setTimeout(()=> {
            box.style.backgroundColor = letterColor
            shadeKeyBoard(letter, letterColor)
        }, delay)
    }

    if (guessString.toUpperCase() === word_to_guess) {
        let nb_try = nb_guess-remain_guess + 1
        alert(`You guessed right! Game over! It took you ${nb_try} guesses`)
        fetch('http://localhost:4100/get_user')
        .then(response => {
            if(response.ok){
                return response.text();
            }
        }).then(text => {
            if (text) {
                user_id = JSON.parse(text)
                fetch(`http://localhost:4200/add_score/?username=${user_id["user"]}&word=${word_to_guess}&nb_try=${nb_try}&found=true`)
            }
        })
        remain_guess = 0
        return
    } else {
        remain_guess -= 1
        currentGuess = []
        localStorage.setItem('nextLetter', 0)

        if (remain_guess === 0) {
            found = false
            alert("You've run out of guesses! Game over!")
            alert(`The right word was: "${word_to_guess}"`)
            fetch('http://localhost:4100/get_user')
            .then(response => {
                if(response.ok){
                    return response.text();
                }
            }).then(text => {
                if (text) {
                    user_id = JSON.parse(text)  
                    fetch(`http://localhost:4200/add_score/?username=${user_id["user"]}&word=${word_to_guess}&nb_try=${nb_guess}&found=false`)
                }
            })
        }
    }
}

function shadeKeyBoard(letter, color) {
    for (const elem of document.getElementsByClassName("keyboard-button")) {
        if (elem.textContent === letter) {
            let oldColor = elem.style.backgroundColor
            if (oldColor === 'green') {
                return
            }
            if (oldColor === 'yellow' && color !== 'green') {
                return
            }
            elem.style.backgroundColor = color
            break
        }
    }
}

document.getElementById("keyboard-cont").addEventListener("click", (e) => {
    const target = e.target
    
    if (!target.classList.contains("keyboard-button")) {
        return
    }
    let key = target.textContent

    if (key === "Del") {
        key = "Backspace"
    } 

    document.dispatchEvent(new KeyboardEvent("keyup", {'key': key}))
})