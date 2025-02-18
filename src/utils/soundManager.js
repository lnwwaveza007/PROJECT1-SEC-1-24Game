import sounds from "../assets/data/sounds";

let soundPlayer = null;
let soundSource = null;
let soundVolume = 1;

export const soundManager = {
    init(soundPlayerRef, soundSourceRef) {
        soundPlayer = soundPlayerRef;
        soundSource = soundSourceRef;
    },

    play(name) {
        if (sounds[name]) {
            soundSource.value = sounds[name].path;
            soundPlayer.value.load();
            soundPlayer.value.play();
          } 
    },
    

    stop(name) {
        if (sounds[name]) {
            soundPlayer.value.pause();
            soundPlayer.value.currentTime = 0;
        }
    },

    setVolume(volume) {
        soundVolume = volume;
        
        if (soundPlayer.value) {
            soundPlayer.value.volume = soundVolume;
        } 
    },
};