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
exports.GreetingService = void 0;
const common_1 = require("@nestjs/common");
const fs = require("fs");
const user_session_service_1 = require("../user-session/user-session.service");
const gps_location_service_1 = require("../gps-location/gps-location.service");
const reporter_details_service_1 = require("../reporter-details/reporter-details.service");
const water_type_service_1 = require("../water-type/water-type.service");
const main_water_source_service_1 = require("../main-water-source/main-water-source.service");
const culture_system_service_1 = require("../culture-system/culture-system.service");
const first_clinical_sign_choice_service_1 = require("../first-clinical-sign-choice/first-clinical-sign-choice.service");
const swimming_behaviour_service_1 = require("../swimming-behaviour/swimming-behaviour.service");
const second_clinical_sign_choice_service_1 = require("../second-clinical-sign-choice/second-clinical-sign-choice.service");
const MessagingResponse = require('twilio').twiml.MessagingResponse;
let GreetingService = class GreetingService {
    constructor(userSessionService, locationService, reporterService, waterTypeService, mainWaterTypeService, cultureSystemService, firstClinicSignSystemService, secondClinicSignSystemService, swimmingBehaviourService) {
        this.userSessionService = userSessionService;
        this.locationService = locationService;
        this.reporterService = reporterService;
        this.waterTypeService = waterTypeService;
        this.mainWaterTypeService = mainWaterTypeService;
        this.cultureSystemService = cultureSystemService;
        this.firstClinicSignSystemService = firstClinicSignSystemService;
        this.secondClinicSignSystemService = secondClinicSignSystemService;
        this.swimmingBehaviourService = swimmingBehaviourService;
    }
    async greeting(req, res) {
        const whatsAppNumber = req.body.From.split("+")[1];
        let message = req.body;
        const twiml = new MessagingResponse();
        if (fs.existsSync(`${whatsAppNumber}.json`)) {
            if (message.Body === "#") {
                this.userSessionService.userSessionDelete(whatsAppNumber);
                twiml.message("Your data has been removed.\nPlease type _*hi*_ to start conversation again.");
                res.writeHead(200, { 'Content-Type': 'text/xml' });
                res.end(twiml.toString());
            }
            else {
                let userData = JSON.parse(fs.readFileSync(`${whatsAppNumber}.json`, 'utf8'));
                if (!userData.locationData) {
                    let resultLoc = await this.locationService.locationManagement(whatsAppNumber, userData, message);
                    twiml.message(resultLoc);
                    res.writeHead(200, { 'Content-Type': 'text/xml' });
                    res.end(twiml.toString());
                }
                else if (!userData.reporterData) {
                    let resultReporter = await this.reporterService.reporterDataManagement(whatsAppNumber, message, userData);
                    twiml.message(resultReporter);
                    res.writeHead(200, { 'Content-Type': 'text/xml' });
                    res.end(twiml.toString());
                }
                else if (!userData.waterTypeData) {
                    let resultWater = await this.waterTypeService.waterTypeManagement(whatsAppNumber, message, userData);
                    twiml.message(resultWater);
                    res.writeHead(200, { 'Content-Type': 'text/xml' });
                    res.end(twiml.toString());
                }
                else if (!userData.mainWaterSourceData) {
                    let resultMainWaterSource = await this.mainWaterTypeService.mainWaterSourceManagement(whatsAppNumber, message, userData);
                    twiml.message(resultMainWaterSource);
                    res.writeHead(200, { 'Content-Type': 'text/xml' });
                    res.end(twiml.toString());
                }
                else if (!userData.cultureSystemData) {
                    await this.cultureSystemService.cultureSystemManagement(whatsAppNumber, message, userData, twiml);
                    res.writeHead(200, { 'Content-Type': 'text/xml' });
                    res.end(twiml.toString());
                }
                else if (!userData.firstClinicalSignData) {
                    await this.firstClinicSignSystemService.firstClinicalSignManagement(whatsAppNumber, message, userData, twiml);
                    res.writeHead(200, { 'Content-Type': 'text/xml' });
                    res.end(twiml.toString());
                }
                else if (!userData.secondClinicalSignData) {
                    await this.secondClinicSignSystemService.secondClinicalSignManagement(whatsAppNumber, message, userData, twiml);
                    res.writeHead(200, { 'Content-Type': 'text/xml' });
                    res.end(twiml.toString());
                }
                else if (!userData.swimmingChoice) {
                    let swimmingService = await this.swimmingBehaviourService.swimmingBehaviourManagement(whatsAppNumber, message, userData);
                    twiml.message(swimmingService);
                    res.writeHead(200, { 'Content-Type': 'text/xml' });
                    res.end(twiml.toString());
                }
                else {
                    if (message.Body.toLowerCase() === "ok") {
                        if (userData.locationData.latitude) {
                            twiml.message("*_USER-DATA_*: "
                                + "\n_1)GPS-LOCATION-DATA_--> "
                                + "\n*LATITUDE*: " + JSON.parse(JSON.stringify(userData.locationData.latitude))
                                + "\n*LONGITUDE*: " + JSON.parse(JSON.stringify(userData.locationData.longitude))
                                + "\n_2)DETAILS-OF-REPORTER_--> "
                                + "\n*REPORTER-NAME*: " + JSON.parse(JSON.stringify(userData.reporterData.reporterName))
                                + "\n*REPORTER-MOBILE NUMBER*: " + JSON.parse(JSON.stringify(userData.reporterData.reporterMobile))
                                + "\n*REPORTER-EMAIL*: " + JSON.parse(JSON.stringify(userData.reporterData.reporterEmail))
                                + "\n_3)WATER-TYPE_--> " + userData.waterTypeData
                                + "\n_4)MAIN-WATER-SOURCE_--> " + userData.mainWaterSourceData
                                + "\n_5)DESCRIPTION-OF-CULTURE-SYSTEM_--> " + userData.cultureSystemData + "."
                                + "\n_6)a)FIRST-CLINICAL-SIGN-CHOICE_--> " + userData.firstClinicalSignData + "."
                                + "\n_6)b)SECOND-CLINICAL-SIGN-CHOICE_--> " + userData.secondClinicalSignData + "."
                                + "\n_7)SWIMMING-BEHAVIOUR-CHOICE_--> " + userData.swimmingChoice + ".");
                            twiml.message("Please type # to restart again ");
                            res.writeHead(200, { 'Content-Type': 'text/xml' });
                            res.end(twiml.toString());
                        }
                        else {
                            twiml.message("*_USER-DATA_*: "
                                + "\n_1)GPS-LOCATION-DATA_--> "
                                + "\n*VILLAGE-NAME*: " + JSON.parse(JSON.stringify(userData.locationData.villageName))
                                + "\n*DISTRICT-NAME*: " + JSON.parse(JSON.stringify(userData.locationData.districtName))
                                + "\n*STATE-NAME*: " + JSON.parse(JSON.stringify(userData.locationData.stateName))
                                + "\n*COUNTRY-NAME*: " + JSON.parse(JSON.stringify(userData.locationData.countryName))
                                + "\n_2)DETAILS-OF-REPORTER_--> "
                                + "\n*REPORTER-NAME*: " + JSON.parse(JSON.stringify(userData.reporterData.reporterName))
                                + "\n*REPORTER-MOBILE NUMBER*: " + JSON.parse(JSON.stringify(userData.reporterData.reporterMobile))
                                + "\n*REPORTER-EMAIL*: " + JSON.parse(JSON.stringify(userData.reporterData.reporterEmail))
                                + "\n_3)WATER-TYPE_--> " + userData.waterTypeData
                                + "\n_4)MAIN-WATER-SOURCE_--> " + userData.mainWaterSourceData
                                + "\n_5)DESCRIPTION-OF-CULTURE-SYSTEM_--> " + userData.cultureSystemData + "."
                                + "\n_6)a)FIRST-CLINICAL-SIGN-CHOICE_--> " + userData.firstClinicalSignData + "."
                                + "\n_6)b)SECOND-CLINICAL-SIGN-CHOICE_--> " + userData.secondClinicalSignData + "."
                                + "\n_7)SWIMMING-BEHAVIOUR-CHOICE_--> " + userData.swimmingChoice + ".");
                            twiml.message("Please type # to restart again");
                            res.writeHead(200, { 'Content-Type': 'text/xml' });
                            res.end(twiml.toString());
                        }
                    }
                    else {
                        twiml.message("Please type _*ok*_");
                        res.writeHead(200, { 'Content-Type': 'text/xml' });
                        res.end(twiml.toString());
                    }
                }
            }
        }
        else {
            const defaultData = {
                locationChoice: null,
                locationData: null,
                reporterData: null,
                waterTypeData: null,
                mainWaterSourceData: null,
                cultureSystemData: null,
                firstClinicalSignData: null,
                secondClinicalSignData: null,
                swimmingChoice: null
            };
            this.userSessionService.userSessionCreate(whatsAppNumber, defaultData);
            twiml.message("WELCOME TO WORLDFISH");
            twiml.message("What Would you like to do?");
            twiml.message(`Please Provide Gps Location by selecting any one method :
                          \n1)Share your Whatsapp Current Location directly
                          \n2)Manual Entry`);
            res.writeHead(200, { 'Content-Type': 'text/xml' });
            res.end(twiml.toString());
        }
    }
};
GreetingService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [user_session_service_1.UserSessionService,
        gps_location_service_1.GpsLocationService,
        reporter_details_service_1.ReporterDetailsService,
        water_type_service_1.WaterTypeService,
        main_water_source_service_1.MainWaterSourceService,
        culture_system_service_1.CultureSystemService,
        first_clinical_sign_choice_service_1.ClinicalSignChoiceService,
        second_clinical_sign_choice_service_1.SecondClinicalSignChoiceService,
        swimming_behaviour_service_1.SwimmingBehaviourService])
], GreetingService);
exports.GreetingService = GreetingService;
//# sourceMappingURL=greeting.service.js.map