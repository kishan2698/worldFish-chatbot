import { Injectable } from '@nestjs/common';
import * as fs from 'fs'
import { UserSessionService } from 'src/user-session/user-session.service';

@Injectable()
export class WaterTypeService {
    constructor(private readonly userSessionService: UserSessionService){}
    waterTypeManagement(number:string, message:any, userData:any):string{
        switch(message.Body){
            case "1":case "2":case "3":
                    let data:any = {
                        locationChoice:userData.locationChoice,
                        locationData:userData.locationData,
                        reporterData:userData.reporterData,
                        waterTypeData: this.mapValue(message.Body),
                        mainWaterSourceData:null
                    }
                    this.userSessionService.userSessionManagement(number, data)
                    return `Main Water Source:
                            \nPlease type the options by giving comma separated(eg:1,2,3,4):
                            \n1)Bore Water
                            \n2)River Water
                            \n3)Canal Water
                            \n4)Town Water
                            \n5)Surrounding Seawater or Brackish Water
                            \n6)Rain Water`
            default:
                this.userSessionService.contactSessionManagement(number, null, null)
                return `PLEASE TYPE 1,2 or 3`
        }
    }
    mapValue(type:any){
        let waterType:object = {
            '1':'Sea Water',
            '2':'Fresh Water',
            '3':'Brackish Water'
        }
        return waterType[type]
    }
}
