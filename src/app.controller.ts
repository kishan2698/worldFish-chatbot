import { Controller, Post, Req, Res } from '@nestjs/common';
import { GreetingService } from './greeting/greeting.service';
import { Request, Response} from 'express';

@Controller()
export class AppController {
  constructor(private readonly greetingService: GreetingService) {}

  @Post('worldfish')
  rootPath(@Req() req: Request, @Res() res: Response): any {
    this.greetingService.greeting(req, res)
  }
}
