import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.scss'
})
export class WelcomeComponent {
  @Output() onUserName = new EventEmitter<string>();

  form = new FormGroup({
    userName: new FormControl('', [Validators.required, Validators.minLength(3)]),
  });

  /** displays an error */
  error(prop: string, error: string): boolean {
    const control = this.form.get(prop);
    return control ? control.errors?.[error] : true;
  }

  submit(): void {
    if (this.form.valid) {
      this.onUserName.emit(this.form.controls.userName.value || 'Guest');
    }
  }

  /** when input is blurred, save data in current session and triggers validators */
  inputBlur(): void {
    this.form.markAllAsTouched();
  }
}
