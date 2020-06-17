import { Injectable } from '@nestjs/common';
import * as fs from 'fs'
import { promises as asyncFs } from 'fs';

@Injectable()
export class UserSessionService {
    userSessionManagement(number: string, data:any):any{
        fs.unlink(`${number}.json`, function (err: any) {
            if (err) throw err;
            console.log('File deleted!');
        fs.appendFile(`${number}.json`, JSON.stringify(data), 'utf8', function (err:any) {
            if (err) throw err;
            console.log('Saved!');
            });
        })
    }
    userSessionCreate(number: string,data: object){
        fs.appendFile(`${number}.json`, JSON.stringify(data), 'utf8', function (err: any) {
            if (err) throw err;
            console.log('Saved!');
            });
    }
    userSessionDelete(number:string){ 
        fs.unlink(`${number}.json`, function (err: any) {
            if (err) throw err;
            console.log('File deleted!');
        })
    }
    contactSessionManagement(number:string, preData:string, latData:string ){
        fs.unlink(`${number}.json`, function (err: any) {
            if (err) throw err;
            console.log('File deleted!');
        const resData:object = {
            locationChoice:preData,
            locationData:latData
        }
        fs.appendFile(`${number}.json`, JSON.stringify(resData), 'utf8', function (err:any) {
            if (err) throw err;
            console.log('Saved!');
            });
        })
    }
    async fsPromiseManagement(contact:string, data:object):Promise<any>{
        await asyncFs.writeFile(`${contact}.json`, JSON.stringify(data), 'utf8') ;
    }
}
