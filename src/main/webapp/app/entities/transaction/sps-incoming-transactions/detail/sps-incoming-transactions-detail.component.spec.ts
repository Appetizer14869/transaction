import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { of } from 'rxjs';

import { SPSIncomingTransactionsDetailComponent } from './sps-incoming-transactions-detail.component';

describe('SPSIncomingTransactions Management Detail Component', () => {
  let comp: SPSIncomingTransactionsDetailComponent;
  let fixture: ComponentFixture<SPSIncomingTransactionsDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SPSIncomingTransactionsDetailComponent],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              loadComponent: () =>
                import('./sps-incoming-transactions-detail.component').then(m => m.SPSIncomingTransactionsDetailComponent),
              resolve: { sPSIncomingTransactions: () => of({ id: 6756 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(SPSIncomingTransactionsDetailComponent, '')
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SPSIncomingTransactionsDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('should load sPSIncomingTransactions on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', SPSIncomingTransactionsDetailComponent);

      // THEN
      expect(instance.sPSIncomingTransactions()).toEqual(expect.objectContaining({ id: 6756 }));
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
