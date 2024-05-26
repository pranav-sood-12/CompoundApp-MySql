import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, ReactiveFormsModule} from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-compound',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,HttpClientModule],
  templateUrl: './update-compound.component.html',
  styleUrl: './update-compound.component.css'
})
export class UpdateCompoundComponent implements OnInit{
  // compound: any;
  id: string | null = null;
  compound: any = [];

  constructor(private router: Router,private route: ActivatedRoute,private http: HttpClient) {}

  profileForm = new FormGroup({
    CompoundName: new FormControl(''),
    CompoundDescription: new FormControl(''),
    strImageSource: new FormControl(null),
    strImageAttribution: new FormControl(null)
  });

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.id);
    this.fetchCompounds();
    
    console.log(this.compound);
  }

  fetchCompounds() {
    this.http.get(`http://localhost:4000/api/compound/info/${this.id}`).subscribe(
      (response: any) => {
        console.log(response);
        
        this.compound = response.compound;
        
        console.log('Compounds fetched successfully:', this.compound);
      },
      (error) => {
        console.error('Error fetching compounds:', error);
      }
    );
  }

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

    this.http.put(`http://localhost:4000/api/compound/update/${this.compound.id}`, formData).subscribe(
      (response: any) => {
        if (response.success) {
          console.log('updated');
          window.alert('compound updated');
          this.router.navigateByUrl('');
        } else {
          window.alert(response.message || 'Failed to update the compound');
        }
      },
      error => {
        if (error.status === 400) {
          window.alert('Compound name already exists ... choose different compound name');
        } else {
          console.error('Error updating compound:', error);
          window.alert('An error occurred while updating the compound');
        }
      }
    );
  }

}
