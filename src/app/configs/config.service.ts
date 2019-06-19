import { Injectable } from '@angular/core';

import { Config } from './config';

/**
 * The Config service is used to get the applications configurations
 */
@Injectable()
export class ConfigService {

  /** The configurations */
  private _config: Config;

  constructor() { }

  /**
   * Gets the configuration value
   */
  public get config(): Config {
    return this._config;
  }

  /**
   * Sets the configuration
   * @param config - The configuration to be set
   */
  public set config(config: Config) {
    this._config = config;
  }
}
