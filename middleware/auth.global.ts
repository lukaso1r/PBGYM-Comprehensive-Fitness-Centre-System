import { useLoginStore } from '~/stores/loginStore';
import { navigateTo } from '#app';

export default defineNuxtRouteMiddleware((to) => {
  const loginStore = useLoginStore();
  const workerPermissions = loginStore.loggedWorkerData?.permissions || [];

  // Jeżeli użytkownik ma rolę 'ADMIN', pozwól na wszystko
  if (workerPermissions.includes('ADMIN')) {
    return;
  }

  const routePermissions: Record<string, string[]> = {
    '/admin-panel/zarzadzanie/pracownicy': ['ADMIN'],
    '/admin-panel/zarzadzanie/klienci': ['MEMBER_MANAGEMENT'],
    '/admin-panel/zarzadzanie/trenerzy': ['TRAINER_MANAGEMENT'],
    '/admin-panel/zarzadzanie/zajecia': ['GROUP_CLASS_MANAGEMENT'],
    '/admin-panel/sprzedaz/oferta': ['PASS_MANAGEMENT'],
    '/admin-panel/sprzedaz/oferta/addNewPass': ['PASS_MANAGEMENT'],
    '/admin-panel/statystyki': ['STATISTICS'],
    '/admin-panel/blog': ['BLOG'],
    '/admin-panel/adminLogs': ['ADMIN'],
  };

  const requiredPermissions = routePermissions[to.path];

  // Logowanie w celu diagnostyki
  console.log('Current path:', to.path);
  console.log('Worker permissions:', workerPermissions);
  console.log('Required permissions:', requiredPermissions);

  if (requiredPermissions && !requiredPermissions.some((perm) => workerPermissions.includes(perm))) {
    console.warn('Access denied. Redirecting...');
    return navigateTo('/');
  }
});
