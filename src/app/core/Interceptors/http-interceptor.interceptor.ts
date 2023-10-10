import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, finalize } from 'rxjs';
import { LoaderService } from 'src/app/Shared/Services/loader-service/loader.service';

@Injectable()
export class HttpInterceptorInterceptor implements HttpInterceptor {
  constructor(private _loaderService: LoaderService) {}

  // it is function
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    console.log(request);

    // To show loader until data comes from Backend
    this._loaderService.show();

    let newRequest = request.clone({
      headers: request.headers.set(
        'token',
        `${localStorage.getItem('userToken')}`
      ),
    });

    return next
      .handle(newRequest)
      .pipe(finalize(() => this._loaderService.hide()));  // to hide loader after data already came 
  }
}
