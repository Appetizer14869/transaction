import { Component, NgZone, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, Data, ParamMap, Router, RouterModule } from '@angular/router';
import { Observable, Subscription, combineLatest, filter, tap } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { SortByDirective, SortDirective, SortService, type SortState, sortStateSignal } from 'app/shared/sort';
import { FormatMediumDatetimePipe } from 'app/shared/date';
import { FormsModule } from '@angular/forms';
import { DEFAULT_SORT_DATA, ITEM_DELETED_EVENT, SORT } from 'app/config/navigation.constants';
import { ISPSIncomingTransactions } from '../sps-incoming-transactions.model';
import { EntityArrayResponseType, SPSIncomingTransactionsService } from '../service/sps-incoming-transactions.service';
import { SPSIncomingTransactionsDeleteDialogComponent } from '../delete/sps-incoming-transactions-delete-dialog.component';

@Component({
  selector: 'jhi-sps-incoming-transactions',
  templateUrl: './sps-incoming-transactions.component.html',
  imports: [RouterModule, FormsModule, SharedModule, SortDirective, SortByDirective, FormatMediumDatetimePipe],
})
export class SPSIncomingTransactionsComponent implements OnInit {
  subscription: Subscription | null = null;
  sPSIncomingTransactions = signal<ISPSIncomingTransactions[]>([]);
  isLoading = false;

  sortState = sortStateSignal({});

  public readonly router = inject(Router);
  protected readonly sPSIncomingTransactionsService = inject(SPSIncomingTransactionsService);
  protected readonly activatedRoute = inject(ActivatedRoute);
  protected readonly sortService = inject(SortService);
  protected modalService = inject(NgbModal);
  protected ngZone = inject(NgZone);

  trackId = (item: ISPSIncomingTransactions): number => this.sPSIncomingTransactionsService.getSPSIncomingTransactionsIdentifier(item);

  ngOnInit(): void {
    this.subscription = combineLatest([this.activatedRoute.queryParamMap, this.activatedRoute.data])
      .pipe(
        tap(([params, data]) => this.fillComponentAttributeFromRoute(params, data)),
        tap(() => {
          if (this.sPSIncomingTransactions().length === 0) {
            this.load();
          } else {
            this.sPSIncomingTransactions.set(this.refineData(this.sPSIncomingTransactions()));
          }
        }),
      )
      .subscribe();
  }

  delete(sPSIncomingTransactions: ISPSIncomingTransactions): void {
    const modalRef = this.modalService.open(SPSIncomingTransactionsDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.sPSIncomingTransactions = sPSIncomingTransactions;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed
      .pipe(
        filter(reason => reason === ITEM_DELETED_EVENT),
        tap(() => this.load()),
      )
      .subscribe();
  }

  load(): void {
    this.queryBackend().subscribe({
      next: (res: EntityArrayResponseType) => {
        this.onResponseSuccess(res);
      },
    });
  }

  navigateToWithComponentValues(event: SortState): void {
    this.handleNavigation(event);
  }

  protected fillComponentAttributeFromRoute(params: ParamMap, data: Data): void {
    this.sortState.set(this.sortService.parseSortParam(params.get(SORT) ?? data[DEFAULT_SORT_DATA]));
  }

  protected onResponseSuccess(response: EntityArrayResponseType): void {
    const dataFromBody = this.fillComponentAttributesFromResponseBody(response.body);
    this.sPSIncomingTransactions.set(this.refineData(dataFromBody));
  }

  protected refineData(data: ISPSIncomingTransactions[]): ISPSIncomingTransactions[] {
    const { predicate, order } = this.sortState();
    return predicate && order ? data.sort(this.sortService.startSort({ predicate, order })) : data;
  }

  protected fillComponentAttributesFromResponseBody(data: ISPSIncomingTransactions[] | null): ISPSIncomingTransactions[] {
    return data ?? [];
  }

  protected queryBackend(): Observable<EntityArrayResponseType> {
    this.isLoading = true;
    const queryObject: any = {
      sort: this.sortService.buildSortParam(this.sortState()),
    };
    return this.sPSIncomingTransactionsService.query(queryObject).pipe(tap(() => (this.isLoading = false)));
  }

  protected handleNavigation(sortState: SortState): void {
    const queryParamsObj = {
      sort: this.sortService.buildSortParam(sortState),
    };

    this.ngZone.run(() => {
      this.router.navigate(['./'], {
        relativeTo: this.activatedRoute,
        queryParams: queryParamsObj,
      });
    });
  }
}
