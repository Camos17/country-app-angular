import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styleUrl: './search-box.component.sass'
})
export class SearchBoxComponent {

  @Input() public placeholder: string = '';

  @Output() onSearchValue = new EventEmitter<string>();

  @ViewChild('txtSearchInput') txtSearch!: ElementRef<HTMLInputElement>;

  public onSearchCriteria(): void {
    const searchValue = this.txtSearch.nativeElement.value;
    console.log('New search value ', searchValue);
    this.onSearchValue.emit(searchValue);
  }

}
