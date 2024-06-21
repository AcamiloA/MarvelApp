import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  if(req.url.indexOf("v1/Comics") > 0)
  {
    const token = localStorage.getItem("token");
    const clone = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });

    return next(clone);
  }
  return next(req);
};
