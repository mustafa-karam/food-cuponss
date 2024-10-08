import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgIf ,NgFor} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { User } from '../../interfaces/auth';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-user-qr',
  standalone: true,
  imports: [NgIf,FormsModule,NgFor,ButtonModule],
  templateUrl: './user-qr.component.html',
  styleUrl: './user-qr.component.css'
})
export class UserQrComponent {
  searchText:any;
  users: any[] = []; // Will hold all users fetched from the backend
  filteredUsers: any[] = []; // Will hold users matching the search
  selectedUsers: any[] = []; // To store selected users for bulk processing
  qrCodesCreated : boolean = false;

  constructor(private http: HttpClient,private authService:AuthService,) {
    
  }

  onSearch() {
    if(this.searchText == undefined) return;
    
    if(this.searchText.toString().length >= 2 ){

      this.authService.getEmployeeById(this.searchText as number).subscribe((data) => {
        this.users = data.map(user =>({
          ...user,
          
          "isSelected":false
        }));
        
        this.filteredUsers = this.users;
      });
    } else{
      this.filteredUsers = [];
    }
  }



preventInvalidInput(event: KeyboardEvent): void {
  if (['e', 'E', '+', '-'].includes(event.key)) {
    event.preventDefault();
  }
}


  isAnyUserSelected(): boolean {
    return this.selectedUsers.some(user => user.isSelected);
  }
  onCheckboxChange(user:User){
    if(user.isSelected){
      this.selectedUsers.push(user)
    }else {
      // Remove user from selectedUsers array if it's unchecked
      this.selectedUsers = this.selectedUsers.filter(selectedUser => selectedUser.employeeId !== user.employeeId);
    }
    
  }


  generateQrCodes() {
    const requests = this.selectedUsers.map(user => ({
      EmployeeId: user.employeeId.toString(),
      Ar_FullName: user.ar_Full_Name,
      Payload: `${user.employeeId}-${user.ar_Full_Name}`,
      PixelsPerModule: 20 // Customize as needed
    }));

    this.authService.generateQrCode(requests)
      .subscribe((response: any) => {
        console.log(response);
        if(response){
          this.qrCodesCreated = true;
          
        }
        response.qrCodes.forEach((qrCodeItem: any) => {
          this.downloadQrCode(qrCodeItem.qrCode, qrCodeItem.employeeId);         
        });
      });
     
  }
  onCancel(){
    this.qrCodesCreated = false;
    this.selectedUsers = [];
          this.searchText="";
          this.filteredUsers=[];
  }

  downloadQrCode(qrCodeBase64: string, employeeId: string) {
    const link = document.createElement('a');
    link.href = `data:image/png;base64,${qrCodeBase64}`;
    link.download = `${employeeId}.png`; // Naming the file with EmployeeId
    link.click();
  }
}
