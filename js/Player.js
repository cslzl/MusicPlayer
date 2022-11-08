let player = {
    audio: e('#audio-player'),
    currentMusic: musicList[0],
    playing: false,
}

function _main() {
    cutMusic(0)
    updatePlayProgress()
    bindEvents()
}

_main()
