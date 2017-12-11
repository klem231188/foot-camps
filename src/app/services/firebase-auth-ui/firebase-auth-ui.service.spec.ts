import { TestBed, inject } from '@angular/core/testing';

import { FirebaseAuthUiService } from './firebase-auth-ui.service';

describe('FirebaseAuthUiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FirebaseAuthUiService]
    });
  });

  it('should be created', inject([FirebaseAuthUiService], (service: FirebaseAuthUiService) => {
    expect(service).toBeTruthy();
  }));
});
