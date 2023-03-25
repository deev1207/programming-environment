import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompileComponent } from './compile.component';

describe('CompileComponent', () => {
  let component: CompileComponent;
  let fixture: ComponentFixture<CompileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
