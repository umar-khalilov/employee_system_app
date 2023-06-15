import { App } from './App';

const main = async (): Promise<void> => {
    const app = new App();
    await app.listen();
};

void main();
