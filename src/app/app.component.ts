import { Component, inject, OnInit, signal } from '@angular/core';
import { finalize } from 'rxjs';
import type { Biblioteca } from './models/biblioteca.model';
import { BibliotecaService } from './services/biblioteca.service';
import { BibliotecaFormComponent } from './components/biblioteca-form/biblioteca-form.component';
import { LibrosTablaComponent } from './components/libros-tabla/libros-tabla.component';

@Component({
  selector: 'app-root',
  imports: [BibliotecaFormComponent, LibrosTablaComponent],
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  private readonly bibliotecaService = inject(BibliotecaService);
  readonly bibliotecas = signal<Biblioteca[]>([]);
  readonly cargando = signal(true);
  readonly error = signal('');

  ngOnInit(): void {
    this.cargarBibliotecas();
  }

  cargarBibliotecas(): void {
    this.cargando.set(true);
    this.error.set('');
    this.bibliotecaService.listar().pipe(finalize(() => this.cargando.set(false))).subscribe({
      next: bibliotecas => this.bibliotecas.set(bibliotecas),
      error: () => this.error.set('No fue posible consultar los libros. Comprueba que el backend esté encendido.')
    });
  }
}
