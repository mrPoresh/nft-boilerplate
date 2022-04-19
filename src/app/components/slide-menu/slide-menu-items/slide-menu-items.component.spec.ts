import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlideMenuItemsComponent } from './slide-menu-items.component';

describe('SlideMenuItemsComponent', () => {
  let component: SlideMenuItemsComponent;
  let fixture: ComponentFixture<SlideMenuItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SlideMenuItemsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SlideMenuItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
