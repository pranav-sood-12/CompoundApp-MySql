import { Component } from '@angular/core';
import {FormGroup, FormControl, ReactiveFormsModule} from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-create-compounds',
  standalone: true,
  imports: [ReactiveFormsModule,HttpClientModule],
  templateUrl: './create-compounds.component.html',
  styleUrl: './create-compounds.component.css'
})
export class CreateCompoundsComponent {
  profileForm = new FormGroup({
    CompoundName: new FormControl(''),
    CompoundDescription: new FormControl(''),
    strImageSource: new FormControl(null),
    strImageAttribution: new FormControl(null)
  });

  constructor(private http: HttpClient,private router: Router) {}

  onFileChangeSource(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.profileForm.patchValue({
        strImageSource: file
      });
    }
  }

  onFileChangeAttribution(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.profileForm.patchValue({
        strImageAttribution: file
      });
    }
  }

  onSubmit() {
    const formData = new FormData();
    const compoundName = this.profileForm.get('CompoundName')?.value || '';
    const compoundDescription = this.profileForm.get('CompoundDescription')?.value || '';
    const strImageSource = this.profileForm.get('strImageSource')?.value;
    const strImageAttribution = this.profileForm.get('strImageAttribution')?.value;
    console.log(compoundName,compoundDescription);
    
    formData.append('CompoundName', compoundName);
    formData.append('CompoundDescription', compoundDescription);

    if (strImageSource) {
      formData.append('strImageSource', strImageSource);
    }

    if (strImageAttribution) {
      formData.append('strImageAttribution', strImageAttribution);
    }

    console.log(formData);
    

    this.http.post('http://localhost:4000/api/compound/new', formData).subscribe(
      (response: any) => {
        if (response.success) {
          this.router.navigate(['/']); // Redirect to home page
        } else {
          window.alert(response.message || 'Failed to create compound');
        }
      },
      error => {
        if (error.status === 400 && error.error.message === 'compound already exists') {
          window.alert('Compound already exists');
        } else {
          console.error('Error adding compound:', error);
          window.alert('An error occurred while adding the compound');
        }
      }
    );
  }
}
