import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { RoomsService } from '../../../services/room/rooms.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import {
  FilterAndSortPayload,
  RoomsFiltersMetaData
} from '../../../modals/roomsData.modal';
import { debounceTime, takeUntil } from 'rxjs';
import { SubscriptionManagerComponent } from '../../../components/subscription-manager/subscription-manager.component';

interface FilterOption {
  key: string;
  title: string;
  values: string[];
}

@Component({
  selector: 'hrm-room-filters-sidebar',
  templateUrl: './room-filters-sidebar.component.html',
  styleUrls: ['./room-filters-sidebar.component.scss']
})
export class RoomFiltersSidebarComponent
  extends SubscriptionManagerComponent
  implements OnInit
{
  sortBy?: string;
  filterBy = {};
  filterByOptions: FilterOption[] = [];
  filterForm!: FormGroup;
  isLoadingFilters = true;

  @Output()
  public onFilterOrSortChange = new EventEmitter<FilterAndSortPayload>();

  sortByOptions = [
    { key: 'price', direction: 'asc', title: 'Price (from low to high)' },
    { key: 'price', direction: 'dsc', title: 'Price (from high to low)' }
  ];

  constructor(
    private roomsService: RoomsService,
    private formBuilder: FormBuilder
  ) {
    super();
  }

  ngOnInit(): void {
    this.filterForm = this.formBuilder.group({
      sortBy: this.formBuilder.control([])
    });

    this.filterForm.valueChanges
      .pipe(takeUntil(this.destroy$), debounceTime(300))
      .subscribe(formValue => this.onFilterOrSortChange.next(formValue));

    // note: we can get filters option directly from BE for more dynamic approach
    this.isLoadingFilters = true;
    this.roomsService
      .getHotelRoomsFiltersMetadata()
      .then(data => {
        this.setUpFiltersOptions(data);
        this.isLoadingFilters = false;
      })
      .catch(() => {
        this.isLoadingFilters = false;
        //todo
      });
  }

  setUpFiltersOptions(data: RoomsFiltersMetaData) {
    this.filterByOptions = [
      { key: 'type', title: 'Room type', values: data.roomTypes },
      { key: 'amenities', title: 'Amenities', values: data.amenities }
    ];

    this.filterByOptions.forEach(option => {
      this.filterForm.addControl(option.key, this.formBuilder.control([]));
    });
  }

  getCheckboxControl(key: string) {
    return this.filterForm.controls[key] as FormControl;
  }
}
