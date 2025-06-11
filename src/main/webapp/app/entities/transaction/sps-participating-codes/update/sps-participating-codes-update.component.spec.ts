import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, from, of } from 'rxjs';

import { SPSParticipatingCodesService } from '../service/sps-participating-codes.service';
import { ISPSParticipatingCodes } from '../sps-participating-codes.model';
import { SPSParticipatingCodesFormService } from './sps-participating-codes-form.service';

import { SPSParticipatingCodesUpdateComponent } from './sps-participating-codes-update.component';

describe('SPSParticipatingCodes Management Update Component', () => {
  let comp: SPSParticipatingCodesUpdateComponent;
  let fixture: ComponentFixture<SPSParticipatingCodesUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let sPSParticipatingCodesFormService: SPSParticipatingCodesFormService;
  let sPSParticipatingCodesService: SPSParticipatingCodesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SPSParticipatingCodesUpdateComponent],
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
      .overrideTemplate(SPSParticipatingCodesUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(SPSParticipatingCodesUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    sPSParticipatingCodesFormService = TestBed.inject(SPSParticipatingCodesFormService);
    sPSParticipatingCodesService = TestBed.inject(SPSParticipatingCodesService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('should update editForm', () => {
      const sPSParticipatingCodes: ISPSParticipatingCodes = { id: 23678 };

      activatedRoute.data = of({ sPSParticipatingCodes });
      comp.ngOnInit();

      expect(comp.sPSParticipatingCodes).toEqual(sPSParticipatingCodes);
    });
  });

  describe('save', () => {
    it('should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ISPSParticipatingCodes>>();
      const sPSParticipatingCodes = { id: 11168 };
      jest.spyOn(sPSParticipatingCodesFormService, 'getSPSParticipatingCodes').mockReturnValue(sPSParticipatingCodes);
      jest.spyOn(sPSParticipatingCodesService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ sPSParticipatingCodes });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: sPSParticipatingCodes }));
      saveSubject.complete();

      // THEN
      expect(sPSParticipatingCodesFormService.getSPSParticipatingCodes).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(sPSParticipatingCodesService.update).toHaveBeenCalledWith(expect.objectContaining(sPSParticipatingCodes));
      expect(comp.isSaving).toEqual(false);
    });

    it('should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ISPSParticipatingCodes>>();
      const sPSParticipatingCodes = { id: 11168 };
      jest.spyOn(sPSParticipatingCodesFormService, 'getSPSParticipatingCodes').mockReturnValue({ id: null });
      jest.spyOn(sPSParticipatingCodesService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ sPSParticipatingCodes: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: sPSParticipatingCodes }));
      saveSubject.complete();

      // THEN
      expect(sPSParticipatingCodesFormService.getSPSParticipatingCodes).toHaveBeenCalled();
      expect(sPSParticipatingCodesService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ISPSParticipatingCodes>>();
      const sPSParticipatingCodes = { id: 11168 };
      jest.spyOn(sPSParticipatingCodesService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ sPSParticipatingCodes });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(sPSParticipatingCodesService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
