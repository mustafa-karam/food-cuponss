import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgIf ,NgFor} from '@angular/common';
// import { NgModule } from '@angular/core';
// import { NgModel } from '@angular/forms';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-qr',
  standalone: true,
  imports: [NgIf,FormsModule,NgFor],
  templateUrl: './user-qr.component.html',
  styleUrl: './user-qr.component.css'
})
export class UserQrComponent {
  searchText: string = '';
  users: any[] = []; // Will hold all users fetched from the backend
  filteredUsers: any[] = []; // Will hold users matching the search
  selectedUsers: any[] = []; // To store selected users for bulk processing

  constructor(private http: HttpClient) {
    // Fetch all users initially
    this.http.get<any[]>('http://localhost:3000/users').subscribe((data) => {
      this.users = data;
      this.filteredUsers = this.users;
       // Initialize the filtered list
    });
  }

  onSearch() {
    if (!this.searchText) {
      // If searchText is empty, reset the filtered list to all users
      this.filteredUsers = [...this.users];
    } else {
      this.filteredUsers = this.users.filter((user) =>
        user.email.includes(this.searchText)
      );
    }
  }
  
}

//   generateQrCodes() {
//     const selectedUsers = this.filteredUsers.filter(user => user.isSelected);

//     const requests = selectedUsers.map(user => ({
//       EmployeeId: user.EmployeeId,
//       Ar_FullName: user.Ar_Full_Name,
//       Payload: ${user.EmployeeId} - ${user.Ar_Full_Name},
//       PixelsPerModule: 20 // Customize as needed
//     }));

//     this.http
//       .post('/api/userqrcode/generate-multiple', requests)
//       .subscribe((response: any) => {
//         response.qrCodes.forEach((qrCodeItem: any) => {
//           this.downloadQrCode(qrCodeItem.qrCode, qrCodeItem.EmployeeId);
//         });
//       });
//   }

//   downloadQrCode(qrCodeBase64: string, employeeId: string) {
//     const link = document.createElement('a');
//     link.href = data:image/png;base64,${qrCodeBase64};
//     link.download = ${employeeId}.png; // Naming the file with EmployeeId
//     link.click();
//   }
// }