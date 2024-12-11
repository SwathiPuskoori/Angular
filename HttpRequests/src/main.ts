import { bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from './app/app.component';
import { HttpHandlerFn, HttpRequest, provideHttpClient, withInterceptors } from '@angular/common/http';

function logginInterceptors(
    request: HttpRequest<unknown>,
    next: HttpHandlerFn
){
console.log('[outgoin request]');
console.log(request);
return next(request);
}
bootstrapApplication(AppComponent,{
    providers: [provideHttpClient(withInterceptors([logginInterceptors]))]
}).catch((err) => console.error(err));
