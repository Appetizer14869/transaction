import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { ICBSTransactions } from '../cbs-transactions.model';
import { sampleWithFullData, sampleWithNewData, sampleWithPartialData, sampleWithRequiredData } from '../cbs-transactions.test-samples';

import { CBSTransactionsService, RestCBSTransactions } from './cbs-transactions.service';

const requireRestSample: RestCBSTransactions = {
  ...sampleWithRequiredData,
  requestInstanttime: sampleWithRequiredData.requestInstanttime?.toJSON(),
};

describe('CBSTransactions Service', () => {
  let service: CBSTransactionsService;
  let httpMock: HttpTestingController;
  let expectedResult: ICBSTransactions | ICBSTransactions[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(CBSTransactionsService);
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

    it('should create a CBSTransactions', () => {
      const cBSTransactions = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(cBSTransactions).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a CBSTransactions', () => {
      const cBSTransactions = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(cBSTransactions).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a CBSTransactions', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of CBSTransactions', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a CBSTransactions', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addCBSTransactionsToCollectionIfMissing', () => {
      it('should add a CBSTransactions to an empty array', () => {
        const cBSTransactions: ICBSTransactions = sampleWithRequiredData;
        expectedResult = service.addCBSTransactionsToCollectionIfMissing([], cBSTransactions);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(cBSTransactions);
      });

      it('should not add a CBSTransactions to an array that contains it', () => {
        const cBSTransactions: ICBSTransactions = sampleWithRequiredData;
        const cBSTransactionsCollection: ICBSTransactions[] = [
          {
            ...cBSTransactions,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addCBSTransactionsToCollectionIfMissing(cBSTransactionsCollection, cBSTransactions);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a CBSTransactions to an array that doesn't contain it", () => {
        const cBSTransactions: ICBSTransactions = sampleWithRequiredData;
        const cBSTransactionsCollection: ICBSTransactions[] = [sampleWithPartialData];
        expectedResult = service.addCBSTransactionsToCollectionIfMissing(cBSTransactionsCollection, cBSTransactions);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(cBSTransactions);
      });

      it('should add only unique CBSTransactions to an array', () => {
        const cBSTransactionsArray: ICBSTransactions[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const cBSTransactionsCollection: ICBSTransactions[] = [sampleWithRequiredData];
        expectedResult = service.addCBSTransactionsToCollectionIfMissing(cBSTransactionsCollection, ...cBSTransactionsArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const cBSTransactions: ICBSTransactions = sampleWithRequiredData;
        const cBSTransactions2: ICBSTransactions = sampleWithPartialData;
        expectedResult = service.addCBSTransactionsToCollectionIfMissing([], cBSTransactions, cBSTransactions2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(cBSTransactions);
        expect(expectedResult).toContain(cBSTransactions2);
      });

      it('should accept null and undefined values', () => {
        const cBSTransactions: ICBSTransactions = sampleWithRequiredData;
        expectedResult = service.addCBSTransactionsToCollectionIfMissing([], null, cBSTransactions, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(cBSTransactions);
      });

      it('should return initial array if no CBSTransactions is added', () => {
        const cBSTransactionsCollection: ICBSTransactions[] = [sampleWithRequiredData];
        expectedResult = service.addCBSTransactionsToCollectionIfMissing(cBSTransactionsCollection, undefined, null);
        expect(expectedResult).toEqual(cBSTransactionsCollection);
      });
    });

    describe('compareCBSTransactions', () => {
      it('should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareCBSTransactions(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('should return false if one entity is null', () => {
        const entity1 = { id: 13778 };
        const entity2 = null;

        const compareResult1 = service.compareCBSTransactions(entity1, entity2);
        const compareResult2 = service.compareCBSTransactions(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('should return false if primaryKey differs', () => {
        const entity1 = { id: 13778 };
        const entity2 = { id: 27131 };

        const compareResult1 = service.compareCBSTransactions(entity1, entity2);
        const compareResult2 = service.compareCBSTransactions(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('should return false if primaryKey matches', () => {
        const entity1 = { id: 13778 };
        const entity2 = { id: 13778 };

        const compareResult1 = service.compareCBSTransactions(entity1, entity2);
        const compareResult2 = service.compareCBSTransactions(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
