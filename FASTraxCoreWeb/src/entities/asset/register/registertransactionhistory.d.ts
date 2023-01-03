interface RegisterTransactionHistory {
  id: number;
  assetid: number;
  assetCategoryId: number;
  transactionHistoryTypeId: number;
  transactionHistoryType: string;
  referenceNo: string;
  status: string;
  transactionDetails: string;
  issuedDate?: Date;
  createdBy: string;
  dateClosed?: Date;

  uri: string;
}
