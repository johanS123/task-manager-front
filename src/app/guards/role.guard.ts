import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const roleGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  const userRoles = authService.getUserRoles();
  const requitedRole = route.data['role'];

  if (userRoles.includes(requitedRole)) {
    return true;
  }

  // router.navigate(['/no-access']);
  return false;
};
