import { Injectable } from '@nestjs/common';
import * as fs from 'fs'
import { UserSessionService } from 'src/user-session/user-session.service';
import { GpsLocationService } from 'src/gps-location/gps-location.service';
import { ReporterDetailsService } from 'src/reporter-details/reporter-details.service';
import { WaterTypeService } from 'src/water-type/water-type.service';
import { MainWaterSourceService } from 'src/main-water-source/main-water-source.service';
import { CultureSystemService } from 'src/culture-system/culture-system.service';
const MessagingResponse = require('twilio').twiml.MessagingResponse;

@Injectable()
export class GreetingService {
    constructor(private readonly userSessionService: UserSessionService,
                private readonly locationService: GpsLocationService,
                private readonly reporterService: ReporterDetailsService,
                private readonly waterTypeService: WaterTypeService,
                private readonly mainWaterTypeService: MainWaterSourceService,
                private readonly cultureSystemService:CultureSystemService){}
    async greeting(req:any, res:any){
        const whatsAppNumber = req.body.From.split("+")[1]
        let message = req.body
        const twiml = new MessagingResponse();
        if(fs.existsSync(`${whatsAppNumber}.json`)){
            if(message.Body === "#"){
                this.userSessionService.userSessionDelete(whatsAppNumber)
            }
            else{
                let userData = JSON.parse(fs.readFileSync(`${whatsAppNumber}.json`, 'utf8'));
                if(!userData.locationData){
                    let resultLoc = await this.locationService.locationManagement(whatsAppNumber, userData, message)
                    twiml.message(resultLoc)
                    res.writeHead(200, {'Content-Type': 'text/xml'});
                    res.end(twiml.toString());
                }
                else if(!userData.reporterData){
                    let resultReporter = await this.reporterService.reporterDataManagement(whatsAppNumber, message, userData)
                    twiml.message(resultReporter)
                    res.writeHead(200, {'Content-Type': 'text/xml'});
                    res.end(twiml.toString());
                }
                else if(!userData.waterTypeData){
                    let resultWater = await this.waterTypeService.waterTypeManagement(whatsAppNumber, message, userData)
                    twiml.message(resultWater)
                    res.writeHead(200, {'Content-Type': 'text/xml'});
                    res.end(twiml.toString());
                }
                else if(!userData.mainWaterSourceData){
                    let resultMainWaterSource = await this.mainWaterTypeService.mainWaterSourceManagement(whatsAppNumber, message, userData)
                    twiml.message(resultMainWaterSource)
                    res.writeHead(200, {'Content-Type': 'text/xml'});
                    res.end(twiml.toString());
                }
                else if(!userData.cultureSystemData){
                    let resultCultureSystem = await this.cultureSystemService.cultureSystemManagement(whatsAppNumber, message,userData)
                    twiml.message(resultCultureSystem)
                    res.writeHead(200, {'Content-Type': 'text/xml'});
                    res.end(twiml.toString());
                }
            }
        }
        else
        {
            const defaultData:any ={
                locationChoice: null,
                locationData:null,
                reporterData:null,
                waterTypeData:null,
                mainWaterSourceData:null,
                cultureSystemData:null
            }
            this.userSessionService.userSessionCreate(whatsAppNumber, defaultData)
            twiml.message("WELCOME TO WORLDFISH")
            twiml.message("What Would you like to do?")
            twiml.message(`1)Please Provide Gps Location by selecting any one method :
                          \n1)Share your Whatsapp Current Location directly
                          \n2)Manual Entry`)
            res.writeHead(200, {'Content-Type': 'text/xml'});
            res.end(twiml.toString());
        }
    }
}
