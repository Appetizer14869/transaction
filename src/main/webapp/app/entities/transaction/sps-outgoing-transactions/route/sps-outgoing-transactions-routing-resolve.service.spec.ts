import { TestBed } from '@angular/core/testing';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { ActivatedRoute, ActivatedRouteSnapshot, Router, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';

import { ISPSOutgoingTransactions } from '../sps-outgoing-transactions.model';
import { SPSOutgoingTransactionsService } from '../service/sps-outgoing-transactions.service';

import sPSOutgoingTransactionsResolve from './sps-outgoing-transactions-routing-resolve.service';

describe('SPSOutgoingTransactions routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let service: SPSOutgoingTransactionsService;
  let resultSPSOutgoingTransactions: ISPSOutgoingTransactions | null | undefined;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({}),
            },
          },
        },
      ],
    });
    mockRouter = TestBed.inject(Router);
    jest.spyOn(mockRouter, 'navigate').mockImplementation(() => Promise.resolve(true));
    mockActivatedRouteSnapshot = TestBed.inject(ActivatedRoute).snapshot;
    service = TestBed.inject(SPSOutgoingTransactionsService);
    resultSPSOutgoingTransactions = undefined;
  });

  describe('resolve', () => {
    it('should return ISPSOutgoingTransactions returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      TestBed.runInInjectionContext(() => {
        sPSOutgoingTransactionsResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultSPSOutgoingTransactions = result;
          },
        });
      });

      // THEN
      expect(service.find).toHaveBeenCalledWith(123);
      expect(resultSPSOutgoingTransactions).toEqual({ id: 123 });
    });

    it('should return null if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      TestBed.runInInjectionContext(() => {
        sPSOutgoingTransactionsResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultSPSOutgoingTransactions = result;
          },
        });
      });

      // THEN
      expect(service.find).not.toHaveBeenCalled();
      expect(resultSPSOutgoingTransactions).toEqual(null);
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse<ISPSOutgoingTransactions>({ body: null })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      TestBed.runInInjectionContext(() => {
        sPSOutgoingTransactionsResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultSPSOutgoingTransactions = result;
          },
        });
      });

      // THEN
      expect(service.find).toHaveBeenCalledWith(123);
      expect(resultSPSOutgoingTransactions).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
