const themeToggle = document.getElementById("theme-toggle");
const lyricsSearch = document.getElementById("lyrics-search");
const searchBtn = document.getElementById("search-btn");
const lyricsDisplay = document.getElementById("lyrics-display");
const audioPlayer = document.getElementById("audio-player");
const playBtn = document.getElementById("play-btn");
const pauseBtn = document.getElementById("pause-btn");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const progress = document.getElementById("progress");
const volumeSlider = document.getElementById("volume-slider");
const trackTitle = document.getElementById("track-title");
const trackArtist = document.getElementById("track-artist");

// Toggle Theme
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  themeToggle.textContent = document.body.classList.contains("dark") ? "Light Mode" : "Dark Mode";
});
// Animate Theme Toggle on Click
themeToggle.addEventListener("click", () => {
    themeToggle.style.transform = "rotate(360deg)";
    setTimeout(() => {
      themeToggle.style.transform = "rotate(0deg)";
    }, 500);
  });
  
  // Add Animation to Search Button
  searchBtn.addEventListener("mouseenter", () => {
    searchBtn.style.transform = "translateY(-5px)";
  });
  searchBtn.addEventListener("mouseleave", () => {
    searchBtn.style.transform = "translateY(0)";
  });
  
  // Glow Effect for Search Input
  lyricsSearch.addEventListener("focus", () => {
    lyricsSearch.style.boxShadow = "0 0 15px rgba(37, 99, 235, 0.8)";
  });
  lyricsSearch.addEventListener("blur", () => {
    lyricsSearch.style.boxShadow = "none";
  });
  

// Search for Lyrics
searchBtn.addEventListener("click", async () => {
  const query = lyricsSearch.value.trim();
  if (!query) {
    alert("Please enter a song or artist name!");
    return;
  }

  const response = await fetch(`/api/lyrics?query=${encodeURIComponent(query)}`);
  const data = await response.json();
  lyricsDisplay.innerHTML = data.lyrics || "No lyrics found!";
});

// MP3 Player
const loadWaveform = () => {
  const waveform = WaveSurfer.create({
    container: "#waveform",
    waveColor: "violet",
    progressColor: "purple"
  });
  waveform.load(audioPlayer.src);
};

audioPlayer.addEventListener("play", loadWaveform);



// Sample Playlist
const playlist = [
  { title: "Song 1", artist: "Artist 1", src: "song1.mp3" },
  { title: "Song 2", artist: "Artist 2", src: "song2.mp3" },
];

let currentTrackIndex = 0;

// Load Track
const loadTrack = (index) => {
  const track = playlist[index];
  audioPlayer.src = track.src;
  trackTitle.textContent = track.title;
  trackArtist.textContent = track.artist;
};

loadTrack(currentTrackIndex);

// Play and Pause Controls
playBtn.addEventListener("click", () => {
  audioPlayer.play();
  playBtn.style.display = "none";
  pauseBtn.style.display = "inline";
});

pauseBtn.addEventListener("click", () => {
  audioPlayer.pause();
  playBtn.style.display = "inline";
  pauseBtn.style.display = "none";
});

// Next and Previous Controls
nextBtn.addEventListener("click", () => {
  currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
  loadTrack(currentTrackIndex);
  audioPlayer.play();
});

prevBtn.addEventListener("click", () => {
  currentTrackIndex =
    (currentTrackIndex - 1 + playlist.length) % playlist.length;
  loadTrack(currentTrackIndex);
  audioPlayer.play();
});

// Update Progress Bar
audioPlayer.addEventListener("timeupdate", () => {
  const progressPercentage =
    (audioPlayer.currentTime / audioPlayer.duration) * 100;
  progress.style.width = `${progressPercentage}%`;
});

// Volume Control
volumeSlider.addEventListener("input", () => {
  audioPlayer.volume = volumeSlider.value;
});

// Initialize Wavesurfer
const wave = WaveSurfer.create({
  container: "#waveform",
  waveColor: "#6a11cb",
  progressColor: "#2575fc",
});

audioPlayer.addEventListener("play", () => wave.play());
audioPlayer.addEventListener("pause", () => wave.pause());
audioPlayer.addEventListener("ended", () => wave.stop());
wave.load(audioPlayer.src);
// Highlight Track Info
const highlightTrack = () => {
    const titleColor = ["#ff6f61", "#ff3d54", "#3b82f6"];
    let i = 0;
    setInterval(() => {
      trackTitle.style.color = titleColor[i % titleColor.length];
      i++;
    }, 1000);
  };
  highlightTrack();
  
  // Adjust Volume Icon
  volumeSlider.addEventListener("input", () => {
    const volumeValue = volumeSlider.value;
    const volumeDown = document.querySelector(".fa-volume-down");
    const volumeUp = document.querySelector(".fa-volume-up");
  
    if (volumeValue == 0) {
      volumeDown.style.color = "#ff3d54";
      volumeUp.style.color = "#ddd";
    } else if (volumeValue > 0.5) {
      volumeDown.style.color = "#ddd";
      volumeUp.style.color = "#ff6f61";
    } else {
      volumeDown.style.color = "#ff6f61";
      volumeUp.style.color = "#ddd";
    }
  });
