function headerEvents() {
    let closeButton = e('.close')
    bindEvent(closeButton, 'click', function() {
        e('body').classList.add('goodbye')
    })
    //
    let shareButton = e('.share')
    let shareImg = e('.share img')
    bindEvent(shareButton, 'mousedown', function() {
        unrealized('share')
        shareImg.setAttribute('src', 'img/main/share2.png')
    })
    bindEvent(shareButton, 'mouseup', function() {
        shareImg.setAttribute('src', 'img/main/share1.png')
    })
}

function nonControlEvents() {
    let likeButton = e('#button-like')
    bindEvent(likeButton, 'mousedown', function() {
        unrealized('like')
        let selected = likeButton.dataset.selected
        if (selected === 'n') {
            likeButton.setAttribute('src', 'img/non-controls/like2.png')
        } else if (selected === 'y') {
            likeButton.setAttribute('src', 'img/non-controls/like4.png')
        }
    })
    bindEvent(likeButton, 'mouseup', function() {
        let selected = likeButton.dataset.selected
        if (selected === 'n') {
            likeButton.setAttribute('src', 'img/non-controls/like3.png')
            likeButton.dataset.selected = 'y'
        } else if (selected === 'y') {
            likeButton.setAttribute('src', 'img/non-controls/like1.png')
            likeButton.dataset.selected = 'n'
        }
    })
    //
    let downloadButton = e('#button-download')
    bindEvent(downloadButton, 'mousedown', function() {
        unrealized('download')
        downloadButton.setAttribute('src', 'img/non-controls/download2.png')
    })
    bindEvent(downloadButton, 'mouseup', function() {
        downloadButton.setAttribute('src', 'img/non-controls/download1.png')
    })
    //
    let commentButton = e('#button-comment')
    bindEvent(commentButton, 'mousedown', function() {
        unrealized('comment')
        commentButton.setAttribute('src', 'img/non-controls/comment2.png')
    })
    bindEvent(commentButton, 'mouseup', function() {
        commentButton.setAttribute('src', 'img/non-controls/comment1.png')
    })
    //
    let detailButton = e('#button-detail')
    bindEvent(detailButton, 'mousedown', function() {
        unrealized('detail')
        detailButton.setAttribute('src', 'img/non-controls/detail2.png')
    })
    bindEvent(detailButton, 'mouseup', function() {
        detailButton.setAttribute('src', 'img/non-controls/detail1.png')
    })
}

function diskAnimation() {
    if (player.playing) {
        e('.platter').classList.add('rotate')
        e('.needle').classList.remove('no-touch')
        e('.needle').classList.add('touch')
    } else {
        e('.platter').classList.remove('rotate')
        e('.needle').classList.remove('touch')
        e('.needle').classList.add('no-touch')
    }
}

function timeEvents() {
    let dragging = false;
    let slider = e('.slider')
    let offsetX = 0
    bindEvent(slider, 'mousedown', function(event) {
        dragging = true;
        offsetX = event.pageX - slider.offsetLeft
        // 防止系统吃掉 mouseup
        event.preventDefault()
    })
    bindEvent(document, 'mousemove', function(event) {
        if (dragging) {
            // x 是滑块相对于 player 左边缘的坐标
            let x = event.pageX - offsetX;
            let progressBar = e('.progress-bar')
            // progressBar.offsetLeft 在进度条中间, 因为 left: 50%, 而 translate(-50%) 不改变 offsetLeft
            let lower = progressBar.offsetLeft - progressBar.offsetWidth / 2 - 10
            let upper = progressBar.offsetLeft + progressBar.offsetWidth / 2 - 10
            if (x < lower) {
                x = lower
            } else if (x > upper) {
                x = upper
            }
            // 更新音乐进度
            let progress = (x - 50) / 180 * player.audio.duration
            if (progress === player.audio.duration) {
                progress = player.audio.duration - 1
            }
            player.audio.currentTime = progress
        }
    })
    bindEvent(document, 'mouseup', function() {
        dragging = false
    })
}

