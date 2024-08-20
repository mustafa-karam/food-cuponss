import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { UserQrComponent } from './components/user-qr/user-qr.component';
import { QrScannerComponent } from './qr-scanner/qr-scanner.component';
// import{}
export const routes: Routes = [
    {path:'login', component:LoginComponent},
    {path:'register', component:RegisterComponent},
    {path:'home', component:HomeComponent},
    {path:'search', component:UserQrComponent},
    {path:'scanner', component:QrScannerComponent},
    {path:'', redirectTo:'home',pathMatch:'full'},
];
