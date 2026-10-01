import { LoanRepository } from "../repositories/LoanRepository";
import { Loan } from "../models/Loan";

export class LoanService {
  private repository = new LoanRepository();

  async create(bookId: number, clientId: number): Promise<Loan> {
    if (bookId <= 0 || clientId <= 0) {
      throw new Error("Livro e cliente são obrigatórios.");
    }

    return this.repository.create(bookId, clientId);
  }

  async findAll(): Promise<Loan[]> {
    return this.repository.findAll();
  }
    async returnBook(loanId: number): Promise<void> {
    if (loanId <= 0) {
      throw new Error("ID do empréstimo inválido.");
    }

    await this.repository.returnBook(loanId);
  }
}