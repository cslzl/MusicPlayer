function updateCurrentTime() {
    e('#span-current').innerHTML = formattedTime(player.audio.currentTime)
}

function updateSlider() {
    let position = 180 * player.audio.currentTime / player.audio.duration + 50
    e('.slider').style.left = `${position}px`
}

function updateProgressBar() {
    let playedPercent = player.audio.currentTime / player.audio.duration * 100
    let notPlayedPercent = 100 - playedPercent
    e('.played').style.width = `${playedPercent}%`
    e('.not-played').style.width = `${notPlayedPercent}%`
}

function updatePlayProgress() {
    setInterval(function() {
        updateCurrentTime()
        updateSlider()
        updateProgressBar()
    }, 100)
}
