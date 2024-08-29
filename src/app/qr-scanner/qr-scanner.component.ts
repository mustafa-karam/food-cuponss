import { AfterViewInit, Component, ViewChild} from '@angular/core';
import { NgxScannerQrcodeModule} from 'ngx-scanner-qrcode';
import {
  ScannerQRCodeConfig,
  ScannerQRCodeResult,
  NgxScannerQrcodeService,
  NgxScannerQrcodeComponent,
  ScannerQRCodeSelectedFiles,
} from 'ngx-scanner-qrcode';
import { NgFor ,NgIf} from '@angular/common';
import { scannedUser } from '../interfaces/scanned-user';
import { AuthService } from '../services/auth.service';
import { RedeemMessages} from '../interfaces/redeemMsg';
import { RedeemCheck } from '../interfaces/redeemCheck';

@Component({
  selector: 'app-qr-scanner',
  standalone: true,
  imports: [NgxScannerQrcodeModule,NgFor,NgIf],
  templateUrl: './qr-scanner.component.html',
  styleUrl: './qr-scanner.component.css'

})


export class QrScannerComponent implements AfterViewInit {
  public config: ScannerQRCodeConfig = {
    constraints: {
      video: {
        width: window.innerWidth,
      },
    },
  };

  public qrCodeResult: ScannerQRCodeSelectedFiles[] = [];
  public showModal: boolean = false; //for confirmation modal
  public showInvalidQrModal:boolean = false; // for Invalid QrCode modal
  public scannedData: any = {};
  public serveMeal : boolean = false;
  public redeemedOrnot : boolean = false;
  public redeemMessages :RedeemMessages ={
    accept:"Happy meal",
    reject:"Employee has already redeemed his meal."
  }
  public redeemObj:RedeemCheck={
    employeeId:""
  };




  @ViewChild('action') action!: NgxScannerQrcodeComponent;

  constructor(private qrcode: NgxScannerQrcodeService,private authService:AuthService) { }

  ngAfterViewInit(): void {
    this.action.isReady.subscribe((res: any) => {
      // this.handle(this.action, 'start');
    });
  }

  public onEvent(e: ScannerQRCodeResult[], action?: any): void {
    e && action && action.pause();
    const employeeData = e[0].value;
    this.scannedData = this.parseEmployeeData(employeeData);     
    if(this.isValidQrCode(this.scannedData)){  
      this.showModal = true; 
    }else{
      this.showInvalidQrModal = true;
    }
    // console.log(this.showModal);   
    // console.log(this.showInvalidQrModal);   
  }
 
  // private parseEmployeeData(data:string):scannedUser{
  //   const dataArray = data.split(',');
  //   const parsedData :scannedUser = {
  //     EmployeeId : dataArray[0].split(':')[1].trim(),
  //     FullName: dataArray[1].split(':')[1].trim()
  //   }
   
  //   return parsedData;
  // }


  private parseEmployeeData(data: string): scannedUser {
    const parsedData: scannedUser = { EmployeeId: '', FullName: '' };
    const dataArray = data.split(',');

    dataArray.forEach(item => {
        const [key, value] = item.split(':').map(str => str.trim());
        if (key === 'EmployeeId') {
            parsedData.EmployeeId = value;
        } else if (key === 'FullName') {
            parsedData.FullName = value;
        }
    });

    return parsedData;
}





  private isValidQrCode(data: scannedUser): boolean {
    return !!data.EmployeeId && !!data.FullName;
}


  public onConfirm(): void {
    this.serveMeal = true;


    // console.log('Confirmed:', this.scannedData);
   
    this.authService.SaveScanResult(this.scannedData.EmployeeId.toString()).subscribe((res:boolean)=>{
      // console.log(this.redeemObj);
      
      if(res === true){
        this.redeemedOrnot = true;
        // console.log(this.redeemMessages.accept);
      }
      // else
      // console.log(this.redeemMessages.reject);

    })
    this.showModal = false; 
    this.action.play(); 
  }

  public onCancel(): void {
    console.log('Cancelled');
    this.showModal = false;
    this.serveMeal = false;
    this.showInvalidQrModal = false; 
    this.action.play(); 
  }

  public handle(action: any, fn: string): void {
    const playDeviceFacingBack = (devices: any[]) => {
      const device = devices.find(f => (/back|rear|environment/gi.test(f.label)));
      action.playDevice(device ? device.deviceId : devices[0].deviceId);
    }

    if (fn === 'start') {
      action[fn](playDeviceFacingBack).subscribe((r: any) => console.log(fn, r), alert);
    } else {
      action[fn]().subscribe((r: any) => console.log(fn, r), alert);
    }
  }
}
