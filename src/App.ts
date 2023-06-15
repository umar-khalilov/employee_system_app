import {
    IncomingMessage,
    Server,
    ServerResponse,
    createServer,
} from 'node:http';
import {
    ConfigurationService,
    configurationService,
} from './common/configs/ConfigurationService';
import { LoggerService } from './common/services/LoggerService';
import { Routes } from './routes/Routes';

export class App {
    private readonly application: Server;
    private readonly serverPort: number;
    private readonly configs: ConfigurationService;
    private readonly logger: LoggerService;

    constructor() {
        this.configs = configurationService;
        this.logger = new LoggerService(App.name);
        this.application = createServer(
            async (request: IncomingMessage, response: ServerResponse) => {
                this.turnOnHeaders(request, response);
                await Routes.mainRouter(request, response);
            },
        );
        this.serverPort = +this.configs.get('SERVER_PORT');
        this.logger.log('Initialized');
    }

    private turnOnHeaders(
        request: IncomingMessage,
        response: ServerResponse,
    ): void {
        response.setHeader('Access-Control-Allow-Origin', '*');
        response.setHeader('Access-Control-Allow-Headers', '*');
        response.setHeader(
            'Access-Control-Allow-Methods',
            'OPTIONS, POST, GET, PUT, PATCH, DELETE',
        );
        response.setHeader('Access-Control-Max-Age', 2592000);
    }

    public async listen(): Promise<void> {
        this.application.listen(this.serverPort, () => {
            this.logger.log(`Application successfully started!`);
            this.logger.system(
                `Application url address available on: http://localhost:${this.serverPort}/api`,
            );
        });
    }
}
