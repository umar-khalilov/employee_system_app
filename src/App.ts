import { Server, createServer } from 'http';
import { ConfigurationService } from './common/configs/ConfigurationService';
import { LoggerService } from './common/services/LoggerService';

export class App {
    private readonly application: Server;
    private readonly serverPort: number;
    private readonly configs: ConfigurationService;
    private readonly logger: LoggerService;

    constructor() {
        this.configs = new ConfigurationService();
        this.logger = new LoggerService(App.name);
        this.application = createServer(async (req, res) => {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('Welcome to my test backend');
        });
        this.serverPort = +this.configs.get('SERVER_PORT', 3000);
        this.logger.log('Initialized');
    }

    public async listen(): Promise<void> {
        this.application.listen(this.serverPort, () => {
            this.logger.log(`Application successfully started!`);
            this.logger.system(
                `Application url address available on: http://localhost:${this.serverPort}`,
            );
        });
    }
}
