export interface Loan {
  id?: number;
  bookId: number;
  clientId: number;
  loanDate?: Date;
  returnDate?: Date | null;
}