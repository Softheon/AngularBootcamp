import { inject, TestBed } from '@angular/core/testing';

import { Config } from './config';
import { ConfigService } from './config.service';

describe('ConfigService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConfigService]
    });
  });

  it('should be created', inject([ConfigService], (service: ConfigService) => {
    expect(service)
      .toBeTruthy();
  }));

  it('should get/set the configs', inject([ConfigService], (service: ConfigService) => {
    // Arrange
    const mockConfig = new Config();

    // Act
    service.config = mockConfig;
    const config = service.config;

    // Assert
    expect(config)
      .toBeTruthy();
  }));

});
