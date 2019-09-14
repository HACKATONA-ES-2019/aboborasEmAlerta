import { messaging } from '../lib/firebase';

export const requestNotificationPermission = () => {
  messaging
    .requestPermission()
    .then(() => {
      console.log('Permissão Fornecida');
    })
    .catch(() => {
      console.error('Permissão para notificações negada, encerrando aplicação');
    });
};
