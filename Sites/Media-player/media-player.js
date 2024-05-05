let queue = [];
let ind = 0;
var play = document.getElementById("play-button-container");
var audio = document.getElementById("audio-player");
var next = document.getElementById("next");
var prev = document.getElementById("previous")
var title = document.getElementById("title")
var queueEl = document.getElementById("queue")

async function waitMs(ms) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, ms);
    });
}

next.addEventListener('click', async function() {
    this.classList.add('active');
    ind++;
    playTrack(queue[ind])
    await waitMs(400);
    this.classList.remove('active');
})

prev.addEventListener('click', async function() {
    this.classList.add('active');
    ind--;
    playTrack(queue[ind])
    await waitMs(400);
    this.classList.remove('active');
})

function update() {
    if (!audio.paused){
        play.classList.add('active');
    }
    else{
        play.classList.remove('active');
    }
    queueEl.innerHTML = '';
    for(let i =0;i<queue.length;i++){
        var p = document.createElement('p');
        p.className = 'track';
        p.innerText = queue[i].name;
        if (i === ind){
            p.id = 'selected';
        }
        queueEl.appendChild(p);
        p.addEventListener('click',function(){
            ind = 0;
            while (queue[ind].name != this.innerText && ind < 99999){ind++;}
            playTrack(queue[ind])
        })
    }
}

play.addEventListener('click',function() {
    if (audio.paused){
        this.classList.add('active');
        audio.play();
    }
    else{
        this.classList.remove('active');
        audio.pause();
    }
})

async function playTrack(url) {
    audio.src = URL.createObjectURL(await url.getFile());
    audio.play();
    title.innerText =  url.name;
    update()

    /*
    audio.pause();
    audio.innerHTML = '';
    var source = document.createElement('source');
    source.src = url;
    source.type = 'audio/mp3';
    audio.appendChild(source);
    audio.play();
    */
}

function shuffle(array) {
    let currentIndex = array.length;
    while (currentIndex !== 0) {
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
}

async function getDirectory() {
    const dirHandle = await window.showDirectoryPicker();
    // Handle the selected directory using dirHandle
    queue = [];
    for await (const entry of dirHandle.values()) {
        if (entry.kind === 'file') {
            queue.push(entry);
        } else if (entry.kind === 'directory') {

        }
    }
    shuffle(queue)
    playTrack(queue[0])
}
