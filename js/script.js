// local songs data 
const songs = [
    {
        name: "1",
        artist: "A",
        album: "xyz1",
        image: "./images/1.jpg",
        songPath: "./songs/tron.mp3"
    },
    {
        name: "2",
        artist: "B",
        album: "xyz2",
        image: "./images/2.jpg",
        songPath: "./songs/tron.mp3"
    },
    {
        name: "3",
        artist: "C",
        album: "xyz3",
        image: "./images/3.jpg",
        songPath: "./songs/tron.mp3"
    },
    {
        name: "4",
        artist: "D",
        album: "xyz4",
        image: "./images/4.png",
        songPath: "./songs/tron.mp3"
    },
    {
        name: "5",
        artist: "E",
        album: "xyz5",
        image: "./images/d1.jpg",
        songPath: "./songs/tron.mp3"
    },
    {
        name: "6",
        artist: "F",
        album: "xyz6",
        image: "./images/7.jpg",
        songPath: "./songs/tron.mp3"
    },
    {
        name: "7",
        artist: "G",
        album: "xyz7",
        image: "./images/8.jpg",
        songPath: "./songs/tron.mp3"
    },
    {
        name: "8",
        artist: "H",
        album: "xyz8",
        image: "./images/4.png",
        songPath: "./songs/tron.mp3"
    },
    {
        name: "9",
        artist: "I",
        album: "xyz9",
        image: "./images/12.png",
        songPath: "./songs/tron.mp3"
    },
    {
        name: "10",
        artist: "J",
        album: "xyz10",
        image: "./images/13.jpg",
        songPath: "./songs/tron.mp3"
    }
]

let nSongs = songs.length;
let audio = null;
var currPath = null;
var playisActive = false;

function convert_seconds_to_time(seconds) {
    let mins = Math.floor(seconds / 60);
    let secs = Math.floor(seconds % 60);
    return mins + ":" + (secs < 10 ? '0' + secs : secs);
}

function set_time(audio) {
    if (!audio['duration']) {
        $('#totalTime')[0].textContent = "00:00";
        $('#currTime')[0].textContent = "00:00";
        return;
    }

    $('#totalTime')[0].textContent = convert_seconds_to_time(audio['duration']);
    $('#currTime')[0].textContent = convert_seconds_to_time(audio.currentTime);
}


let vol = 0;
var volController = document.querySelector("#volController");

// set the intital song at index 0 as a default when web page loads .
window.addEventListener('load', () => {

    var song = songs[0];

    $('#song_count').text(`#1 / ${nSongs}`);
    $('#songimg').removeClass('spinner');
    $('#artist_name').text(`Artist : ${song.artist}`);
    $('#song_name').text(`Song : ${song.name}`);
    $('#songimg').attr('src', song.image);
    $('#songimg').addClass('spinner');
    $('#currsong')[0].dataset.songPath = song.songPath;
    populate_songsList(songs, nSongs);

});


volController.addEventListener('input', (event) => {
    vol = volController.value;
    audio.volume = vol / 100;
});

$('#volumeimg').on('click', () => {
    $('#volumeimg').toggleClass('hidden');
    $('#muteimg').toggleClass('hidden');
    volController.value = 0;
    audio.volume = 0;
});

$('#muteimg').on('click', () => {
    $('#volumeimg').toggleClass('hidden');
    $('#muteimg').toggleClass('hidden');
    volController.value = vol;
    audio.volume = vol / 100;
});



