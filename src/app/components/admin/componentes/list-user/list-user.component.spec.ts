import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListUSerComponent } from './list-user.component';

describe('ListUSerComponent', () => {
  let component: ListUSerComponent;
  let fixture: ComponentFixture<ListUSerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListUSerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListUSerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
