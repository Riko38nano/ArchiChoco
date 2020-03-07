import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComptaComponent } from './compta.component';

describe('ComptaComponent', () => {
  let component: ComptaComponent;
  let fixture: ComponentFixture<ComptaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComptaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComptaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
