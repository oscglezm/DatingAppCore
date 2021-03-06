import { Injectable } from '@angular/core';

import * as alertify from 'alertifyjs';

@Injectable({
  providedIn: 'root'
})
export class AlertifyService {

constructor() { }

    confirm(message: string, okCallback: () => any){
        alertify.confirm(message, (e: any) => {
          if(e){
            okCallback();
          } else {}
        });
    }

    success(messagge: string) {
      alertify.success(messagge);
    }

    error(messagge: string) {
      alertify.error(messagge);
    }

    warning(messagge: string) {
      alertify.warning(messagge);
    }

    message(messagge: string) {
      alertify.message(messagge);
    }
}
