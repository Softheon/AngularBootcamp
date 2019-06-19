// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
export const environment = {
  /** True if production code */
  production: false,
  /** The base URI for API calls */
  apiBaseUri: 'https://localhost:44369/',
  /** The base URI of the website */
  baseHref: '/',
  /** The module URI*/
  moduleHref: '/moduleName', //replace with the modules name
  /** The language file path */
  languagePath: './assets/i18n/'
};
