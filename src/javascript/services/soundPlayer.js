class SoundPlayer {

    player;

    constructor(src) {
        this.player = new Audio(src);
    }

    play() {
        this.player.play()
            .catch(e => console.log('Error during playing audio', e));
    }


    stop() {
        this.player.pause();
        this.player.currentTime = 0;
    }

}

export default SoundPlayer;
