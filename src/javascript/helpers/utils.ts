class Utils {
    getRandomNumberInRange(low: number, high: number): number {
        return Math.random() * (high - low) + low;
    }

    generateRandomId(): string {
        const S4: Function = () => (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
    }
}

export const utils: Utils = new Utils();