// popiulates the songs list and adds event listeners to all the songs in the list so we can click and polay that song.
function populate_songsList(songs, nSongs) {
    for (let i = 0; i < nSongs; i++) {
        $('#list').append(`<div class="songDesc"><span class = "serialNo" style = " width: 40px; text-align: center; padding: 35px 10px;" >${i + 1}</span><img id="albumimg" src="${songs[i].image}" alt="album cover"><div><h5 data-songName = "${songs[i].name}" class="text-left">Song : ${songs[i].name}</h5><h5 data-album = "${songs[i].album}" class="text-left">Album : ${songs[i].album} </h5><h5 data-artist = "${songs[i].artist} "class="text-left">Artist : ${songs[i].artist} </h5><span data-songpath = "${songs[i].songPath}" hidden></span></div></div>`);
    }

    // event listener to change the current playing song if any song from this songlist is clicked
    $('.songDesc').click(function () {

        var childs = this.childNodes;
        var songDescDiv = childs['2'].childNodes;

        console.log(songDescDiv);

        $('#songimg').removeClass('spinner');
        $('#song_count').text(`#${childs[0].textContent} / ${nSongs}`);
        $('#artist_name').text(`Artist : ${songDescDiv[2].dataset.artist}`);
        $('#song_name').text(`Song : ${songDescDiv[0].dataset.songname}`);
        $('#songimg').attr('src', childs[1].src);
        $('#currsong')[0].dataset.songPath = songDescDiv[3].dataset.songpath;

        audio.pause();
        setTimeout(() => {
            audio = new Audio(songDescDiv[3].dataset.songpath);
            audio.play();
            volController.dispatchEvent(new Event('input'));
            $('#songimg').addClass('spinner');
        }, 100);
    });
}

var simg = document.getElementById('songimg');


// sets the song information in playing div 
function set_song_data(songs_list, index) {
    var songInfo = songs_list[index].childNodes;
    var innerDiv = songInfo[2].childNodes;

    $('#songimg').removeClass('spinner');
    $('#song_count').text(`#${songInfo[0].textContent} / ${songs_list.length}`);
    $('#artist_name').text(`Artist : ${innerDiv[2].dataset.artist}`);
    $('#song_name').text(`Song : ${innerDiv[0].dataset.songname}`);
    $('#songimg').attr('src', songInfo[1].src);
    $('#currsong')[0].dataset.songPath = innerDiv[3].dataset.songpath;

    audio.pause();
    setTimeout(() => {
        audio = new Audio(innerDiv[3].dataset.songpath);
        audio.play();
        $('#songimg').addClass('spinner');
        volController.dispatchEvent(new Event('input'));
    }, 100);
}


$('#prev').on('click', () => {
    let s = $('#song_count').text().split("/")[0];
    let index = parseInt(s.slice(1, s.length)) - 1;
    let songs = document.querySelectorAll('.songDesc');
    index = index - 1 < 0 ? songs.length - 1 : index - 1;
    set_song_data(songs, index);
});

$('#next').on('click', () => {
    let s = $('#song_count').text().split("/")[0];
    let index = parseInt(s.slice(1, s.length)) - 1;
    let songs = document.querySelectorAll('.songDesc');
    index = (index + 1) % songs.length;
    set_song_data(songs, index);
});



$('#pause').on('click', () => {
    $('#pause').toggleClass('hidden');
    $('#play').toggleClass('hidden');
    const running = simg.style.animationPlayState === 'running';
    simg.style.animationPlayState = running ? 'paused' : 'running';
    audio.pause();
    playisActive = false;
});

$('#play').on('click', () => {
    $('#play').toggleClass('hidden');
    $('#pause').toggleClass('hidden');
    $('#songimg').addClass('spinner');
    const running = simg.style.animationPlayState === 'running';
    simg.style.animationPlayState = running ? 'paused' : 'running';

    audio = audio == null ? new Audio($('#currsong')[0].dataset.songpath) : audio;
    audio.play();
    playisActive = true;

});


// ct * 100 / d = x 
setInterval(() => {
    if (playisActive) {
        $('#durationController')[0].value = (audio.currentTime * 100) / audio.duration;
        set_time(audio);
    }
}, 800);



// ct   = ( x * d ) / 100 
$('#durationController').change(function () {
    $('#durationController')[0].value = this.value;
    let elapsed = Math.floor((this.value * Math.floor(audio.duration)) / 100);
    audio.currentTime = elapsed;
    set_time(audio);
});



$('#search').keyup(function () {
    var value = this.value.trim();
    var filtered = [];
    if (value.length > 0) {
        filtered = songs.filter((object) => {
            return object.name.indexOf(value) != -1;
        });
    }
    else
        filtered = songs;

    if (filtered.length == 0) {
        $("#list").html('<h3 style = "margin-top: 100px; padding : 50px;">Oops! No songs found. Please refine your search and try again. </h3>');
    }
    else {
        $("#list").html("");
        populate_songsList(filtered, filtered.length);
    }
});

/*
    // disable right click for webpage
    document.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        alert("Right Click is Disabled on this web-page!");
    });

*/

