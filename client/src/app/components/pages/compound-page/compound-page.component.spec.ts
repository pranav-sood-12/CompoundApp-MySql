import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompoundPageComponent } from './compound-page.component';

describe('CompoundPageComponent', () => {
  let component: CompoundPageComponent;
  let fixture: ComponentFixture<CompoundPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompoundPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CompoundPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
