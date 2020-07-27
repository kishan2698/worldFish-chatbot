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
exports.SwimmingBehaviourService = void 0;
const common_1 = require("@nestjs/common");
const user_session_service_1 = require("../user-session/user-session.service");
let SwimmingBehaviourService = class SwimmingBehaviourService {
    constructor(userSessionService) {
        this.userSessionService = userSessionService;
    }
    async swimmingBehaviourManagement(number, message, userData) {
        if (!userData.swimmingChoice) {
            switch (message.Body) {
                case "1":
                case "2":
                    let data = {
                        locationChoice: userData.locationChoice,
                        locationData: userData.locationData,
                        reporterData: userData.reporterData,
                        waterTypeData: userData.waterTypeData,
                        mainWaterSourceData: userData.mainWaterSourceData,
                        cultureSystemData: userData.cultureSystemData,
                        firstClinicalSignData: userData.firstClinicalSignData,
                        secondClinicalSignData: userData.secondClinicalSignData,
                        swimmingChoice: this.mapValue(message.Body)
                    };
                    await this.userSessionService.userSessionManagement(number, data);
                    return `Thanks for your information
                            \nPlease type _*ok*_ for your data..`;
                default:
                    return `Please Type 1 or 2
                    \nYou can type _*#*_ any time for start the conversation from beginning(It will erase all your data)`;
            }
        }
    }
    mapValue(type) {
        let swimmingBehaviourType = {
            '1': 'Yes',
            '2': 'No'
        };
        return swimmingBehaviourType[type];
    }
};
SwimmingBehaviourService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [user_session_service_1.UserSessionService])
], SwimmingBehaviourService);
exports.SwimmingBehaviourService = SwimmingBehaviourService;
//# sourceMappingURL=swimming-behaviour.service.js.map