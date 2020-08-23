import {Time} from '@angular/common';

export class AcademicEvent {

  id: number;
  name: string;
  teacherId: number;
  classroomId: number;
  groupId: number;
  lessonId: number;
  day: string;
  start: Time;
  length: Time;

  constructor(id, name, teacherId, classroomId, groupId, lessonId, day, start, length) {
    this.id = id;
    this.name = name;
    this.teacherId = teacherId;
    this.classroomId = classroomId;
    this.groupId = groupId;
    this.lessonId = lessonId;
    this.day = day;
    this.start = start;
    this.length = length;
  }

}
