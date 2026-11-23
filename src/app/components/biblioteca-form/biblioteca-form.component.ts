import { Component, inject, output, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import { BibliotecaService } from '../../services/biblioteca.service';

@Component({
  selector: 'app-biblioteca-form',
  imports: [ReactiveFormsModule],
  templateUrl: './biblioteca-form.component.html'
})
export class BibliotecaFormComponent {
  private readonly bibliotecaService = inject(BibliotecaService);
  readonly bibliotecaRegistrada = output<void>();
  readonly guardando = signal(false);
  readonly error = signal('');
  readonly exito = signal('');

  readonly form = new FormGroup({
    nombre: new FormControl('', { nonNullable: true,
      validators: [Validators.required, Validators.pattern(/\S/), Validators.maxLength(150)] }),
    direccion: new FormControl('', { nonNullable: true,
      validators: [Validators.required, Validators.pattern(/\S/), Validators.maxLength(200)] }),
    ciudad: new FormControl('', { nonNullable: true,
      validators: [Validators.required, Validators.pattern(/\S/), Validators.maxLength(100)] })
  });

  invalido(campo: 'nombre' | 'direccion' | 'ciudad'): boolean {
    const control = this.form.controls[campo];
    return control.touched && control.invalid;
  }

  registrar(): void {
    if (this.guardando()) return;
    this.form.markAllAsTouched();
    this.error.set('');
    this.exito.set('');
    if (this.form.invalid) return;

    const datos = this.form.getRawValue();
    this.guardando.set(true);
    this.bibliotecaService.registrar({
      nombre: datos.nombre.trim(),
      direccion: datos.direccion.trim(),
      ciudad: datos.ciudad.trim()
    }).pipe(finalize(() => this.guardando.set(false))).subscribe({
      next: () => {
        this.form.reset();
        this.exito.set('Biblioteca registrada correctamente.');
        this.bibliotecaRegistrada.emit();
      },
      error: () => this.error.set('No fue posible registrar la biblioteca. Revisa los datos y vuelve a intentarlo.')
    });
  }
}
