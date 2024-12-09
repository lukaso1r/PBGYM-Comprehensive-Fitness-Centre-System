import type { LoggedWorkerData } from '~/types';


export const checkPermission = (permissions: string[]) => {
    const workerPermissions = useCookie<LoggedWorkerData>('loggedWorkerData').value.permissions;

    if (workerPermissions.includes('ADMIN')) {
        return true;
    }
    return permissions.some(permission => workerPermissions.includes(permission));
};