import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { ISPSOutgoingTransactions } from '../sps-outgoing-transactions.model';
import {
  sampleWithFullData,
  sampleWithNewData,
  sampleWithPartialData,
  sampleWithRequiredData,
} from '../sps-outgoing-transactions.test-samples';

import { RestSPSOutgoingTransactions, SPSOutgoingTransactionsService } from './sps-outgoing-transactions.service';

const requireRestSample: RestSPSOutgoingTransactions = {
  ...sampleWithRequiredData,
  requestInstanttime: sampleWithRequiredData.requestInstanttime?.toJSON(),
};

describe('SPSOutgoingTransactions Service', () => {
  let service: SPSOutgoingTransactionsService;
  let httpMock: HttpTestingController;
  let expectedResult: ISPSOutgoingTransactions | ISPSOutgoingTransactions[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(SPSOutgoingTransactionsService);
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

    it('should create a SPSOutgoingTransactions', () => {
      const sPSOutgoingTransactions = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(sPSOutgoingTransactions).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a SPSOutgoingTransactions', () => {
      const sPSOutgoingTransactions = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(sPSOutgoingTransactions).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a SPSOutgoingTransactions', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of SPSOutgoingTransactions', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a SPSOutgoingTransactions', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addSPSOutgoingTransactionsToCollectionIfMissing', () => {
      it('should add a SPSOutgoingTransactions to an empty array', () => {
        const sPSOutgoingTransactions: ISPSOutgoingTransactions = sampleWithRequiredData;
        expectedResult = service.addSPSOutgoingTransactionsToCollectionIfMissing([], sPSOutgoingTransactions);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(sPSOutgoingTransactions);
      });

      it('should not add a SPSOutgoingTransactions to an array that contains it', () => {
        const sPSOutgoingTransactions: ISPSOutgoingTransactions = sampleWithRequiredData;
        const sPSOutgoingTransactionsCollection: ISPSOutgoingTransactions[] = [
          {
            ...sPSOutgoingTransactions,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addSPSOutgoingTransactionsToCollectionIfMissing(
          sPSOutgoingTransactionsCollection,
          sPSOutgoingTransactions,
        );
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a SPSOutgoingTransactions to an array that doesn't contain it", () => {
        const sPSOutgoingTransactions: ISPSOutgoingTransactions = sampleWithRequiredData;
        const sPSOutgoingTransactionsCollection: ISPSOutgoingTransactions[] = [sampleWithPartialData];
        expectedResult = service.addSPSOutgoingTransactionsToCollectionIfMissing(
          sPSOutgoingTransactionsCollection,
          sPSOutgoingTransactions,
        );
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(sPSOutgoingTransactions);
      });

      it('should add only unique SPSOutgoingTransactions to an array', () => {
        const sPSOutgoingTransactionsArray: ISPSOutgoingTransactions[] = [
          sampleWithRequiredData,
          sampleWithPartialData,
          sampleWithFullData,
        ];
        const sPSOutgoingTransactionsCollection: ISPSOutgoingTransactions[] = [sampleWithRequiredData];
        expectedResult = service.addSPSOutgoingTransactionsToCollectionIfMissing(
          sPSOutgoingTransactionsCollection,
          ...sPSOutgoingTransactionsArray,
        );
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const sPSOutgoingTransactions: ISPSOutgoingTransactions = sampleWithRequiredData;
        const sPSOutgoingTransactions2: ISPSOutgoingTransactions = sampleWithPartialData;
        expectedResult = service.addSPSOutgoingTransactionsToCollectionIfMissing([], sPSOutgoingTransactions, sPSOutgoingTransactions2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(sPSOutgoingTransactions);
        expect(expectedResult).toContain(sPSOutgoingTransactions2);
      });

      it('should accept null and undefined values', () => {
        const sPSOutgoingTransactions: ISPSOutgoingTransactions = sampleWithRequiredData;
        expectedResult = service.addSPSOutgoingTransactionsToCollectionIfMissing([], null, sPSOutgoingTransactions, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(sPSOutgoingTransactions);
      });

      it('should return initial array if no SPSOutgoingTransactions is added', () => {
        const sPSOutgoingTransactionsCollection: ISPSOutgoingTransactions[] = [sampleWithRequiredData];
        expectedResult = service.addSPSOutgoingTransactionsToCollectionIfMissing(sPSOutgoingTransactionsCollection, undefined, null);
        expect(expectedResult).toEqual(sPSOutgoingTransactionsCollection);
      });
    });

    describe('compareSPSOutgoingTransactions', () => {
      it('should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareSPSOutgoingTransactions(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('should return false if one entity is null', () => {
        const entity1 = { id: 29629 };
        const entity2 = null;

        const compareResult1 = service.compareSPSOutgoingTransactions(entity1, entity2);
        const compareResult2 = service.compareSPSOutgoingTransactions(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('should return false if primaryKey differs', () => {
        const entity1 = { id: 29629 };
        const entity2 = { id: 5895 };

        const compareResult1 = service.compareSPSOutgoingTransactions(entity1, entity2);
        const compareResult2 = service.compareSPSOutgoingTransactions(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('should return false if primaryKey matches', () => {
        const entity1 = { id: 29629 };
        const entity2 = { id: 29629 };

        const compareResult1 = service.compareSPSOutgoingTransactions(entity1, entity2);
        const compareResult2 = service.compareSPSOutgoingTransactions(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
