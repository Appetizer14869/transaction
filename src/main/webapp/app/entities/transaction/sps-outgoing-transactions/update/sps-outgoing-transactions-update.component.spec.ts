import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, from, of } from 'rxjs';

import { SPSOutgoingTransactionsService } from '../service/sps-outgoing-transactions.service';
import { ISPSOutgoingTransactions } from '../sps-outgoing-transactions.model';
import { SPSOutgoingTransactionsFormService } from './sps-outgoing-transactions-form.service';

import { SPSOutgoingTransactionsUpdateComponent } from './sps-outgoing-transactions-update.component';

describe('SPSOutgoingTransactions Management Update Component', () => {
  let comp: SPSOutgoingTransactionsUpdateComponent;
  let fixture: ComponentFixture<SPSOutgoingTransactionsUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let sPSOutgoingTransactionsFormService: SPSOutgoingTransactionsFormService;
  let sPSOutgoingTransactionsService: SPSOutgoingTransactionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SPSOutgoingTransactionsUpdateComponent],
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
      .overrideTemplate(SPSOutgoingTransactionsUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(SPSOutgoingTransactionsUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    sPSOutgoingTransactionsFormService = TestBed.inject(SPSOutgoingTransactionsFormService);
    sPSOutgoingTransactionsService = TestBed.inject(SPSOutgoingTransactionsService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('should update editForm', () => {
      const sPSOutgoingTransactions: ISPSOutgoingTransactions = { id: 5895 };

      activatedRoute.data = of({ sPSOutgoingTransactions });
      comp.ngOnInit();

      expect(comp.sPSOutgoingTransactions).toEqual(sPSOutgoingTransactions);
    });
  });

  describe('save', () => {
    it('should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ISPSOutgoingTransactions>>();
      const sPSOutgoingTransactions = { id: 29629 };
      jest.spyOn(sPSOutgoingTransactionsFormService, 'getSPSOutgoingTransactions').mockReturnValue(sPSOutgoingTransactions);
      jest.spyOn(sPSOutgoingTransactionsService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ sPSOutgoingTransactions });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: sPSOutgoingTransactions }));
      saveSubject.complete();

      // THEN
      expect(sPSOutgoingTransactionsFormService.getSPSOutgoingTransactions).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(sPSOutgoingTransactionsService.update).toHaveBeenCalledWith(expect.objectContaining(sPSOutgoingTransactions));
      expect(comp.isSaving).toEqual(false);
    });

    it('should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ISPSOutgoingTransactions>>();
      const sPSOutgoingTransactions = { id: 29629 };
      jest.spyOn(sPSOutgoingTransactionsFormService, 'getSPSOutgoingTransactions').mockReturnValue({ id: null });
      jest.spyOn(sPSOutgoingTransactionsService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ sPSOutgoingTransactions: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: sPSOutgoingTransactions }));
      saveSubject.complete();

      // THEN
      expect(sPSOutgoingTransactionsFormService.getSPSOutgoingTransactions).toHaveBeenCalled();
      expect(sPSOutgoingTransactionsService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ISPSOutgoingTransactions>>();
      const sPSOutgoingTransactions = { id: 29629 };
      jest.spyOn(sPSOutgoingTransactionsService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ sPSOutgoingTransactions });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(sPSOutgoingTransactionsService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
