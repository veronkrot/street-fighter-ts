class Utils {
    getRandomNumberInRange(low, high) {
        return Math.random() * (high - low) + low;
    }

    generateRandomId() {
        const S4 = () => (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
    }
}

export const utils = new Utils();
