import { UserSessionService } from 'src/user-session/user-session.service';
export declare class ReporterDetailsService {
    private readonly userSessionService;
    constructor(userSessionService: UserSessionService);
    reporterDataManagement(number: string, message: any, userData: any): Promise<String>;
}
