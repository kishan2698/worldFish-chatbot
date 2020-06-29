"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CultureSystemService = void 0;
const common_1 = require("@nestjs/common");
const user_session_service_1 = require("../user-session/user-session.service");
let CultureSystemService = class CultureSystemService {
    constructor(userSessionService) {
        this.userSessionService = userSessionService;
    }
    async cultureSystemManagement(number, message, userData, twiml) {
        let regex = /^[1-4](,[1-4])*$/;
        if (regex.test(message.Body)) {
            if (!userData.cultureSystemData) {
                let data = {
                    locationChoice: userData.locationChoice,
                    locationData: userData.locationData,
                    reporterData: userData.reporterData,
                    waterTypeData: userData.waterTypeData,
                    mainWaterSourceData: userData.mainWaterSourceData,
                    cultureSystemData: this.mapKeyValue(message.Body),
                    firstClinicalSignData: null
                };
                await this.userSessionService.userSessionManagement(number, data);
                twiml.message(`Main clinical signs:
                \nplease choose from the following images if you have observed those clinical signs on your sick fish during the abnormal
                \n please choose by observing the below images and type the option number from picture by comma separated..(eg:1,2,3..)
                \n here is your 6 images and in next part you will be able to see remaining 6 images after answering these....`);
                twiml.message().media('https://api.twilio.com/2010-04-01/Accounts/AC01b5311740cfa96b328bbed8b727b387/Messages/MM0684c167673e0da3dd8a5ad6b4fb02d9/Media/MEc36086c00bd980ed533e8264e2d9cbfb');
                twiml.message().media('https://api.twilio.com/2010-04-01/Accounts/AC01b5311740cfa96b328bbed8b727b387/Messages/MM483dcfeacfaf2ee725a1813a571beec5/Media/ME37b7aa7f8707a4229437894953c7bba3');
                twiml.message().media('https://api.twilio.com/2010-04-01/Accounts/AC01b5311740cfa96b328bbed8b727b387/Messages/MM1305871edbe9fc1bcea7bc0983c02171/Media/MEaa7b25be7d5426df1778a02d637db3bf');
                twiml.message().media('https://api.twilio.com/2010-04-01/Accounts/AC01b5311740cfa96b328bbed8b727b387/Messages/MMadc7561a7cfdc865ed11547a34892647/Media/ME95d8f23896953282ac8efadb065d0488');
                twiml.message().media('https://api.twilio.com/2010-04-01/Accounts/AC01b5311740cfa96b328bbed8b727b387/Messages/MM5dee8689071f3af33206da326b0d413d/Media/ME14fe795514f70998ab86a8f64fd8eab1');
                twiml.message().media('https://api.twilio.com/2010-04-01/Accounts/AC01b5311740cfa96b328bbed8b727b387/Messages/MMff030d18ac8ffda0416b270fd30fa0b5/Media/MEc50117bce1a47c3b85000af6598ae0b7');
            }
        }
        else {
            twiml.message(`Please type options by comma separated..`);
        }
    }
    mapKeyValue(type) {
        let message = type.split(",");
        let result = [];
        let mainWaterSource = {
            '1': 'Pond',
            '2': 'Tank',
            '3': 'Cage',
            '4': 'Raceway'
        };
        message.forEach(element => {
            result.push(mainWaterSource[element]);
        });
        return result;
    }
};
CultureSystemService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [user_session_service_1.UserSessionService])
], CultureSystemService);
exports.CultureSystemService = CultureSystemService;
//# sourceMappingURL=culture-system.service.js.map