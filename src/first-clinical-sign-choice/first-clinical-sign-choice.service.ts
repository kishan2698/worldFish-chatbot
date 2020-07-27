import { Injectable } from '@nestjs/common';
import { UserSessionService } from 'src/user-session/user-session.service';

@Injectable()
export class ClinicalSignChoiceService {
    constructor(private readonly userSessionService:UserSessionService){}
    async firstClinicalSignManagement(number:string, message:any,userData:any, twiml:any){
        let regex = /^[1-6](,[1-6])*$/
        if(regex.test(message.Body)){
            if(!userData.firstClinicalSignData){
                let data:any = {
                    locationChoice:userData.locationChoice,
                    locationData:userData.locationData,
                    reporterData:userData.reporterData,
                    waterTypeData: userData.waterTypeData,
                    mainWaterSourceData:userData.mainWaterSourceData,
                    cultureSystemData:userData.cultureSystemData,
                    firstClinicalSignData:this.mapKeyValue(message.Body),
                    secondClinicalSignData:null
                }
                await this.userSessionService.userSessionManagement(number, data)
                twiml.message(`Please see below remaining images and please type the number shown in figure
                              \nplease choose by observing the below images and type the option number from picture by comma separated.(eg:7,8,9.....)`)
                twiml.message().media('https://api.twilio.com/2010-04-01/Accounts/AC01b5311740cfa96b328bbed8b727b387/Messages/MM9407d0457a8ad9068c1f4dbcabbd827d/Media/MEcd1e3786adec4812c26521be3339c41b')
                twiml.message().media('https://api.twilio.com/2010-04-01/Accounts/AC01b5311740cfa96b328bbed8b727b387/Messages/MMd0bb26da46a9175e598d203d09cc5766/Media/ME6d0035d183280d4825fbaadebb702e31')
                twiml.message().media('https://api.twilio.com/2010-04-01/Accounts/AC01b5311740cfa96b328bbed8b727b387/Messages/MM1fa3d521c0cd803fec1b3bdd21f930aa/Media/ME8fc4357ca1db37b4def8fca1d56250e9')
                twiml.message().media('https://api.twilio.com/2010-04-01/Accounts/AC01b5311740cfa96b328bbed8b727b387/Messages/MMee5ecd11756d8c285a350fa0cf7df998/Media/ME9f893379a69d60750efb07f02e771db0')
                twiml.message().media('https://api.twilio.com/2010-04-01/Accounts/AC01b5311740cfa96b328bbed8b727b387/Messages/MMe3aced6dcc737c7ff8cbaa86d75557ad/Media/ME0bceecc186653618a46e5e793243449f')
                twiml.message().media('https://api.twilio.com/2010-04-01/Accounts/AC01b5311740cfa96b328bbed8b727b387/Messages/MM8d1b62cfcfff6ff90425103bee69d22d/Media/ME264da3518b6b8b1f49e67b09db4dc9d9')
                }
        }
        else{
            twiml.message(`Please type options by comma separated..`)
        }
    }
    mapKeyValue(type:any){
        let message = type.split(",")
        let result = []
        let firstClinicSignSource:object = {
            '1':'Eye exophthalmia/popeye',
            '2':'Eye endothalmia/eye shrinkage',
            '3':'Eye opacification',
            '4':'erosions haemorrhagic lesion',
            '5':'Skin discoloration',
            '6':'Open wounds',
        }
        message.forEach(element => {
            result.push(firstClinicSignSource[element])
        });
        return result
    }
}
