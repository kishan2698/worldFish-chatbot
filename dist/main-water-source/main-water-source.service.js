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
exports.MainWaterSourceService = void 0;
const common_1 = require("@nestjs/common");
const user_session_service_1 = require("../user-session/user-session.service");
let MainWaterSourceService = class MainWaterSourceService {
    constructor(userSessionService) {
        this.userSessionService = userSessionService;
    }
    async mainWaterSourceManagement(number, message, userData) {
        let regex = /^[1-6](,[1-6])*$/;
        if (regex.test(message.Body)) {
            if (!userData.mainWaterSourceData) {
                let data = {
                    locationChoice: userData.locationChoice,
                    locationData: userData.locationData,
                    reporterData: userData.reporterData,
                    waterTypeData: userData.waterTypeData,
                    mainWaterSourceData: this.mapKeyValue(message.Body),
                    cultureSystemData: null
                };
                this.userSessionService.userSessionManagement(number, data);
                return `Description of culture system:
                        \nPlease type the options by giving comma separated(eg:1,2,3,4):
                        \n1)Pond
                        \n2)Tank
                        \n3)Cage
                        \n4)Raceway`;
            }
        }
        else {
            return `Please type options by comma separated`;
        }
    }
    mapKeyValue(type) {
        let message = type.split(",");
        let result = [];
        let mainWaterSource = {
            '1': 'Bore Water',
            '2': 'River Water',
            '3': 'Canal Water',
            '4': 'Town Water',
            '5': 'Surrounding seawater or brackish water',
            '6': 'Rain water'
        };
        message.forEach(element => {
            result.push(mainWaterSource[element]);
        });
        return result;
    }
};
MainWaterSourceService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [user_session_service_1.UserSessionService])
], MainWaterSourceService);
exports.MainWaterSourceService = MainWaterSourceService;
//# sourceMappingURL=main-water-source.service.js.map