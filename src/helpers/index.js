import { messaging } from '../lib/firebase';

export const requestNotificationPermission = async () => {
  try {
    await messaging.requestPermission();
    const token = await messaging.getToken();
    return token;
  } catch (e) {
    console.log(e); 
    console.error('Permissão para notificações negada, encerrando aplicação');
  }
};

export function getCurrentPosition(options = {}) {
  return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, options);
  });
}