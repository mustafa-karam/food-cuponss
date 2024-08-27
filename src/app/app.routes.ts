import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { UserQrComponent } from './components/user-qr/user-qr.component';
import { QrScannerComponent } from './qr-scanner/qr-scanner.component';
// import{}
export const routes: Routes = [
    {path:'', redirectTo:'login',pathMatch:'full'},
    {path:'login', component:LoginComponent},
    {path:'search', component:UserQrComponent},
    {path:'scanner', component:QrScannerComponent},
];
