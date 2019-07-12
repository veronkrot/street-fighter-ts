const basePath = './../../resources/audio/';

interface IArray {
    [position: string]: string;
}

interface SoundsInterface {
    fight: string;
    fighters: IArray;
    victory: string;
}

export const sounds: SoundsInterface = {
    fight: basePath + 'mk.mp3',
    fighters: {
        1: basePath + 'ryu.wav',
        2: basePath + 'dhalsim.wav',
        3: basePath + 'guile.wav',
        4: basePath + 'zangief.wav',
        5: basePath + 'ken.wav',
        6: basePath + 'bison.wav'
    },
    victory: basePath + 'victory.mp3'
};


