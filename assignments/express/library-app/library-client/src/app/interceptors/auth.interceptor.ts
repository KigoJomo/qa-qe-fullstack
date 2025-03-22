import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // Clone the request and add withCredentials flag
  const authReq = req.clone({
    withCredentials: true,
  });

  // Send the cloned request to the next handler
  return next(authReq);
};
