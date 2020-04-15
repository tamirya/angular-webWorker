addEventListener('message', (evt) => {
  console.log(evt.data);

  httpGet('https://api.npms.io/v2/search?q=scope:angular', function (res) {
    var data = JSON.parse(res);
    // setTimeout(() => {
    //   postMessage(object);
    // }, 2000);

    // object["results"][0].score
    let score = 0;
    console.log(data);

    data['results'].forEach((it) => {
      const itScore = it['score']['final'];
      score += itScore
    });

    postMessage(score);
  });

});

function httpGet(theUrl, cb) {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open("GET", theUrl, false); // false for synchronous request
  xmlHttp.send(null);
  cb(xmlHttp.responseText);
}

// import { DoWork, ObservableWorker } from 'observable-webworker';
// import { Observable } from 'rxjs';
// import { map } from 'rxjs/operators';

// @ObservableWorker()
// export class HelloWorker implements DoWork<string, string> {
//   public work(input$: Observable<string>): Observable<string> {
//     console.log(input$);

//     return input$.pipe(
//       map(message => {
//         console.log(message); // outputs 'Hello from main thread'
//         return `Hello from webworker`;
//       }),
//     );
//   }
// }