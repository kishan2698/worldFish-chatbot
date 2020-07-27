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
exports.GpsLocationService = void 0;
const common_1 = require("@nestjs/common");
const user_session_service_1 = require("../user-session/user-session.service");
const fs = require("fs");
let GpsLocationService = class GpsLocationService {
    constructor(userSessionService) {
        this.userSessionService = userSessionService;
    }
    async locationManagement(number, userData, message) {
        if (!userData.locationChoice) {
            let data = {
                locationChoice: message.Body,
                locationData: null,
            };
            await this.userSessionService.fsPromiseManagement(number, data);
            userData = JSON.parse(fs.readFileSync(`${number}.json`, 'utf8'));
        }
        switch (userData.locationChoice) {
            case "1":
                if (!message.Latitude) {
                    return `Please Share your current location`;
                }
                else {
                    let locData = {
                        locationChoice: userData.locationChoice,
                        locationData: { latitude: message.Latitude, longitude: message.Longitude },
                        reporterName: null
                    };
                    this.userSessionService.userSessionManagement(number, locData);
                    return `2)Details Of Reporter:
                            \nPlease Enter Your Name`;
                }
            case "2":
                if (!userData.villageName) {
                    if (userData.isVisited) {
                        let locData = {
                            locationChoice: userData.locationChoice,
                            locationData: null,
                            villageName: message.Body
                        };
                        this.userSessionService.userSessionManagement(number, locData);
                        return `Please Enter Your District Name`;
                    }
                    else {
                        let locData = {
                            locationChoice: userData.locationChoice,
                            locationData: null,
                            isVisited: true
                        };
                        this.userSessionService.userSessionManagement(number, locData);
                        return `Please Enter Your Village Name`;
                    }
                }
                else if (!userData.districtName) {
                    let locData = {
                        locationChoice: userData.locationChoice,
                        locationData: null,
                        villageName: userData.villageName,
                        districtName: message.Body,
                        stateName: null
                    };
                    this.userSessionService.userSessionManagement(number, locData);
                    return `Please Enter Your State Name`;
                }
                else if (!userData.stateName) {
                    let locData = {
                        locationChoice: userData.locationChoice,
                        locationData: null,
                        villageName: userData.villageName,
                        districtName: userData.districtName,
                        stateName: message.Body,
                        countryName: null
                    };
                    this.userSessionService.userSessionManagement(number, locData);
                    return `Please Enter Your Country Name`;
                }
                else if (!userData.countryName) {
                    let locData = {
                        locationChoice: userData.locationChoice,
                        locationData: { villageName: userData.villageName, districtName: userData.districtName, stateName: userData.stateName, countryName: message.Body }
                    };
                    this.userSessionService.userSessionManagement(number, locData);
                    return `Details Of Reporter:
                        \nPlease Enter Your Name`;
                }
            default:
                return `Please type _*1*_ or _*2*_\nYou can type _*#*_ any time for start the conversation from beginning(It will erase all your data)`;
        }
    }
};
GpsLocationService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [user_session_service_1.UserSessionService])
], GpsLocationService);
exports.GpsLocationService = GpsLocationService;
//# sourceMappingURL=gps-location.service.js.map