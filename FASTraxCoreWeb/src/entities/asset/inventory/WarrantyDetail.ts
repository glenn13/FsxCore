export default interface WarrantyDetail {
  id: number;
  referenceNo: string;
  registeredTo: string;
  warrantyProvider: string;
  startDate: Date;
  expiryDate: Date;
}