function controlEvents() {
    let playButton = e('#button-play')
    bindEvent(playButton, 'mousedown', function(event) {
        event.preventDefault()
        event.target.dataset.mousedown = "true"
        let feature = event.target.dataset.feature
        if (feature === 'play') {
            player.audio.play()
            player.playing = true
            playButton.setAttribute('src', 'img/controls/play2.png')
        } else if (feature === 'pause') {
            player.audio.pause()
            player.playing = false
            playButton.setAttribute('src', 'img/controls/pause2.png')
        }
    })
    bindEvent(playButton, 'mouseup', function(event) {
        // 确保不是在滑动滑块时在按钮上释放了 mouseup
        let mousedown = event.target.dataset.mousedown
        if (mousedown === 'true') {
            let feature = event.target.dataset.feature
            if (feature === 'play') {
                playButton.setAttribute('src', 'img/controls/pause1.png')
                event.target.dataset.feature = 'pause'
            } else if (feature === 'pause') {
                playButton.setAttribute('src', 'img/controls/play1.png')
                event.target.dataset.feature = 'play'
            }
            event.target.dataset.mousedown = "false"
            diskAnimation()
        }
    })
    //
    let previousButton = e('#button-previous')
    let nextButton = e('#button-next')
    bindEvent(previousButton, 'mousedown', function() {
        cutMusic(-1)
        previousButton.setAttribute('src', 'img/controls/previous2.png')
    })
    bindEvent(previousButton, 'mouseup', function() {
        previousButton.setAttribute('src', 'img/controls/previous1.png')
    })
    bindEvent(nextButton, 'mousedown', function() {
        cutMusic(1)
        nextButton.setAttribute('src', 'img/controls/next2.png')
    })
    bindEvent(nextButton, 'mouseup', function() {
        nextButton.setAttribute('src', 'img/controls/next1.png')
    })
    //
    let cycleButton = e('#button-cycle')
    bindEvent(cycleButton, 'mousedown', function() {
        unrealized('cycle')
        let cycle = cycleButton.dataset.cycle
        if (cycle === 'list') {
            cycleButton.setAttribute('src', 'img/controls/cycle_list2.png')
        } else if (cycle === 'random') {
            cycleButton.setAttribute('src', 'img/controls/cycle_random2.png')
        } else if (cycle === 'single') {
            cycleButton.setAttribute('src', 'img/controls/cycle_single2.png')
        }
    })
    bindEvent(cycleButton, 'mouseup', function() {
        let cycle = cycleButton.dataset.cycle
        if (cycle === 'list') {
            cycleButton.setAttribute('src', 'img/controls/cycle_random1.png')
            cycleButton.dataset.cycle = 'random'
        } else if (cycle === 'random') {
            cycleButton.setAttribute('src', 'img/controls/cycle_single1.png')
            cycleButton.dataset.cycle = 'single'
        } else if (cycle === 'single') {
            cycleButton.setAttribute('src', 'img/controls/cycle_list1.png')
            cycleButton.dataset.cycle = 'list'
        }
    })
    // 打开播放列表
    let listButton = e('#button-list')
    bindEvent(listButton, 'mousedown', function() {
        listButton.setAttribute('src', 'img/controls/list2.png')
    })
    bindEvent(listButton, 'mouseup', function() {
        listButton.setAttribute('src', 'img/controls/list1.png')
        e('.music-list').style.transform = 'scale(1, 1)'
    })
    // 关闭播放列表
    let title = e('.title')
    let nonControls = e('.non-controls')
    let disk = e('.disk')
    bindEvent(title, 'click', function() {
        e('.music-list').style.transform = 'scale(1, 0)'
    })
    bindEvent(nonControls, 'click', function() {
        e('.music-list').style.transform = 'scale(1, 0)'
    })
    bindEvent(disk, 'click', function() {
        e('.music-list').style.transform = 'scale(1, 0)'
    })
}

function listEvents() {
    let selector = e('.music-list')
    bindEvent(selector, 'click', function(event) {
        let name = event.target.innerHTML
        for (let music of musicList) {
            if (music.name === name) {
                player.currentMusic = music
                player.playing = true
                cutMusic(0)
                diskAnimation()
                // 改变控制按钮样式
                e('#button-play').setAttribute('src', 'img/controls/pause1.png')
                e('#button-play').dataset.feature = 'pause'
                break
            }
        }
    })
}

function autoCut() {
    bindEvent(player.audio, 'ended', function() {
        cutMusic(1)
    })
}

function bindEvents() {
    headerEvents()
    nonControlEvents()
    timeEvents()
    controlEvents()
    listEvents()
    autoCut()
}
