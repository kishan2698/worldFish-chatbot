import { Injectable } from '@nestjs/common';
import { UserSessionService } from 'src/user-session/user-session.service';
import * as fs from 'fs'

@Injectable()
export class GpsLocationService {
    constructor(private readonly userSessionService:UserSessionService){}
    async locationManagement(number: string, userData:any, message: any ):Promise<String>{
        if(!userData.locationChoice){
            if(message.Body === "1" || message.Body === "2"){
                let data:any = {
                    locationChoice:message.Body,
                    locationData:null,
                }
                await this.userSessionService.fsPromiseManagement(number, data)
                userData = JSON.parse(fs.readFileSync(`${number}.json`, 'utf8'));
            }
        }
        switch(userData.locationChoice){
            case "1":
                if(!message.Latitude){
                    return `Please Share your current location`
                }
                else{
                    let locData:any = {
                        locationChoice:userData.locationChoice,
                        locationData:{latitude:message.Latitude, longitude:message.Longitude},
                        reporterName:null
                    }
                    this.userSessionService.userSessionManagement(number, locData)
                    return `2)Details Of Reporter:
                            \nPlease Enter Your Name`
                }
            case "2":
                if(!userData.villageName){
                if(userData.isVisited){
                    let locData:any = {
                        locationChoice:userData.locationChoice,
                        locationData:null,
                        villageName:message.Body
                    }
                    this.userSessionService.userSessionManagement(number, locData)
                    return `Please Enter Your District Name`
                }
                else{
                    let locData:any = {
                        locationChoice:userData.locationChoice,
                        locationData:null,
                        isVisited:true
                    }
                    this.userSessionService.userSessionManagement(number, locData)
                    return `Please Enter Your Village Name`
                }
            }
            else if(!userData.districtName){
                    let locData:any = {
                        locationChoice:userData.locationChoice,
                        locationData:null,
                        villageName:userData.villageName,
                        districtName:message.Body,
                        stateName:null
                    }
                    this.userSessionService.userSessionManagement(number, locData)
                    return `Please Enter Your State Name`
            }
            else if(!userData.stateName){
                let locData:any = {
                    locationChoice:userData.locationChoice,
                    locationData:null,
                    villageName:userData.villageName,
                    districtName:userData.districtName,
                    stateName:message.Body,
                    countryName:null
                }
                this.userSessionService.userSessionManagement(number, locData)
                return `Please Enter Your Country Name`
            }
            else if(!userData.countryName){
                let locData:any = {
                    locationChoice:userData.locationChoice,
                    locationData:{villageName:userData.villageName, districtName:userData.districtName, stateName:userData.stateName, countryName:message.Body}
                }
                this.userSessionService.userSessionManagement(number, locData)
                return `Details Of Reporter:
                        \nPlease Enter Your Name`
            }
            default:
                // this.userSessionService.contactSessionManagement(number, null, null)
                return `Please type _*1*_ or _*2*_\nYou can type _*#*_ any time for start the conversation from beginning(It will erase all your data)`
        }
    }
}