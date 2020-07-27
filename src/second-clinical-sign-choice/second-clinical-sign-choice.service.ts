import { Injectable } from '@nestjs/common';
import { UserSessionService } from 'src/user-session/user-session.service';

@Injectable()
export class SecondClinicalSignChoiceService {
    constructor(private readonly userSessionService:UserSessionService){}
    async secondClinicalSignManagement(number:string, message:any,userData:any, twiml:any){
        let regex = /^\d(\d)*(,\d(\d)*)*$/
        ///^([7-9]|1[0-2]+(,([7-9]|1[0-2])*)*)$/
        if(regex.test(message.Body)){
            if(!this.checkBetweenData(message.Body)){
                twiml.message(`Please type options by comma separated between 7 to 12`)
            }else{
                if(!userData.secondClinicalSignData){
                    let data:any = {
                        locationChoice:userData.locationChoice,
                        locationData:userData.locationData,
                        reporterData:userData.reporterData,
                        waterTypeData: userData.waterTypeData,
                        mainWaterSourceData:userData.mainWaterSourceData,
                        cultureSystemData:userData.cultureSystemData,
                        firstClinicalSignData:userData.firstClinicalSignData,
                        secondClinicalSignData:this.mapKeyValue(message.Body),
                        swimmingChoice:null
                    }
                    await this.userSessionService.userSessionManagement(number, data)
                    twiml.message(`Swimming behavior: 
                            \nDo your fish show the following behavior (shown in video below, please watch and type options)?
                            \n Please type 1 for yes
                            \n Please type 2 for no`)
                    twiml.message().media('https://api.twilio.com/2010-04-01/Accounts/AC01b5311740cfa96b328bbed8b727b387/Messages/MMe0fb12eea3b6f62733b3d676032dfb68/Media/ME1b6277016d87cca275ca078d7c66b72c')
                }
            }
        }
        else{
            console.log("else")
            twiml.message(`Please type options by comma separated between 7 to 12`)
        }
}
    mapKeyValue(type:any){
        let message = type.split(",")
        let result = []
        let secondClinicSignSource:object = {
            '7':'Abdominal distension/swelling',
            '8':'Scale protrusion/detachment',
            '9':'Gill paleness/anemia',
            '10':'Gill rot',
            '11':'Fin rot/tail rot',
            '12':'Swollen anus',
        }
        message.forEach(element => {
            result.push(secondClinicSignSource[element])
        });
        return result
    }
    checkBetweenData(data):boolean{
        const response = data.split(',')
        const boolRes = []
        response.forEach(element => {
            if(element >= 7 && element <= 12){
                boolRes.push(true)
            }else{
                boolRes.push(false)
            }
        });
        if(boolRes.includes(false)){
            return false
        }else{
            return true
        }
    }
}
