import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import Cropper from 'cropperjs';
import { CoreModule } from '../../../core.module';

@Component({
  selector: 'app-image-cropper',
  standalone: true,
  imports: [CoreModule],
  templateUrl: './image-cropper.component.html',
  styleUrl: './image-cropper.component.scss',
})
export class ImageCropperComponent implements OnInit, AfterViewInit {
  @ViewChild('imageRef', { static: true })
  imageRef: ElementRef<HTMLImageElement>;

  private dialogRef = inject(MatDialogRef<ImageCropperComponent>);
  private sanitizer = inject(DomSanitizer);
  private image = inject<string>(MAT_DIALOG_DATA);

  cropper!: Cropper;
  sanitizedUrl: SafeUrl;

  ngOnInit(): void {
    this.sanitizedUrl = this.sanitizer.bypassSecurityTrustUrl(this.image);
  }

  ngAfterViewInit(): void {
    this.initCropper();
  }

  onCrop() {
    const croppedCanvas = this.cropper.getCroppedCanvas();
    const roundedCanvas = this.getRoundedCanvas(croppedCanvas);
    let roundedImage = document.createElement('img');

    if (roundedImage) this.dialogRef.close(roundedCanvas.toDataURL());
    else return this.dialogRef.close(null);
  }

  onReset() {
    this.cropper.clear();
    this.cropper.crop();
  }

  private initCropper() {
    const image = this.imageRef.nativeElement;

    this.cropper = new Cropper(image, {
      aspectRatio: 1,
      viewMode: 1,
      guides: false,
    });
  }

  private getRoundedCanvas(sourceCanvas: any) {
    let canvas = document.createElement('canvas');
    let context: any = canvas.getContext('2d');
    let width = sourceCanvas.width;
    let height = sourceCanvas.height;

    canvas.width = width;
    canvas.height = height;
    context.imageSmoothingEnabled = true;
    context.drawImage(sourceCanvas, 0, 0, width, height);
    context.globalCompositeOperation = 'destination-in';
    context.beginPath();
    context.arc(
      width / 2,
      height / 2,
      Math.min(width, height) / 2,
      0,
      2 * Math.PI,
      true
    );
    context.fill();
    return canvas;
  }
}
