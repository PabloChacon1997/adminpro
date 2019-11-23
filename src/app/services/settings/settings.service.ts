import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  ajustes: Ajustes = {
    temaUrl: 'assets/css/colors/default.css',
    tema: 'default'
  };
  constructor( @Inject(DOCUMENT) private pdocument ) {
    this.cargarAjustes();
  }

  guardarAjustes() {
    localStorage.setItem('ajustes', JSON.stringify( this.ajustes));
  }

  cargarAjustes() {
    if (localStorage.getItem('ajustes')) {
      this.ajustes = JSON.parse(localStorage.getItem('ajustes'));
      // console.log('cargando del localstorage');
      this.aplicarTema( this.ajustes.tema);
    } else {
      // console.log('usando valores por defecto');
    }
  }

  aplicarTema( tema: string) {
    const url = `assets/css/colors/${ tema}.css`;
    this.pdocument.getElementById('tema').setAttribute('href', url);

    this.ajustes.tema =  tema;
    this.ajustes.temaUrl = url;

    this.guardarAjustes();
  }
}


interface Ajustes {
  temaUrl: string;
  tema: string;
}
