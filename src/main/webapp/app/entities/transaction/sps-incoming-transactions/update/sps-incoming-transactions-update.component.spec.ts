import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, from, of } from 'rxjs';

import { SPSIncomingTransactionsService } from '../service/sps-incoming-transactions.service';
import { ISPSIncomingTransactions } from '../sps-incoming-transactions.model';
import { SPSIncomingTransactionsFormService } from './sps-incoming-transactions-form.service';

import { SPSIncomingTransactionsUpdateComponent } from './sps-incoming-transactions-update.component';

describe('SPSIncomingTransactions Management Update Component', () => {
  let comp: SPSIncomingTransactionsUpdateComponent;
  let fixture: ComponentFixture<SPSIncomingTransactionsUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let sPSIncomingTransactionsFormService: SPSIncomingTransactionsFormService;
  let sPSIncomingTransactionsService: SPSIncomingTransactionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SPSIncomingTransactionsUpdateComponent],
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
      .overrideTemplate(SPSIncomingTransactionsUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(SPSIncomingTransactionsUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    sPSIncomingTransactionsFormService = TestBed.inject(SPSIncomingTransactionsFormService);
    sPSIncomingTransactionsService = TestBed.inject(SPSIncomingTransactionsService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('should update editForm', () => {
      const sPSIncomingTransactions: ISPSIncomingTransactions = { id: 30531 };

      activatedRoute.data = of({ sPSIncomingTransactions });
      comp.ngOnInit();

      expect(comp.sPSIncomingTransactions).toEqual(sPSIncomingTransactions);
    });
  });

  describe('save', () => {
    it('should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ISPSIncomingTransactions>>();
      const sPSIncomingTransactions = { id: 6756 };
      jest.spyOn(sPSIncomingTransactionsFormService, 'getSPSIncomingTransactions').mockReturnValue(sPSIncomingTransactions);
      jest.spyOn(sPSIncomingTransactionsService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ sPSIncomingTransactions });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: sPSIncomingTransactions }));
      saveSubject.complete();

      // THEN
      expect(sPSIncomingTransactionsFormService.getSPSIncomingTransactions).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(sPSIncomingTransactionsService.update).toHaveBeenCalledWith(expect.objectContaining(sPSIncomingTransactions));
      expect(comp.isSaving).toEqual(false);
    });

    it('should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ISPSIncomingTransactions>>();
      const sPSIncomingTransactions = { id: 6756 };
      jest.spyOn(sPSIncomingTransactionsFormService, 'getSPSIncomingTransactions').mockReturnValue({ id: null });
      jest.spyOn(sPSIncomingTransactionsService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ sPSIncomingTransactions: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: sPSIncomingTransactions }));
      saveSubject.complete();

      // THEN
      expect(sPSIncomingTransactionsFormService.getSPSIncomingTransactions).toHaveBeenCalled();
      expect(sPSIncomingTransactionsService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ISPSIncomingTransactions>>();
      const sPSIncomingTransactions = { id: 6756 };
      jest.spyOn(sPSIncomingTransactionsService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ sPSIncomingTransactions });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(sPSIncomingTransactionsService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
