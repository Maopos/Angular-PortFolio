import { Injectable } from '@angular/core';
import { rejects } from 'assert';
import { resolve } from 'path';
import { promise } from 'protractor';
import { Global } from "./global";

@Injectable()
export class UploadService {

    public url : string;

        constructor() {
            this.url = Global.url;
        }

        makeFileRequest(url: string, params: Array<string>, files: Array<File>, name: string){
                return new Promise(function(resolve, reject) {
                      var formData: any = new FormData();
                      var xhr = new XMLHttpRequest();
                      
                      for (let index = 0; index < files.length; index++) {
                          formData.append(name, files[index], files[index].name)
                
                      }

                      xhr.onreadystatechange = function () {
                          if(xhr.readyState == 4) {
                              if(xhr.status == 200) {
                                  resolve(JSON.parse(xhr.response));
                              }
                              else {
                                  reject(xhr.response)
                              }
                          }
                      }

                      xhr.open('POST', url, true);
                      xhr.send(formData);
                });
        }
}
