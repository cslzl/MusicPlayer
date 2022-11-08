function updateAudioSrc() {
    player.audio.src = player.currentMusic.path
}

function updateHeader() {
    e('.name').innerHTML = player.currentMusic.name
    e('.artist').innerHTML = player.currentMusic.artist
}

function updateTotalTime() {
    bindEvent(player.audio, 'canplay', function() {
        e('#span-total').innerHTML = formattedTime(player.audio.duration)
    })
}

function musicListItemTemplate(music, playing) {
    return `
        <div class="list-item" data-path="${music.path}">
            <img class="list-item-img ${playing ? '' : 'hide'}" src="img/list/playing.png">
            <span class="list-item-name" style="color:${playing ? 'rgb(206, 61, 58)' : 'rgb(50, 50, 50)'};">${music.name}</span>
        </div>
    `
}

function updateMusicList() {
    let musicListTemplate = ''
    for (let i = 0; i < musicList.length; i++) {
        let current = musicList.indexOf(player.currentMusic) === i
        musicListTemplate += musicListItemTemplate(musicList[i], current)
    }
    e('.music-list').innerHTML = musicListTemplate
}

function cutMusic(position) {
    // position: -1 previous, 0 current, 1 next
    let currentIndex = musicList.indexOf(player.currentMusic)
    let newIndex = (currentIndex + position + musicList.length) % musicList.length
    player.currentMusic = musicList[newIndex]
    updateAudioSrc()
    updateHeader()
    updateTotalTime()
    updateMusicList()
    if (player.playing) {
        player.audio.play()
    }
}
