// import { separateAndCleanRecords } from "~/utils/utilFunctions";
//
// export const entry = {
//   rawData:
//     '"Submission Time","Parent / Legal Guardian Name","Email Address",Phone,Team,"Name - First Name","Name - Middle Name","Name - Last Name","Date of Birth",Gender,"Meet Date","Enter events","Number of events","Available for time-keeping?","Helper\'s Name","Payment utils","Entry Fee","Card Name","Address - Street Address","Address - Apartment, suite, etc","Address - City","Address - State/Province","Address - Postcode","Address - Country","Credit / Debit Card - Mode","Credit / Debit Card - Product / Plan Name","Credit / Debit Card - Payment utils","Credit / Debit Card - Amount","Credit / Debit Card - Currency","Credit / Debit Card - Quantity","Credit / Debit Card - Transaction ID","Credit / Debit Card - Status","Credit / Debit Card - Manage",T&Cs\n' +
//     '"May 23, 2023 @ 9:49 AM","Petr Faitl",pfaitl@gmail.com,0276728032,LVWBP,Oliver,,Faitl,08/11/2015,Male,24/06/2023,"12m Back, 12m Free",2,,,"Credit card","NZ$ 10.60","Petr Faitl","39 River Oaks Drive",Tauranga,Tauranga,BOP,3112,"New Zealand",live,"LVWA club night entry","One Time",10.60,NZD,1,pi_3NAgbZFC4Jqb2d060D9efoqH,COMPLETED,,checked\n' +
//     '"May 30, 2023 @ 10:49 AM","Petr Faitl",pfaitl@gmail.com,0276728032,LVWBP,Oli,,Faitl,08/11/2015,Male,24/06/2023,"50m Back, 50m Free",2,,,"Credit card","NZ$ 10.60","Petr Faitl","39 River Oaks Drive",Tauranga,Tauranga,BOP,3112,"New Zealand",live,"LVWA club night entry","One Time",10.60,NZD,1,pi_3NAgbZFC4Jqb2d060D9efoqH,COMPLETED,,checked',
//   getHeaderRow() {
//     return this.rawData.slice(0, this.rawData.indexOf("\n"));
//   },
//   getHeaderArray() {
//     const h = this.getHeaderRow();
//     return separateAndCleanRecords(h);
//   },
//   getAllData() {
//     this.dataArr = this.rawData.split("\n");
//     return this.dataArr;
//   },
//   getDataRows() {},
//   entryRows() {
//     return this.rawData.split("\n");
//   },
// };
