import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroProductsComponent } from './registro-products.component';

describe('RegistroProductsComponent', () => {
  let component: RegistroProductsComponent;
  let fixture: ComponentFixture<RegistroProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistroProductsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
