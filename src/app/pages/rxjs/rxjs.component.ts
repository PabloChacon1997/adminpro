import { Component, OnInit, OnDestroy } from '@angular/core';
// tslint:disable-next-line: import-blacklist
import {Observable, of, from, Subscriber, Subscription } from 'rxjs';
import {  retry, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  constructor() {

    this. subscription =  this.regresaObservable().pipe(
      retry(2)
    ).subscribe(  numero =>
      console.log('Subs', numero),
      err => console.error('Error en el obs', err),
      () => console.log('el observador termino')
    );


   }

  ngOnInit() {
  }

  ngOnDestroy() {

    console.log('lapagina se cierra');
    this.subscription.unsubscribe();
  }


  regresaObservable(): Observable<any> {
    // tslint:disable-next-line: prefer-const
    return new Observable(  (observer: Subscriber<any>) => {
      let contador = 0;
      // tslint:disable-next-line: prefer-const
      let intervalo = setInterval( () => {
        contador += 1;

        const salida = {
          valor: contador
        };

        observer.next( salida );
        // if (contador === 3) {
        //   clearInterval( intervalo );
        //   observer.complete();
        // }


        // if (contador === 2) {
        //   // clearInterval( intervalo );
        //   observer.error('Auxilio !!');
        // }
      }, 1000 );

    } ).pipe(
      map(  resp => resp.valor ),
      filter( (valor, index) => {

        if ( (valor % 2 ) === 1) {
          return true;
        } else {

          return false;

        }
      })
    );
  }

}
