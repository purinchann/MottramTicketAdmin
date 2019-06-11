import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchPurchasedOrderComponent } from './search-purchased-order.component';

describe('SearchPurchasedOrderComponent', () => {
  let component: SearchPurchasedOrderComponent;
  let fixture: ComponentFixture<SearchPurchasedOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchPurchasedOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchPurchasedOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
