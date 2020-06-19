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
                    let resultLoc = await this.locationService.locationManagement(whatsAppNumber, userData, message )
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
                else{
                    if(userData.locationData.latitude){
                    twiml.message("*_USER-DATA_*: "
                                 + "\n_1)GPS-LOCATION-DATA_--> "
                                 + "\n*LATITUDE*: "+ JSON.parse(JSON.stringify(userData.locationData.latitude))
                                 + "\n*LONGITUDE*: "+ JSON.parse(JSON.stringify(userData.locationData.longitude)) 
                                 + "\n_2)DETAILS-OF-REPORTER_--> "
                                 + "\n*REPORTER-NAME*: "+ JSON.parse(JSON.stringify(userData.reporterData.reporterName))
                                 + "\n*REPORTER-MOBILE NUMBER*: "+ JSON.parse(JSON.stringify(userData.reporterData.reporterMobile))
                                 + "\n*REPORTER-EMAIL*: "+ JSON.parse(JSON.stringify(userData.reporterData.reporterEmail))
                                 + "\n_3)WATER-TYPE_--> "+ userData.waterTypeData 
                                 + "\n_4)MAIN-WATER-SOURCE_--> "+ userData.mainWaterSourceData
                                 + "\n_5)DESCRIPTION-OF-CULTURE-SYSTEM_--> "+ userData.cultureSystemData + ".")
                    twiml.message("Please type # to restart again ")
                    res.writeHead(200, {'Content-Type': 'text/xml'});
                    res.end(twiml.toString());
                    }
                    else{
                        twiml.message("*_USER-DATA_*: "
                                 + "\n_1)GPS-LOCATION-DATA_--> "
                                 + "\n*VILLAGE-NAME*: "+ JSON.parse(JSON.stringify(userData.locationData.villageName))
                                 + "\n*DISTRICT-NAME*: "+ JSON.parse(JSON.stringify(userData.locationData.districtName))
                                 + "\n*STATE-NAME*: "+ JSON.parse(JSON.stringify(userData.locationData.stateName))
                                 + "\n*COUNTRY-NAME*: "+ JSON.parse(JSON.stringify(userData.locationData.countryName)) 
                                 + "\n_2)DETAILS-OF-REPORTER_--> "
                                 + "\n*REPORTER-NAME*: "+ JSON.parse(JSON.stringify(userData.reporterData.reporterName))
                                 + "\n*REPORTER-MOBILE NUMBER*: "+ JSON.parse(JSON.stringify(userData.reporterData.reporterMobile))
                                 + "\n*REPORTER-EMAIL*: "+ JSON.parse(JSON.stringify(userData.reporterData.reporterEmail))
                                 + "\n_3)WATER-TYPE_--> "+ userData.waterTypeData 
                                 + "\n_4)MAIN-WATER-SOURCE_--> "+ userData.mainWaterSourceData
                                 + "\n_5)DESCRIPTION-OF-CULTURE-SYSTEM_--> "+ userData.cultureSystemData + ".")
                    twiml.message("Please type # to restart again")
                    res.writeHead(200, {'Content-Type': 'text/xml'});
                    res.end(twiml.toString());
                    }
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
                cultureSystemData:null,
            }
            this.userSessionService.userSessionCreate(whatsAppNumber, defaultData)
            twiml.message("WELCOME TO WORLDFISH")
            twiml.message("What Would you like to do?")
            twiml.message(`Please Provide Gps Location by selecting any one method :
                          \n1)Share your Whatsapp Current Location directly
                          \n2)Manual Entry`)
            res.writeHead(200, {'Content-Type': 'text/xml'});
            res.end(twiml.toString());
        }
    }
}
