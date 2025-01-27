import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { debounceTime, Subject, Subscription } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styleUrl: './search-box.component.sass'
})
export class SearchBoxComponent implements OnInit, OnDestroy {
  
  private debouncer$: Subject<string> = new Subject<string>();
  private subscriptions$?: Subscription;
  
  @Input() public placeholder: string = '';
  @Input() public initialSearchValue?: string = '';
  
  @Output() onSearchValue = new EventEmitter<string>();
  @Output() onDebounce = new EventEmitter<string>();
  
  @ViewChild('txtSearchInput') txtSearch!: ElementRef<HTMLInputElement>;
  
  ngOnInit(): void {
    this.initDebouncer();    
  }
  
  ngOnDestroy(): void {
    console.log('destroyed');
    this.subscriptions$?.unsubscribe();
  }

  private initDebouncer(): void {
    this.subscriptions$ = this.debouncer$.pipe(
      debounceTime(400)
    )
    .subscribe( value => {
      console.log('debouncer value ', value);
      this.onDebounce.emit(value);
    });
  }
  
  public onSearchCriteria(): void {
    const searchValue = this.txtSearch.nativeElement.value;
    console.log('New search value ', searchValue);
    this.onSearchValue.emit(searchValue);
  }

  public onKeyPress(searchTerm: string): void {
    console.log('search term ', searchTerm);
    this.debouncer$.next(searchTerm);
  }

}
