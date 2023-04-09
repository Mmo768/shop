import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandProductComponent } from './brand-product.component';

describe('BrandProductComponent', () => {
  let component: BrandProductComponent;
  let fixture: ComponentFixture<BrandProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrandProductComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BrandProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
