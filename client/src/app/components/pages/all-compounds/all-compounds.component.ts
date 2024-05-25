import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-all-compounds',
  standalone: true,
  imports: [HttpClientModule,CommonModule],
  templateUrl: './all-compounds.component.html',
  styleUrl: './all-compounds.component.css'
})
export class AllCompoundsComponent {
  compounds: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchCompounds();
  }

  fetchCompounds() {
    this.http.get('http://localhost:4000/api/compound/').subscribe(
      (response: any) => {
        this.compounds = response.compound;
        // console.log('Compounds fetched successfully:', response.compound[0]);
      },
      (error) => {
        console.error('Error fetching compounds:', error);
      }
    );
  }
}
