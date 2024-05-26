import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-all-compounds',
  standalone: true,
  imports: [HttpClientModule,CommonModule],
  templateUrl: './all-compounds.component.html',
  styleUrl: './all-compounds.component.css'
})
export class AllCompoundsComponent {
  compounds: any[] = [];
  pageNumber : number = 1;
  compoundsPerPage : number = 0;
  totalCompounds : number = 0 ;
  totalPages : number = 0;

  constructor(private http: HttpClient,private router: Router) {}

  ngOnInit() {
    this.fetchCompounds();
  }

  openUpdateComponent(compound: any) {
    this.router.navigate([`/update/${compound.id}`]);
  }

  openCompoundPage(compound: any) {
    console.log(compound);    
    this.router.navigate([`/compound/${compound.id}`]);
  }

  fetchCompounds() {
    this.http.get(`http://localhost:4000/api/compound?page=${this.pageNumber}`).subscribe(
      (response: any) => {
        this.compounds = response.compounds;
        this.totalCompounds = response.numberOfCompounds;
        this.compoundsPerPage = response.resultPerPage;
        
        // Calculate total pages and use Math.ceil to ensure an integer
        this.totalPages = Math.ceil(this.totalCompounds / this.compoundsPerPage);
        
        console.log('Compounds fetched successfully:', response.compounds[0]);
      },
      (error) => {
        console.error('Error fetching compounds:', error);
      }
    );
  }
  

  changePage(page: number) {
    console.log(`Page changed to: ${page}`);
    this.pageNumber = page
    this.fetchCompounds();
  }
}
