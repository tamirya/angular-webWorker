import { Component, OnInit } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from "rxjs";
import { fromWorker } from 'observable-webworker';
import { of } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  number: number;
  output: any;
  webworker: Worker;

  ngOnInit() {
    this.attachWebworker();
    // const input$ = new BehaviorSubject<string>('https://jsonplaceholder.typicode.com/todos/1');
    // // const input$ = of('Hello from main thread');
    // fromWorker<string, string>(() => new Worker('./app-worker.worker', { type: 'module' }),
    //   input$).subscribe(message => {
    //     console.log(message); // Outputs 'Hello from webworker'
    //   });
  }

  attachWebworker() {
    this.runWorker().subscribe(
      (result) => {
        console.log(result);
        this.output = result;
      }
    );
  }

  runWorker() {
    let resultSubject = new Subject<string>();
    this.webworker = new Worker('./app-worker.worker', { type: 'module' });
    this.webworker.onmessage = function (result) {
      resultSubject.next(result.data);
    }
    return resultSubject;
  }

  start() {
    this.output = 'Loading...';
    if (!this.webworker) {
      this.attachWebworker()
    }
    this.webworker.postMessage(this.number)
  }

  stop() {
    this.webworker.terminate();
    this.webworker = null;
    console.log(this.webworker);
  }
}