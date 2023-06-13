import { App } from './App';

const main = async (): Promise<void> => {
    const controllers = [];
    const app = new App();
    await app.listen();
};

void main();
