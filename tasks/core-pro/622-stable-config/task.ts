/* Wykorzystaj odpowiedni mechanizm TypeScript, aby uniemożliwić zmianę jakichkolwiek wartości w obiekcie config
po jego zdefiniowaniu.
*/

const config = {
  api: {
    endpoint: 'https://api.example.com',
    timeout: 5000,
  },
  debug: true,
} as const

config.api.timeout = 10000;
config.debug = false;
