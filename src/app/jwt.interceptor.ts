import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class JwtInterceptor implements HttpInterceptor {
  token: string | null = null;

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (this.token) {
      const clone = request.clone({ setHeaders: { Authorization: `Bearer ${this.token}` } });
      return next.handle(clone);
    }
    return next.handle(request);
  }

  setJwtToken(token: string): void {
    this.token = token;
  }

  removeJwtToken(): void {
    this.token = null;
  }
}
