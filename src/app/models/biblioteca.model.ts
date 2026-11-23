import type { Libro } from './libro.model';

export interface Biblioteca {
  id: number;
  nombre: string;
  direccion: string;
  ciudad: string;
  libros: Libro[];
}

export type BibliotecaRegistro = Pick<Biblioteca, 'nombre' | 'direccion' | 'ciudad'>;
