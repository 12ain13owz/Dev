import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MockDataService {
  constructor() {}

  private mockUserData: userData[] = [
    {
      id: '10001',
      name: 'ไพบูรณ์',
      surname: 'วิธานธำรง',
      mobile: '0834',
      department: 'Marketing',
    },

    {
      id: '10002',
      name: 'นพพร',
      surname: 'ประพิณวงศ์',
      mobile: '1257',
      department: 'Accounting',
    },

    {
      id: '20001',
      name: 'เจตริน',
      surname: 'พุทใจดี',
      mobile: '2298',
      department: 'Admin',
    },

    {
      id: '30001',
      name: 'มานพ',
      surname: 'เกษี',
      mobile: '7748',
      department: 'IT',
    },

    {
      id: '30002',
      name: 'วรวีร์',
      surname: 'พิชิตพันธ์พงศ์',
      mobile: '7749',
      department: 'IT',
    },
  ];

  public reportData: reportData[] = [
    {
      csno: 'CS10003',
      status: 'New',
      notiDate: '12/01/2022',
      receiveDate: '',
      name: 'ไพบูรณ์ วิธานธำรง',
      problem: 'เมาส์เสีย',
      itName: '',
      detailProblem: '',
    },
    {
      csno: 'CS10002',
      status: 'Waiting',
      notiDate: '09/01/2022',
      receiveDate: '09/01/2022',
      name: 'ไพบูรณ์ วิธานธำรง',
      problem: 'ปริ้นเตอร์หมึกหมด',
      itName: 'วรวีร์ พิชิตพันธ์พงศ์',
      detailProblem: '',
    },
    {
      csno: 'CS10001',
      status: 'Close',
      notiDate: '25/12/2021',
      receiveDate: '26/12/2021',
      name: 'ไพบูรณ์ วิธานธำรง',
      problem: 'คอมเปิดไม่ติด',
      itName: 'มานพ เกษี',
      detailProblem: 'ปลั๊กไฟหลวม',
    },
  ];

  private userData: userData = {
    id: '',
    name: '',
    surname: '',
    mobile: '',
    department: '',
  };

  findUserbyID(id: string) {
    return this.mockUserData.find((el) => el.id === id);
  }

  findReportbyID(csno: string) {
    return this.reportData.find((el) => el.csno === csno);
  }

  set setUserData(data: userData) {
    this.userData = {
      id: data.id,
      name: data.name,
      surname: data.surname,
      mobile: data.mobile,
      department: data.department,
    };
  }

  get getUserData() {
    return this.userData;
  }

  get UserID() {
    return this.userData.id;
  }

  get UserName() {
    return this.userData.name;
  }

  get UserSurName() {
    return this.userData.surname;
  }
}

export interface userData {
  id: string;
  name: string;
  surname: string;
  mobile: string;
  department: string;
}

export interface reportData {
  csno: string;
  status: string;
  notiDate: string;
  receiveDate: string;
  name: string;
  problem: string;
  itName: string;
  detailProblem: string;
}
