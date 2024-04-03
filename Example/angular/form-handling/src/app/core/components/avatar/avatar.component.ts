import { Component, inject, output } from '@angular/core';
import { CoreModule } from '../../core.module';
import { Observable, Subscription } from 'rxjs';
import { ImageCropperComponent } from './image-cropper/image-cropper.component';
import { MatDialog } from '@angular/material/dialog';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { mimeType } from './mime-type.validator';
import { FORM } from '../../form.constant';

@Component({
  selector: 'app-avatar',
  standalone: true,
  imports: [CoreModule, ReactiveFormsModule],
  templateUrl: './avatar.component.html',
  styleUrl: './avatar.component.scss',
})
export class AvatarComponent {
  private formBuilder = inject(FormBuilder);
  private dialog = inject(MatDialog);
  private subscription = new Subscription();

  form = this.ininForm();
  fileChange = output<File>();
  validationField = FORM.validationField;

  ngOnInit(): void {
    this.subscription = this.imageFile.statusChanges.subscribe(
      (status) => status === 'VALID' && this.onProcessFile(this.imageFile.value)
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  openAvatarEditor(image: string): Observable<string> {
    const dialogRef = this.dialog.open(ImageCropperComponent, {
      minWidth: '60vw',
      minHeight: '60vh',
      data: image,
    });

    return dialogRef.afterClosed();
  }

  onFileChange(e: Event): void {
    const event = <HTMLInputElement>e.target;
    const file = event.files[0];
    if (!file) return;

    this.imageFile.setValue(file);
    this.imageFile.markAsTouched();
  }

  onProcessFile(file: File): void {
    const { name, type } = file;
    const objectUrl = URL.createObjectURL(file);

    this.resetInput();
    this.openAvatarEditor(objectUrl).subscribe((base64Image) => {
      if (base64Image) {
        const fileChange = this.dataUrlToFile(base64Image, name, type);
        this.imageUrl.setValue(base64Image);
        this.fileChange.emit(fileChange);
      }
    });
  }

  dataUrlToFile(base64Image: string, name: string, type: string): File {
    const byteCharacters = atob(base64Image.split(',')[1]);
    const byteNumbers = new Array(byteCharacters.length);

    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type });
    const file = new File([blob], name, { type });

    return file;
  }

  resetInput(): void {
    const input = document.getElementById(
      'avatar-input-file'
    ) as HTMLInputElement;
    if (input) input.value = '';
  }

  resetForm(): void {
    this.form.reset();
  }

  get imageFile(): FormControl<File> {
    return this.form.controls['imageFile'];
  }

  get imageUrl(): FormControl<string> {
    return this.form.controls['imageUrl'];
  }

  private ininForm() {
    return this.formBuilder.group({
      imageFile: this.formBuilder.control<File>(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType],
      }),
      imageUrl: [''],
    });
  }
}
