jest.mock('@ng-bootstrap/ng-bootstrap');

import { ComponentFixture, TestBed, fakeAsync, inject, tick } from '@angular/core/testing';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { SPSOutgoingTransactionsService } from '../service/sps-outgoing-transactions.service';

import { SPSOutgoingTransactionsDeleteDialogComponent } from './sps-outgoing-transactions-delete-dialog.component';

describe('SPSOutgoingTransactions Management Delete Component', () => {
  let comp: SPSOutgoingTransactionsDeleteDialogComponent;
  let fixture: ComponentFixture<SPSOutgoingTransactionsDeleteDialogComponent>;
  let service: SPSOutgoingTransactionsService;
  let mockActiveModal: NgbActiveModal;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SPSOutgoingTransactionsDeleteDialogComponent],
      providers: [provideHttpClient(), NgbActiveModal],
    })
      .overrideTemplate(SPSOutgoingTransactionsDeleteDialogComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(SPSOutgoingTransactionsDeleteDialogComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(SPSOutgoingTransactionsService);
    mockActiveModal = TestBed.inject(NgbActiveModal);
  });

  describe('confirmDelete', () => {
    it('should call delete service on confirmDelete', inject(
      [],
      fakeAsync(() => {
        // GIVEN
        jest.spyOn(service, 'delete').mockReturnValue(of(new HttpResponse({ body: {} })));

        // WHEN
        comp.confirmDelete(123);
        tick();

        // THEN
        expect(service.delete).toHaveBeenCalledWith(123);
        expect(mockActiveModal.close).toHaveBeenCalledWith('deleted');
      }),
    ));

    it('should not call delete service on clear', () => {
      // GIVEN
      jest.spyOn(service, 'delete');

      // WHEN
      comp.cancel();

      // THEN
      expect(service.delete).not.toHaveBeenCalled();
      expect(mockActiveModal.close).not.toHaveBeenCalled();
      expect(mockActiveModal.dismiss).toHaveBeenCalled();
    });
  });
});
