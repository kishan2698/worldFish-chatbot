import { Injectable } from '@nestjs/common';
import * as fs from 'fs'
import { UserSessionService } from 'src/user-session/user-session.service';

@Injectable()
export class ReporterDetailsService {
    constructor(private readonly userSessionService:UserSessionService){}
    async reporterDataManagement(number:string, message:any, userData:any):Promise<String>{
        if(!userData.reporterName){
            let data:any = {
                locationChoice:userData.locationChoice,
                locationData:userData.locationData,
                reporterName:message.Body,
                reporterMobile:null
            }
            this.userSessionService.userSessionManagement(number, data)
            return `Please Enter Your Mobile Number`
        }
        else if(!userData.reporterMobile){
            let phoneNoRegx = /^\d{10}$/;
            if(!(phoneNoRegx.test(message.Body))){
                return `Please enter a valid mobile number`
            }else{
                let data:any = {
                    locationChoice:userData.locationChoice,
                    locationData:userData.locationData,
                    reporterName:userData.reporterName,
                    reporterMobile:message.Body,
                    reporterEmail:null
                }
                this.userSessionService.userSessionManagement(number, data)
                return `Please Enter Your Email`
            }
        }
        else if(!userData.reporterEmail){
            const emailRegx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if(!(emailRegx.test(message.Body))){
                return `Please enter a valid email format`
            }else{
                let data:any = {
                    locationChoice:userData.locationChoice,
                    locationData:userData.locationData,
                    reporterData:{reporterName:userData.reporterName, reporterMobile:userData.reporterMobile, reporterEmail:message.Body},
                    waterTypeChoice:null
                }
                this.userSessionService.userSessionManagement(number, data)
                return `Please Share Water Type:
                        \nPlease Type _*1*_ for Sea Water
                        \nPlease Type _*2*_ for Fresh Water
                        \nPlease Type _*3*_ for Brackish Water`
            }
        }
    }
}
