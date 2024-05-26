import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-compound-page',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './compound-page.component.html',
  styleUrl: './compound-page.component.css'
})

export class CompoundPageComponent {
  id: string | null = null;
  compound: any = [];

  constructor(private route: ActivatedRoute,private http: HttpClient) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.id);
    this.fetchCompounds();    
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

}
