export const environment = {
  production: true,
  apiBaseUri: `${window.location.protocol}//${window.location.hostname}${window.location.port ? `:${window.location.port}` : ''}`,
  baseHref: '/',
  moduleHref: '/moduleName', //replace with the modules name
  languagePath: './features/moduleName/assets/i18n/'
};
