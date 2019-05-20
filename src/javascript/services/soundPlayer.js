class SoundPlayer {

    player;

    constructor(src, loop = false) {
        this.player = new Audio(src);
        this.player.loop = loop;
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
