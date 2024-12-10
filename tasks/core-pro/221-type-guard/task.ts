/* Mamy system obsługujący różne typy powiadomień. Każde powiadomienie ma wspólne
pole 'type', ale różne pozostałe pola.

Obecna implementacja używa prostego type guard, który nie wykorzystuje pełni możliwości TypeScriptu.

Twoim zadaniem jest:
  1. Dodaj nowy typ powiadomienia: 'SystemNotification' z polem 'log: string'.
  2. Rozbuduj funkcję getNotificationText tak, aby zwracała odpowiedni tekst dla każdego typu powiadomienia.
  3. Zabezpiecz funkcję getNotificationText przed niewłaściwym typem powiadomienia, zwracając "Unknown notification"
*/

type EmailNotification = {
  type: 'email';
  emailAddress: string;
  content: string;
};

type SMSNotification = {
  type: 'sms';
  phoneNumber: number;
  message: string;
};

type SystemNotification = {
  log: string
  type: 'system';
}

type Notification = EmailNotification | SMSNotification | SystemNotification;


// ❌ Ta funkcja wymaga poprawy:
export function getNotificationText(notification: Notification): string {
  if (notification.type === 'email') {
    return notification.content;
  } else if (notification.type === 'sms') {
    return notification.message;
  } else if (notification.type === 'system') {
    return notification.log;
  } else {
    return 'Unknown notification';
  }

  return ' ';
}


