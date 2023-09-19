import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'angular-express-uploads';
  files: File[] = [];
  fileName: string = '';

  constructor(private http: HttpClient) {}

  onSelect(event: any) {
    this.files.push(...event.addedFiles);
    this.files.forEach((data) => {
      this.fileName = data.name;
    });
  }

  onRemove(event: any) {
    this.files.splice(this.files.indexOf(event), 1);
    this.fileName = '';
  }

  onSubmit(): void {
    const form = new FormData();
    form.append('fName', this.fileName);
    form.append('image', this.files[0]);

    this.http
      .post('http://localhost:3000/api/upload', form)
      .subscribe((data) => {
        console.log(data);
      });
  }
}
