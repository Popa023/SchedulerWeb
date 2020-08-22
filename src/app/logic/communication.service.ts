import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {from, Observable, ObservedValueOf, throwError} from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import {AcademicEvent} from '../model/event';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {
  constructor(private http: HttpClient) {
  }

  configUrl = 'http://127.0.0.1:5000/';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getEvents(): Observable<AcademicEvent[]> {
    return this.http.get<AcademicEvent[]>(this.configUrl + 'events', this.httpOptions);
  }

  addEvent(event: AcademicEvent): Observable<AcademicEvent> {
    return this.http.post<AcademicEvent>(this.configUrl + 'events', event);
  }

  deleteEvent(id: number): Observable<{}> {
    const url = `${this.configUrl + 'events'}/${id}`;
    return this.http.delete(url, this.httpOptions);
  }

  updateEvent(id: number, event: AcademicEvent): Observable<AcademicEvent> {
    return this.http.put<AcademicEvent>(this.configUrl + 'events/' + id, event, this.httpOptions);
  }
}
