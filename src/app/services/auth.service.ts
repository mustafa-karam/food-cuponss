import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { generate, Observable } from 'rxjs';
import { User } from '../interfaces/auth';
import { QrCodeRequest } from '../interfaces/QrCodeRequest';
import { RedeemCheck } from '../interfaces/redeemCheck';
import { environment } from '../../environments/environment.prod';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl =environment.apiUrl;


constructor(private http : HttpClient) { }

getEmployeeById(id:any):Observable<User[]>{
  return this.http.get<User[]>(`${this.baseUrl}/api/User/searchIds?searchword=${id}`);
}
generateQrCode(requests:QrCodeRequest[]):Observable<any>{
  return this.http.post<any[]>(`${this.baseUrl}/api/UserQrCode/GenerateMultipleQrCodes/generate-multiple`,requests)
}
SaveScanResult(id:string):Observable<any>{ 
  return this.http.post<any>(`${this.baseUrl}/api/UserQrCode/SaveScanResult`,JSON.stringify(id),{
    headers:{ 'Content-Type': 'application/json'}
  })
}

}
