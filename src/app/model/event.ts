import {Time} from '@angular/common';
import {AcademicActicity} from './academic-acticity';
import {Classroom} from './classroom';
import {Teacher} from './teacher';

export class AcademicEvent {

  id: number;
  day: string;
  academicActivity: AcademicActicity;
  start: string;
  length: string;
  classroom: Classroom;
  teacher: Teacher;

  constructor(id: number, day: string, start: string, length: string) {
    this.id = id;
    this.day = day;
    this.start = start;
    this.length = length;
  }

}
