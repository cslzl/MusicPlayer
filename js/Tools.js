function e(selector) {
    return document.querySelector(selector)
}

function bindEvent(element, eventName, callback) {
    element.addEventListener(eventName, callback)
}

function formattedTime(n) {
    n = Math.floor(n)
    let m = String(Math.floor(n / 60)).padStart(2, '0')
    let s = String(Math.floor(n % 60)).padStart(2, '0')
    return `${m}:${s}`
}

function unrealized(feature) {
    let s = `sorry~
"${feature}"还是一个未实现的功能 ^_^`
    console.log(s)
}
