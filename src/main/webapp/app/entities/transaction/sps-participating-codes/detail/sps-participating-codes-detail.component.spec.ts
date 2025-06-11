import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { of } from 'rxjs';

import { SPSParticipatingCodesDetailComponent } from './sps-participating-codes-detail.component';

describe('SPSParticipatingCodes Management Detail Component', () => {
  let comp: SPSParticipatingCodesDetailComponent;
  let fixture: ComponentFixture<SPSParticipatingCodesDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SPSParticipatingCodesDetailComponent],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              loadComponent: () => import('./sps-participating-codes-detail.component').then(m => m.SPSParticipatingCodesDetailComponent),
              resolve: { sPSParticipatingCodes: () => of({ id: 11168 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(SPSParticipatingCodesDetailComponent, '')
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SPSParticipatingCodesDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('should load sPSParticipatingCodes on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', SPSParticipatingCodesDetailComponent);

      // THEN
      expect(instance.sPSParticipatingCodes()).toEqual(expect.objectContaining({ id: 11168 }));
    });
  });

  describe('PreviousState', () => {
    it('should navigate to previous state', () => {
      jest.spyOn(window.history, 'back');
      comp.previousState();
      expect(window.history.back).toHaveBeenCalled();
    });
  });
});
