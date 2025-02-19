import sounds from "../assets/data/sounds";

let soundPlayer = null;
let soundSource = null;
let bgSoundPlayer = null;
let bgSoundSource = null;
let soundVolume = 1;

export const soundManager = {
    init(soundPlayerRef, soundSourceRef, bgSoundPlayerRef, bgSoundSourceRef) {
        soundPlayer = soundPlayerRef;
        soundSource = soundSourceRef;
        bgSoundPlayer = bgSoundPlayerRef;
        bgSoundSource = bgSoundSourceRef;
        bgSoundPlayer.value.volume = soundVolume*0.2;
    },

    play(name) {
        if (sounds[name]) {
            soundSource.value = sounds[name].path;
            soundPlayer.value.load();
            soundPlayer.value.play();
          } 
    },

    playBg(name) {
        if (sounds[name]) {
            bgSoundSource.value = sounds[name].path;
            bgSoundPlayer.value.load();
            bgSoundPlayer.value.play();
        }
    },

    stop() {
        soundPlayer.value.pause();
        soundPlayer.value.currentTime = 0;
    },

    stopBg() {
        bgSoundPlayer.value.pause();
        bgSoundPlayer.value.currentTime = 0;
    },

    setVolume(volume) {
        soundVolume = volume;
        
        if (soundPlayer.value) {
            soundPlayer.value.volume = soundVolume;
            bgSoundPlayer.value.volume = soundVolume*0.2;
        } 
    },
};