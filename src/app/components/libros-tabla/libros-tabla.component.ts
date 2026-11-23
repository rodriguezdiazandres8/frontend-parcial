import { Component, computed, input } from '@angular/core';
import type { Biblioteca } from '../../models/biblioteca.model';

@Component({
  selector: 'app-libros-tabla',
  templateUrl: './libros-tabla.component.html'
})
export class LibrosTablaComponent {
  readonly bibliotecas = input.required<Biblioteca[]>();

  readonly libros = computed(() => this.bibliotecas().flatMap(biblioteca =>
    biblioteca.libros.map(libro => ({ ...libro, biblioteca: biblioteca.nombre }))
  ));
}


