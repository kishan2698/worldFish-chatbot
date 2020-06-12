import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GreetingService } from './greeting/greeting.service';
import { UserSessionService } from './user-session/user-session.service';
import { GpsLocationService } from './gps-location/gps-location.service';
import { ReporterDetailsService } from './reporter-details/reporter-details.service';
import { WaterTypeService } from './water-type/water-type.service';
import { MainWaterSourceService } from './main-water-source/main-water-source.service';
import { CultureSystemService } from './culture-system/culture-system.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, GreetingService, UserSessionService, GpsLocationService, ReporterDetailsService, WaterTypeService, MainWaterSourceService, CultureSystemService],
})
export class AppModule {}
