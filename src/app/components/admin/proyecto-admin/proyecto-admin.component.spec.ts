import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProyectoAdminComponent } from './proyecto-admin.component';

describe('ProyectoAdminComponent', () => {
  let component: ProyectoAdminComponent;
  let fixture: ComponentFixture<ProyectoAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProyectoAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProyectoAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
