import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as moment from 'moment';
import { StreamState } from 'http2';

@Injectable({
  providedIn: 'root'
})
export class AudioService {
  private stop$ = new Subject();
  private audioObj = new Audio();

  audioEvents = [
    "ended",
    "error",
    "play",
    "playing",
    "pause",
    "timeupdate",
    "canplay",
    "loadedmetadata",
    "loadstart"
  ];

  private streamObservable(url: string): any {
    new Observable(observer => {
      this.audioObj.src = url;
      this.audioObj.load();
      this.audioObj.play();

      const handler = (event: Event) => {
        observer.next(event);
      };

      this.addEvents(this.audioObj, this.audioEvents, handler);
      return () => {
        this.audioObj.pause();
        this.audioObj.currentTime = 0;
        this.removeEvents(this.audioObj, this.audioEvents, handler);
      }
    })
  }

  private addEvents(obj, events, handler): void {
    events.forEach(event => {
      obj.addEventListener(event, handler);
    });
  }

  private removeEvents(obj, events, handler): void {
    events.forEach(event => {
      obj.removeEventListener(event, handler);
    });
  }

  playStream(url: string): any {
    return this.streamObservable(url).pipe(takeUntil(this.stop$));
  }

  play(): void {
    this.audioObj.play();
  }

  pause(): void {
    this.audioObj.pause();
  }

  stop(): void {
    this.stop$.next();
  }
  
  seekTo(seconds: number): void {
    this.audioObj.currentTime = seconds;
  }

  formatTime(time: number, format: string = "HH:mm:ss"): string {
    const momentTime = time * 1000;
    return moment.utc(momentTime).format(format);
  }
}
