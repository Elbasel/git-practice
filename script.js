function getEventListener(element) {


    let lastChosenDirection;
    let lastOffset = {
        top: 0,
        left: 0,
    }

    const directions = ['top', 'left']
    function moveRandomly() {
        let randomDirection = chooseRandom(directions)
        while (randomDirection === lastChosenDirection) {
            randomDirection = chooseRandom(directions)
        }
        lastChosenDirection = randomDirection

        let maxOffset = 0
        switch (randomDirection) {
            case 'top':
                maxOffset = window.innerHeight
                break
            case 'left':
                maxOffset = window.innerWidth
        }
        let offset = randomInt(100, maxOffset - 100)

        while (Math.abs(lastOffset[randomDirection] - offset) < (maxOffset / 5)) {
            offset = randomInt(100, maxOffset - 100)
        }

        lastOffset[randomDirection] = offset
        element.style[randomDirection] = offset + 'px'

        console.log('moving in direction ' + randomDirection + ' with ' + offset)
    }
    return moveRandomly

}


function chooseRandom(array) {
    return array[Math.floor(Math.random() * array.length)]
}

function randomInt(min = 0, max = 100) {
    return Math.round((Math.random() * (max - min + 1)) + min)
}

function setCounter() {
    try {
        const amount = document.querySelectorAll('.container').length
        if (amount === 0) {
            document.querySelector('.counter').remove()
        }
        else {
            if (document.querySelector('.counter') == null) {
                document.querySelector('.delete').appendChild(htmlToElement('<div class="counter"></div>'))
            }
            document.querySelector('.counter').textContent = amount
        }

    } catch (error) {

    }

}

function addSpinner() {
    const spinnerHtml = `
    <div class="container">
        <div></div>
        <div>
            <div></div>
            <span></span>
            <div></div>
        </div>
        <div></div>
    </div>`
    const spinner = htmlToElement(spinnerHtml)


    spinner.onclick = getEventListener(spinner)
    document.body.querySelector('.playground').appendChild(spinner)
    setCounter()
    return spinner
}


function htmlToElement(html) {
    var template = document.createElement('template');
    html = html.trim(); // Never return a text node of whitespace as the result
    template.innerHTML = html;
    return template.content.firstChild;
}


addSpinner()

const interval = setInterval(() => {
    const spinner = addSpinner()
    setTimeout(() => {
        spinner.click()
    }, 100);
}, randomInt(60000, 100000));





// const timeout = 15_000
const timeout = 100
setTimeout(() => {
    const buttonsHTml = `
    <div>
    <button class="delete">❌
    <div class="counter">1</div>
    </button>
    <button class="add">➕</button>
    </div>`
    document.body.appendChild(htmlToElement(buttonsHTml))
    document.querySelector('.delete').onclick = () => {
        document.querySelector('.playground').innerHTML = '';
        setCounter()
    }
    document.querySelector('.add').onclick = addSpinner
}, timeout);

