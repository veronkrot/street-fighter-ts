class SoundPlayer {

    player: HTMLAudioElement;

    constructor(src: string, loop: boolean = false) {
        this.player = new Audio(src);
        this.player.loop = loop;
    }

    play(): void {
        this.player.play()
            .catch(e => console.log('Error during playing audio', e));
    }


    stop(): void {
        this.player.pause();
        this.player.currentTime = 0;
    }

}

export default SoundPlayer;
