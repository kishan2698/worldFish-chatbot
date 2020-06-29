import { GreetingService } from './greeting/greeting.service';
import { Request, Response } from 'express';
export declare class AppController {
    private readonly greetingService;
    constructor(greetingService: GreetingService);
    rootPath(req: Request, res: Response): any;
}
