// Lista dei video
const videoList = [
    { id: "pmanD_s7G3U", title: "Demon Slayer" },
    { id: "fkAL_LeCsZs", title: "Dr. Stone" },
    { id: "gcgKUcJKxIs", title: "Jujutsu Kaisen" },
    { id: "gz--GkzpAf8", title: "Spy X Family" },
    { id: "a4na2opArGY", title: "Dan Dadan" },
    { id: "XqD0oCHLIF8", title: "Solo Leveling" },
    { id: "CFjI21M9wZs", title: "Kaiju n°8" },
    { id: "5yb2N3pnztU", title: "My Hero Academia" },
    { id: "dFlDRhvM4L0", title: "Chainsaw Man" },
    { id: "yHCh8ffTZWM", title: "Grimgar" },
    { id: "6GW0wXMt2CQ", title: "Date A Live" },
    { id: "gHTqQSW_g4k", title: "Date A Live" },
    { id: "T4y7imuU4nM", title: "Date A Live" },
    { id: "_6KZI74zKfE", title: "Black Clover" },
    { id: "atxYe-nOa9w", title: "One Punch Man" },
    { id: "-77UEct0cZM", title: "My Hero Academia" },
    { id: "KOWcj7XKnfQ", title: "Overlord" },
    { id: "xLGtT8WuidM", title: "Fire Force" },
    { id: "By_JYrhx-WY", title: "Tokyo Revengers" },
    { id: "y8B6-Eot9iI", title: "Blue Lock" },
    { id: "Tt4_enX63K0", title: "Zom 100" },
    { id: "SavhHnWla6c", title: "Naruto Shippuden" },
    { id: "WEN4qOcVKeM", title: "Bleach" },
    { id: "mjeR7vUrDvM", title: "Bleach" },
    { id: "fFd1VkGc-SI", title: "Black Clover" },
    { id: "C0zMWogztQs", title: "Solo Leveling 2" },
    { id: "sYC5BfJy2nw", title: "The Apothecary Diaries 3" },
    { id: "0Vwwr3VGsYg", title: "Re:Zero" }
];

// Variabile per tenere traccia dell'ordine corrente
let isAlphabeticalOrder = true; // Iniziamo con l'ordine alfabetico
let currentVideoIndex = 0; // Indice del video corrente
let player; // Variabile per il player YouTube

// Funzione per ordinare i video alfabeticamente
function sortVideos() {
    videoList.sort((a, b) => a.title.localeCompare(b.title));
    loadVideoList(); // Ricarica la lista dei video ordinati
}

// Funzione per randomizzare i video
function randomizeVideos() {
    if (isAlphabeticalOrder) {
        // Se i video sono in ordine alfabetico, li randomizziamo
        for (let i = videoList.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [videoList[i], videoList[j]] = [videoList[j], videoList[i]]; // Swap
        }
    } else {
        // Se i video sono randomizzati, li riordiniamo alfabeticamente
        sortVideos();
    }

    // Alterna lo stato
    isAlphabeticalOrder = !isAlphabeticalOrder;
    loadVideoList(); // Ricarica la lista dei video dopo il cambiamento
}

// Funzione per caricare la lista dei video
function loadVideoList() {
    const videoListContainer = document.getElementById('video-list');
    videoListContainer.innerHTML = ''; // Pulisce la lista esistente

    videoList.forEach((video, index) => {
        const videoItem = document.createElement('div');
        videoItem.classList.add('video-item');
        videoItem.setAttribute('onclick', `loadVideo(${index})`);

        const videoThumbnail = document.createElement('img');
        videoThumbnail.classList.add('video-thumbnail');
        videoThumbnail.setAttribute('src', `https://img.youtube.com/vi/${video.id}/0.jpg`);
        videoThumbnail.setAttribute('alt', video.title);

        const videoTitle = document.createElement('p');
        videoTitle.innerText = video.title;

        videoItem.appendChild(videoThumbnail);
        videoItem.appendChild(videoTitle);
        videoListContainer.appendChild(videoItem);
    });
}

// Funzione per caricare un video nel player
function loadVideo(index) {
    const video = videoList[index];
    if (player) {
        player.loadVideoById(video.id);
    }
}

// Funzione per creare il player YouTube
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '600', // Altezza aumentata a 600px
        width: '800',  // Larghezza a 800px
        videoId: videoList[currentVideoIndex].id,
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

// Funzione quando il player è pronto
function onPlayerReady(event) {
    event.target.playVideo();
}

// Funzione per gestire il cambiamento di stato del player
function onPlayerStateChange(event) {
    if (event.data === YT.PlayerState.ENDED) {
        currentVideoIndex = (currentVideoIndex + 1) % videoList.length; // Passa al prossimo video
        loadVideo(currentVideoIndex); // Carica il prossimo video
    }
}

// Carica la lista dei video al caricamento della pagina
window.onload = loadVideoList;

// Aggiungi un listener per il pulsante di randomizzazione
document.getElementById('randomize-button').addEventListener('click', randomizeVideos);
