import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageNameDialogComponent } from './page-name-dialog.component';

describe('PageNameDialogComponent', () => {
  let component: PageNameDialogComponent;
  let fixture: ComponentFixture<PageNameDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageNameDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageNameDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
