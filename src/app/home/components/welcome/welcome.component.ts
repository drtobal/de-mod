import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy } from '@angular/core';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DEFAULT_USER_NAME } from '../../constants';
import { MatButtonModule } from '@angular/material/button';

/** this component displays the welcome view for the game, requests the user name */
@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatButtonModule],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WelcomeComponent {
  /** emits an event when the user name is setted */
  @Output() onUserName = new EventEmitter<string>();

  /** reactive form to validate the name */
  form = new FormGroup({
    userName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(40)]),
  });

  /** displays an error */
  error(prop: string, error: string): boolean {
    const control = this.form.get(prop);
    return control ? control.errors?.[error] : true;
  }

  /** submit the form if it is valid */
  submit(): void {
    if (this.form.valid) {
      this.onUserName.emit(this.form.controls.userName.value || DEFAULT_USER_NAME);
    }
  }

  /** when input is blurred display the validations if they are not displayed */
  inputBlur(): void {
    this.form.markAllAsTouched();
  }
}
