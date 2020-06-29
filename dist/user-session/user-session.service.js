"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSessionService = void 0;
const common_1 = require("@nestjs/common");
const fs = require("fs");
const fs_1 = require("fs");
let UserSessionService = class UserSessionService {
    userSessionManagement(number, data) {
        fs.unlink(`${number}.json`, function (err) {
            if (err)
                throw err;
            console.log('File deleted!');
            fs.appendFile(`${number}.json`, JSON.stringify(data), 'utf8', function (err) {
                if (err)
                    throw err;
                console.log('Saved!');
            });
        });
    }
    userSessionCreate(number, data) {
        fs.appendFile(`${number}.json`, JSON.stringify(data), 'utf8', function (err) {
            if (err)
                throw err;
            console.log('Saved!');
        });
    }
    userSessionDelete(number) {
        fs.unlink(`${number}.json`, function (err) {
            if (err)
                throw err;
            console.log('File deleted!');
        });
    }
    contactSessionManagement(number, preData, latData) {
        fs.unlink(`${number}.json`, function (err) {
            if (err)
                throw err;
            console.log('File deleted!');
            const resData = {
                locationChoice: preData,
                locationData: latData
            };
            fs.appendFile(`${number}.json`, JSON.stringify(resData), 'utf8', function (err) {
                if (err)
                    throw err;
                console.log('Saved!');
            });
        });
    }
    async fsPromiseManagement(contact, data) {
        await fs_1.promises.writeFile(`${contact}.json`, JSON.stringify(data), 'utf8');
    }
};
UserSessionService = __decorate([
    common_1.Injectable()
], UserSessionService);
exports.UserSessionService = UserSessionService;
//# sourceMappingURL=user-session.service.js.map