import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlideMenuButtonComponent } from './slide-menu-button.component';

describe('SlideMenuButtonComponent', () => {
  let component: SlideMenuButtonComponent;
  let fixture: ComponentFixture<SlideMenuButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SlideMenuButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SlideMenuButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
