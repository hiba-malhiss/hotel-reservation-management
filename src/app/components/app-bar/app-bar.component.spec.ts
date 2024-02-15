import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppBarComponent } from './app-bar.component';
import { AppBarModule } from './app-bar.module';
import { AuthService } from '../../services/auth/auth.service';
import { By } from '@angular/platform-browser';
import { MenuItem } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';

describe('AppBarComponent', () => {
  let component: AppBarComponent;
  let fixture: ComponentFixture<AppBarComponent>;
  let authService: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppBarModule],
      providers: [{ provide: ActivatedRoute, useValue: {} }]
    }).compileComponents();

    fixture = TestBed.createComponent(AppBarComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display menu item list correctly', () => {
    const menuItems: MenuItem[] = [
      { label: 'Home', routerLink: '/home' },
      { label: 'Rooms', routerLink: '/rooms' },
      { label: 'Attractions', routerLink: '/attractions' }
    ];

    component.items = menuItems;
    fixture.detectChanges();

    const menuItemsElements =
      fixture.nativeElement.querySelectorAll('.p-menuitem');
    expect(menuItemsElements.length).toBe(menuItems.length);

    menuItems.forEach((menuItem, index) => {
      expect(menuItemsElements[index].textContent.trim()).toBe(menuItem.label);
    });
  });

  it('should display login and register buttons when user is not logged in', () => {
    authService.currentUser$.next(null);
    fixture.detectChanges();

    const loginButton = fixture.debugElement.query(
      By.css('.p-button-label')
    ).nativeElement;
    expect(loginButton.textContent.trim()).toBe('Login');

    const registerButton = fixture.debugElement.queryAll(
      By.css('.p-button-label')
    )[1].nativeElement;
    expect(registerButton.textContent.trim()).toBe('Register');
  });

  it('should display user menu button when user is logged in', () => {
    authService.currentUser$.next({
      email: '',
      password: '',
      name: 'User Name'
    });
    fixture.detectChanges();

    const userMenuButton = fixture.debugElement.query(
      By.css('.AppBar-userMenu')
    ).nativeElement;
    expect(userMenuButton.textContent.trim()).toBe('User Name');
  });

  it('should call authService.logout() when "Sign Out" menu button is clicked', () => {
    spyOn(authService, 'logout');
    authService.currentUser$.next({
      email: '',
      password: '',
      name: 'Test User'
    });
    fixture.detectChanges();

    const userMenuButton = fixture.debugElement.query(
      By.css('.AppBar-userMenu')
    ).nativeElement;
    userMenuButton.click();
    fixture.detectChanges();

    const signOutMenuItem = fixture.debugElement.query(
      By.css('.pi-sign-out')
    ).nativeElement;
    signOutMenuItem.click();
    expect(authService.logout).toHaveBeenCalled();
  });
});
