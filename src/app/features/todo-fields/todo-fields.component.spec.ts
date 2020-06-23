import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoFieldsComponent } from './todo-fields.component';

describe('TodoFieldsComponent', () => {
  let component: TodoFieldsComponent;
  let fixture: ComponentFixture<TodoFieldsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodoFieldsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoFieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
