import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { ISPSIncomingTransactions } from '../sps-incoming-transactions.model';
import {
  sampleWithFullData,
  sampleWithNewData,
  sampleWithPartialData,
  sampleWithRequiredData,
} from '../sps-incoming-transactions.test-samples';

import { RestSPSIncomingTransactions, SPSIncomingTransactionsService } from './sps-incoming-transactions.service';

const requireRestSample: RestSPSIncomingTransactions = {
  ...sampleWithRequiredData,
  requestInstanttime: sampleWithRequiredData.requestInstanttime?.toJSON(),
};

describe('SPSIncomingTransactions Service', () => {
  let service: SPSIncomingTransactionsService;
  let httpMock: HttpTestingController;
  let expectedResult: ISPSIncomingTransactions | ISPSIncomingTransactions[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(SPSIncomingTransactionsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should create a SPSIncomingTransactions', () => {
      const sPSIncomingTransactions = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(sPSIncomingTransactions).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a SPSIncomingTransactions', () => {
      const sPSIncomingTransactions = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(sPSIncomingTransactions).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a SPSIncomingTransactions', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of SPSIncomingTransactions', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a SPSIncomingTransactions', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addSPSIncomingTransactionsToCollectionIfMissing', () => {
      it('should add a SPSIncomingTransactions to an empty array', () => {
        const sPSIncomingTransactions: ISPSIncomingTransactions = sampleWithRequiredData;
        expectedResult = service.addSPSIncomingTransactionsToCollectionIfMissing([], sPSIncomingTransactions);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(sPSIncomingTransactions);
      });

      it('should not add a SPSIncomingTransactions to an array that contains it', () => {
        const sPSIncomingTransactions: ISPSIncomingTransactions = sampleWithRequiredData;
        const sPSIncomingTransactionsCollection: ISPSIncomingTransactions[] = [
          {
            ...sPSIncomingTransactions,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addSPSIncomingTransactionsToCollectionIfMissing(
          sPSIncomingTransactionsCollection,
          sPSIncomingTransactions,
        );
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a SPSIncomingTransactions to an array that doesn't contain it", () => {
        const sPSIncomingTransactions: ISPSIncomingTransactions = sampleWithRequiredData;
        const sPSIncomingTransactionsCollection: ISPSIncomingTransactions[] = [sampleWithPartialData];
        expectedResult = service.addSPSIncomingTransactionsToCollectionIfMissing(
          sPSIncomingTransactionsCollection,
          sPSIncomingTransactions,
        );
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(sPSIncomingTransactions);
      });

      it('should add only unique SPSIncomingTransactions to an array', () => {
        const sPSIncomingTransactionsArray: ISPSIncomingTransactions[] = [
          sampleWithRequiredData,
          sampleWithPartialData,
          sampleWithFullData,
        ];
        const sPSIncomingTransactionsCollection: ISPSIncomingTransactions[] = [sampleWithRequiredData];
        expectedResult = service.addSPSIncomingTransactionsToCollectionIfMissing(
          sPSIncomingTransactionsCollection,
          ...sPSIncomingTransactionsArray,
        );
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const sPSIncomingTransactions: ISPSIncomingTransactions = sampleWithRequiredData;
        const sPSIncomingTransactions2: ISPSIncomingTransactions = sampleWithPartialData;
        expectedResult = service.addSPSIncomingTransactionsToCollectionIfMissing([], sPSIncomingTransactions, sPSIncomingTransactions2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(sPSIncomingTransactions);
        expect(expectedResult).toContain(sPSIncomingTransactions2);
      });

      it('should accept null and undefined values', () => {
        const sPSIncomingTransactions: ISPSIncomingTransactions = sampleWithRequiredData;
        expectedResult = service.addSPSIncomingTransactionsToCollectionIfMissing([], null, sPSIncomingTransactions, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(sPSIncomingTransactions);
      });

      it('should return initial array if no SPSIncomingTransactions is added', () => {
        const sPSIncomingTransactionsCollection: ISPSIncomingTransactions[] = [sampleWithRequiredData];
        expectedResult = service.addSPSIncomingTransactionsToCollectionIfMissing(sPSIncomingTransactionsCollection, undefined, null);
        expect(expectedResult).toEqual(sPSIncomingTransactionsCollection);
      });
    });

    describe('compareSPSIncomingTransactions', () => {
      it('should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareSPSIncomingTransactions(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('should return false if one entity is null', () => {
        const entity1 = { id: 6756 };
        const entity2 = null;

        const compareResult1 = service.compareSPSIncomingTransactions(entity1, entity2);
        const compareResult2 = service.compareSPSIncomingTransactions(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('should return false if primaryKey differs', () => {
        const entity1 = { id: 6756 };
        const entity2 = { id: 30531 };

        const compareResult1 = service.compareSPSIncomingTransactions(entity1, entity2);
        const compareResult2 = service.compareSPSIncomingTransactions(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('should return false if primaryKey matches', () => {
        const entity1 = { id: 6756 };
        const entity2 = { id: 6756 };

        const compareResult1 = service.compareSPSIncomingTransactions(entity1, entity2);
        const compareResult2 = service.compareSPSIncomingTransactions(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
