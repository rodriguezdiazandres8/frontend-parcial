import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import type { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import type { Biblioteca, BibliotecaRegistro } from '../models/biblioteca.model';

@Injectable({ providedIn: 'root' })
export class BibliotecaService {
  private readonly http = inject(HttpClient);
  private readonly url = `${environment.apiUrl}/bibliotecas`;

  listar(): Observable<Biblioteca[]> {
    return this.http.get<Biblioteca[]>(this.url);
  }

  registrar(datos: BibliotecaRegistro): Observable<Biblioteca> {
    return this.http.post<Biblioteca>(this.url, datos);
  }
}
