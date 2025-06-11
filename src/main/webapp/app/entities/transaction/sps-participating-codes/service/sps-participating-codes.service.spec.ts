import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { ISPSParticipatingCodes } from '../sps-participating-codes.model';
import {
  sampleWithFullData,
  sampleWithNewData,
  sampleWithPartialData,
  sampleWithRequiredData,
} from '../sps-participating-codes.test-samples';

import { SPSParticipatingCodesService } from './sps-participating-codes.service';

const requireRestSample: ISPSParticipatingCodes = {
  ...sampleWithRequiredData,
};

describe('SPSParticipatingCodes Service', () => {
  let service: SPSParticipatingCodesService;
  let httpMock: HttpTestingController;
  let expectedResult: ISPSParticipatingCodes | ISPSParticipatingCodes[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(SPSParticipatingCodesService);
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

    it('should create a SPSParticipatingCodes', () => {
      const sPSParticipatingCodes = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(sPSParticipatingCodes).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a SPSParticipatingCodes', () => {
      const sPSParticipatingCodes = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(sPSParticipatingCodes).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a SPSParticipatingCodes', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of SPSParticipatingCodes', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a SPSParticipatingCodes', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addSPSParticipatingCodesToCollectionIfMissing', () => {
      it('should add a SPSParticipatingCodes to an empty array', () => {
        const sPSParticipatingCodes: ISPSParticipatingCodes = sampleWithRequiredData;
        expectedResult = service.addSPSParticipatingCodesToCollectionIfMissing([], sPSParticipatingCodes);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(sPSParticipatingCodes);
      });

      it('should not add a SPSParticipatingCodes to an array that contains it', () => {
        const sPSParticipatingCodes: ISPSParticipatingCodes = sampleWithRequiredData;
        const sPSParticipatingCodesCollection: ISPSParticipatingCodes[] = [
          {
            ...sPSParticipatingCodes,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addSPSParticipatingCodesToCollectionIfMissing(sPSParticipatingCodesCollection, sPSParticipatingCodes);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a SPSParticipatingCodes to an array that doesn't contain it", () => {
        const sPSParticipatingCodes: ISPSParticipatingCodes = sampleWithRequiredData;
        const sPSParticipatingCodesCollection: ISPSParticipatingCodes[] = [sampleWithPartialData];
        expectedResult = service.addSPSParticipatingCodesToCollectionIfMissing(sPSParticipatingCodesCollection, sPSParticipatingCodes);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(sPSParticipatingCodes);
      });

      it('should add only unique SPSParticipatingCodes to an array', () => {
        const sPSParticipatingCodesArray: ISPSParticipatingCodes[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const sPSParticipatingCodesCollection: ISPSParticipatingCodes[] = [sampleWithRequiredData];
        expectedResult = service.addSPSParticipatingCodesToCollectionIfMissing(
          sPSParticipatingCodesCollection,
          ...sPSParticipatingCodesArray,
        );
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const sPSParticipatingCodes: ISPSParticipatingCodes = sampleWithRequiredData;
        const sPSParticipatingCodes2: ISPSParticipatingCodes = sampleWithPartialData;
        expectedResult = service.addSPSParticipatingCodesToCollectionIfMissing([], sPSParticipatingCodes, sPSParticipatingCodes2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(sPSParticipatingCodes);
        expect(expectedResult).toContain(sPSParticipatingCodes2);
      });

      it('should accept null and undefined values', () => {
        const sPSParticipatingCodes: ISPSParticipatingCodes = sampleWithRequiredData;
        expectedResult = service.addSPSParticipatingCodesToCollectionIfMissing([], null, sPSParticipatingCodes, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(sPSParticipatingCodes);
      });

      it('should return initial array if no SPSParticipatingCodes is added', () => {
        const sPSParticipatingCodesCollection: ISPSParticipatingCodes[] = [sampleWithRequiredData];
        expectedResult = service.addSPSParticipatingCodesToCollectionIfMissing(sPSParticipatingCodesCollection, undefined, null);
        expect(expectedResult).toEqual(sPSParticipatingCodesCollection);
      });
    });

    describe('compareSPSParticipatingCodes', () => {
      it('should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareSPSParticipatingCodes(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('should return false if one entity is null', () => {
        const entity1 = { id: 11168 };
        const entity2 = null;

        const compareResult1 = service.compareSPSParticipatingCodes(entity1, entity2);
        const compareResult2 = service.compareSPSParticipatingCodes(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('should return false if primaryKey differs', () => {
        const entity1 = { id: 11168 };
        const entity2 = { id: 23678 };

        const compareResult1 = service.compareSPSParticipatingCodes(entity1, entity2);
        const compareResult2 = service.compareSPSParticipatingCodes(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('should return false if primaryKey matches', () => {
        const entity1 = { id: 11168 };
        const entity2 = { id: 11168 };

        const compareResult1 = service.compareSPSParticipatingCodes(entity1, entity2);
        const compareResult2 = service.compareSPSParticipatingCodes(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
