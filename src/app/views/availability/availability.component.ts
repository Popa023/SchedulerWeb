import { Component, OnInit } from '@angular/core';
import { FirebaseAuthService } from '../../logic/firebase-auth.service';
import { CommunicationService } from '../../logic/communication.service';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material/table';
import {AcademicEvent} from '../../model/event';
import {Ng5SliderModule, Options} from 'ng5-slider';

import { HttpClient } from '@angular/common/http';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {Teacher} from '../../model/teacher';
import {__values} from 'tslib';
import {printLine} from 'tslint/lib/verify/lines';

export interface ShownEvents {
  id: number;
  name: string;
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
  myControl = new FormControl();
  teachersList: Teacher[];
  teachers: string[] = ['Loading...'];
  filteredOptions: Observable<string[]>;
  id: any;
  day: any;
  start: any;
  length: any;
  selectedOption: any;
  value = 8;
  highValue = 20;
  hours: Options = {
    floor: 8,
    ceil: 20,
    showTicksValues: true,
    minRange: 1,
    precisionLimit: 2
  };
  options: Option[] = [
    {value: 0, viewValue: 'Add'},
    {value: 1, viewValue: 'Update'},
    {value: 2, viewValue: 'Delete'}
  ];
  ELEMENT_DATA: ShownEvents[] = [
    {id: 0, name: 'Loading...'},
  ];
  events: AcademicEvent[];
  displayedColumns: string[] = ['id', 'name'];
  dataSource = new MatTableDataSource<ShownEvents>(this.ELEMENT_DATA);
  selection = new SelectionModel<ShownEvents>(true, []);
  constructor(
    private firebaseAuthService: FirebaseAuthService,
    private communicationService: CommunicationService
  ) { }

  ngOnInit(): void {
    this.showEvents();
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
    this.communicationService.getTeachers()
      .subscribe((data) => this.loadTeachers(data));
  }
  showEvents() {
    this.communicationService.getEvents()
      .subscribe((data) => this.loadEvents(data) );
  }
  loadTeachers(data) {
    this.teachersList = data.teachers;
    // for (let i = 0; i < data.teachers.length; i++) {
    //   this.teachersList.push(data.teachers[i]);
    // }
    this.teachers = [];
    for (const value of this.teachersList) {
      this.teachers.push(value.name);
    }
    console.log(this.teachers);
    console.log(this.teachersList);
  }
  loadEvents(data) {
    this.events = data.events;
    for (const value of this.events) {
      this.ELEMENT_DATA.push({id: value.id, name: value.name});
    }
    this.dataSource = new MatTableDataSource<ShownEvents>(this.ELEMENT_DATA);
  }
  logout() {
    this.firebaseAuthService.logout();
  }

  send() {

    switch (this.selectedOption) {
      case 0: {
        // const newEvent = new AcademicEvent(this.id, this.day, this.start, this.length);
        // this.communicationService.addEvent(newEvent)
        //   .subscribe(event => this.events.push(event));
        break;
      }
      case 1: {
        // const newEvent = new AcademicEvent(this.id, this.day, this.start, this.length);
        // this.communicationService
        //   .updateEvent(this.id, newEvent)
        //   .subscribe();
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

  search(){
    //
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.teachers.filter(option => option.toLowerCase().includes(filterValue));
  }
}
