import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { generate, Observable } from 'rxjs';
import { User } from '../interfaces/auth';
import { QrCodeRequest } from '../interfaces/QrCodeRequest';
import { RedeemCheck } from '../interfaces/redeemCheck';
@Injectable({
  providedIn: 'root'
})
export class AuthService {


// private baseUrl = "http://ec2-3-250-49-168.eu-west-1.compute.amazonaws.com";


constructor(private http : HttpClient) { }

getEmployeeById(id:any):Observable<User[]>{
  // return this.http.get<User[]>(`${this.baseUrl}/api/User/searchIds?=${id}`); for production
  return this.http.get<User[]>("/api/User/searchIds"); // for development to bypass CORS error 
}
generateQrCode(requests:QrCodeRequest[]):Observable<any>{
  // return this.http.post<any[]>(`${this.baseUrl}/api/UserQrCode/GenerateMultipleCodes/generate-multiple`,requests)
  return this.http.post<any[]>("/api/UserQrCode/GenerateMultipleQrCodes/generate-multiple",requests)
}
SaveScanResult(id:string):Observable<any>{ 
  return this.http.post<any>("/api/UserQrCode/SaveScanResult",JSON.stringify(id),{
    headers:{ 'Content-Type': 'application/json'}
  })
}

}
