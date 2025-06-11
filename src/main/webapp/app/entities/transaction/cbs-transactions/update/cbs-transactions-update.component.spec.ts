import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, from, of } from 'rxjs';

import { CBSTransactionsService } from '../service/cbs-transactions.service';
import { ICBSTransactions } from '../cbs-transactions.model';
import { CBSTransactionsFormService } from './cbs-transactions-form.service';

import { CBSTransactionsUpdateComponent } from './cbs-transactions-update.component';

describe('CBSTransactions Management Update Component', () => {
  let comp: CBSTransactionsUpdateComponent;
  let fixture: ComponentFixture<CBSTransactionsUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let cBSTransactionsFormService: CBSTransactionsFormService;
  let cBSTransactionsService: CBSTransactionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CBSTransactionsUpdateComponent],
      providers: [
        provideHttpClient(),
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(CBSTransactionsUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(CBSTransactionsUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    cBSTransactionsFormService = TestBed.inject(CBSTransactionsFormService);
    cBSTransactionsService = TestBed.inject(CBSTransactionsService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('should update editForm', () => {
      const cBSTransactions: ICBSTransactions = { id: 27131 };

      activatedRoute.data = of({ cBSTransactions });
      comp.ngOnInit();

      expect(comp.cBSTransactions).toEqual(cBSTransactions);
    });
  });

  describe('save', () => {
    it('should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICBSTransactions>>();
      const cBSTransactions = { id: 13778 };
      jest.spyOn(cBSTransactionsFormService, 'getCBSTransactions').mockReturnValue(cBSTransactions);
      jest.spyOn(cBSTransactionsService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ cBSTransactions });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: cBSTransactions }));
      saveSubject.complete();

      // THEN
      expect(cBSTransactionsFormService.getCBSTransactions).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(cBSTransactionsService.update).toHaveBeenCalledWith(expect.objectContaining(cBSTransactions));
      expect(comp.isSaving).toEqual(false);
    });

    it('should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICBSTransactions>>();
      const cBSTransactions = { id: 13778 };
      jest.spyOn(cBSTransactionsFormService, 'getCBSTransactions').mockReturnValue({ id: null });
      jest.spyOn(cBSTransactionsService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ cBSTransactions: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: cBSTransactions }));
      saveSubject.complete();

      // THEN
      expect(cBSTransactionsFormService.getCBSTransactions).toHaveBeenCalled();
      expect(cBSTransactionsService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICBSTransactions>>();
      const cBSTransactions = { id: 13778 };
      jest.spyOn(cBSTransactionsService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ cBSTransactions });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(cBSTransactionsService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
