import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { of } from 'rxjs';

import { CBSTransactionsDetailComponent } from './cbs-transactions-detail.component';

describe('CBSTransactions Management Detail Component', () => {
  let comp: CBSTransactionsDetailComponent;
  let fixture: ComponentFixture<CBSTransactionsDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CBSTransactionsDetailComponent],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              loadComponent: () => import('./cbs-transactions-detail.component').then(m => m.CBSTransactionsDetailComponent),
              resolve: { cBSTransactions: () => of({ id: 13778 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(CBSTransactionsDetailComponent, '')
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CBSTransactionsDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('should load cBSTransactions on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', CBSTransactionsDetailComponent);

      // THEN
      expect(instance.cBSTransactions()).toEqual(expect.objectContaining({ id: 13778 }));
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
