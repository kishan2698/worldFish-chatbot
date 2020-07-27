import { Injectable } from '@nestjs/common';
import { UserSessionService } from 'src/user-session/user-session.service';

@Injectable()
export class CultureSystemService {
    constructor(private readonly userSessionService:UserSessionService){}
    async cultureSystemManagement(number:string, message:any,userData:any, twiml:any){
        let regex = /^[1-4](,[1-4])*$/
        if(regex.test(message.Body)){
            if(!userData.cultureSystemData){
                let data:any = {
                    locationChoice:userData.locationChoice,
                    locationData:userData.locationData,
                    reporterData:userData.reporterData,
                    waterTypeData: userData.waterTypeData,
                    mainWaterSourceData:userData.mainWaterSourceData,
                    cultureSystemData:this.mapKeyValue(message.Body),
                    firstClinicalSignData:null
                }
                await this.userSessionService.userSessionManagement(number, data)
                twiml.message(`Main clinical signs:
                \nplease choose from the following images if you have observed those clinical signs on your sick fish during the abnormal
                \n please choose by observing the below images and type the option number from picture by comma separated..(eg:1,2,3..)
                \n here is your 6 images and in next part you will be able to see remaining 6 images after answering these....`)
                twiml.message().media('https://api.twilio.com/2010-04-01/Accounts/AC01b5311740cfa96b328bbed8b727b387/Messages/MM0684c167673e0da3dd8a5ad6b4fb02d9/Media/MEc36086c00bd980ed533e8264e2d9cbfb')
                twiml.message().media('https://api.twilio.com/2010-04-01/Accounts/AC01b5311740cfa96b328bbed8b727b387/Messages/MM483dcfeacfaf2ee725a1813a571beec5/Media/ME37b7aa7f8707a4229437894953c7bba3')
                twiml.message().media('https://api.twilio.com/2010-04-01/Accounts/AC01b5311740cfa96b328bbed8b727b387/Messages/MM1305871edbe9fc1bcea7bc0983c02171/Media/MEaa7b25be7d5426df1778a02d637db3bf')
                twiml.message().media('https://api.twilio.com/2010-04-01/Accounts/AC01b5311740cfa96b328bbed8b727b387/Messages/MMadc7561a7cfdc865ed11547a34892647/Media/ME95d8f23896953282ac8efadb065d0488')
                twiml.message().media('https://api.twilio.com/2010-04-01/Accounts/AC01b5311740cfa96b328bbed8b727b387/Messages/MM5dee8689071f3af33206da326b0d413d/Media/ME14fe795514f70998ab86a8f64fd8eab1')
                twiml.message().media('https://api.twilio.com/2010-04-01/Accounts/AC01b5311740cfa96b328bbed8b727b387/Messages/MMff030d18ac8ffda0416b270fd30fa0b5/Media/MEc50117bce1a47c3b85000af6598ae0b7')
            }
        }
        else{
            twiml.message(`Please type options by comma separated between 1 to 4`)
        }
    }
    
    mapKeyValue(type:any){
        let message = type.split(",")
        let result = []
        let mainWaterSource:object = {
            '1':'Pond',
            '2':'Tank',
            '3':'Cage',
            '4':'Raceway'
        }
            message.forEach(element => {
                result.push(mainWaterSource[element])
            });
            return result
    }
}
