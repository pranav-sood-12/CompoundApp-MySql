import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCompoundsComponent } from './create-compounds.component';

describe('CreateCompoundsComponent', () => {
  let component: CreateCompoundsComponent;
  let fixture: ComponentFixture<CreateCompoundsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateCompoundsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateCompoundsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
