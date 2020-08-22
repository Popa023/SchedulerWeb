import { Component, OnInit } from '@angular/core';
import { FirebaseAuthService } from '../../logic/firebase-auth.service';
import { CommunicationService } from '../../logic/communication.service';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material/table';
import {AcademicEvent} from '../../model/event';
import { HttpClient } from '@angular/common/http';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

interface Option {
  value: number;
  viewValue: string;
}


@Component({
  selector: 'app-availability',
  templateUrl: './availability.component.html',
  styleUrls: ['./availability.component.css']
})
export class AvailabilityComponent implements OnInit {
  id: any;
  day: any;
  start: any;
  length: any;
  selectedOption: any;
  options: Option[] = [
    {value: 0, viewValue: 'Add'},
    {value: 1, viewValue: 'Update'},
    {value: 2, viewValue: 'Delete'}
  ];
  ELEMENT_DATA: PeriodicElement[] = [
    {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
    {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
    {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
    {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
    {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
    {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
    {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
    {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
    {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
    {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  ];
  events: AcademicEvent[];
  displayedColumns: string[] = ['select', 'position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource<PeriodicElement>(this.ELEMENT_DATA);
  selection = new SelectionModel<PeriodicElement>(true, []);

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }
  constructor(
    private firebaseAuthService: FirebaseAuthService,
    private communicationService: CommunicationService
  ) { }

  ngOnInit(): void {
    this.showEvents();
    this.ELEMENT_DATA = [
    {position: 0, name: 'string', weight: 1.0079, symbol: 'H'},
    {position: 1, name: 'Helium', weight: 4.0026, symbol: 'He'},
    {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
    {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
    ];

    this.dataSource = new MatTableDataSource<PeriodicElement>(this.ELEMENT_DATA);
    this.selection = new SelectionModel<PeriodicElement>(true, []);
  }
  showEvents() {
    this.communicationService.getEvents()
      .subscribe((data: AcademicEvent[]) => this.events = data );
  }
  logout() {
    this.firebaseAuthService.logout();
  }

  send() {

    switch (this.selectedOption) {
      case 0: {
        const newEvent = new AcademicEvent(this.id, this.day, this.start, this.length);
        this.communicationService.addEvent(newEvent)
          .subscribe(event => this.events.push(event));
        break;
      }
      case 1: {
        const newEvent = new AcademicEvent(this.id, this.day, this.start, this.length);
        this.communicationService
          .updateEvent(this.id, newEvent)
          .subscribe();
        break;
      }
      case 2: {
        this.communicationService
          .deleteEvent(this.id)
          .subscribe();
        break;
      }
      default: {
        break;
      }
    }
  }

}
