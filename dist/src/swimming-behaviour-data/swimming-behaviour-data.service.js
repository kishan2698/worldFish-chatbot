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
exports.SwimmingBehaviourDataService = void 0;
const common_1 = require("@nestjs/common");
const user_session_service_1 = require("../user-session/user-session.service");
let SwimmingBehaviourDataService = class SwimmingBehaviourDataService {
    constructor(userSessionService) {
        this.userSessionService = userSessionService;
    }
    async swimmingBehaviourManagement(number, message, userData) {
        console.log("hi");
        if (!userData.swimmingBehaviourData) {
            let data = {
                locationChoice: userData.locationChoice,
                locationData: userData.locationData,
                reporterData: userData.reporterData,
                waterTypeData: userData.waterTypeData,
                mainWaterSourceData: userData.mainWaterSourceData,
                cultureSystemData: userData.cultureSystemData,
                clinicalSignData: userData.clinicalSignData,
                swimmingBehaviourData: this.mapKeyValue(message.Body)
            };
            await this.userSessionService.userSessionManagement(number, data);
            return `ThankYou For Your Information
                    \nPlease type OK for your data`;
        }
    }
    mapKeyValue(type) {
        let message = type.split(",");
        let clinicSignSource = {
            '1': 'yes',
            '2': 'no'
        };
        return clinicSignSource[message];
    }
};
SwimmingBehaviourDataService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [user_session_service_1.UserSessionService])
], SwimmingBehaviourDataService);
exports.SwimmingBehaviourDataService = SwimmingBehaviourDataService;
//# sourceMappingURL=swimming-behaviour-data.service.js.map