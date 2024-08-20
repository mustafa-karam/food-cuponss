import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserQrComponent } from './user-qr.component';

describe('UserQrComponent', () => {
  let component: UserQrComponent;
  let fixture: ComponentFixture<UserQrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserQrComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserQrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
