import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggingService {
log(message:string){
  const timeSAMP = new Date().toLocaleTimeString();
  console.log(`[${timeSAMP}]:${message}`)
}
}
