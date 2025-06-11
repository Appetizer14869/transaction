import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { of } from 'rxjs';

import { SPSOutgoingTransactionsDetailComponent } from './sps-outgoing-transactions-detail.component';

describe('SPSOutgoingTransactions Management Detail Component', () => {
  let comp: SPSOutgoingTransactionsDetailComponent;
  let fixture: ComponentFixture<SPSOutgoingTransactionsDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SPSOutgoingTransactionsDetailComponent],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              loadComponent: () =>
                import('./sps-outgoing-transactions-detail.component').then(m => m.SPSOutgoingTransactionsDetailComponent),
              resolve: { sPSOutgoingTransactions: () => of({ id: 29629 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(SPSOutgoingTransactionsDetailComponent, '')
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SPSOutgoingTransactionsDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('should load sPSOutgoingTransactions on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', SPSOutgoingTransactionsDetailComponent);

      // THEN
      expect(instance.sPSOutgoingTransactions()).toEqual(expect.objectContaining({ id: 29629 }));
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
