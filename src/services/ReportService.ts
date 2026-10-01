import { ReportRepository } from "../repositories/ReportRepository";

export class ReportService {
  private repository = new ReportRepository();

  async availableBooks() {
    return this.repository.availableBooks();
  }

  async borrowedBooks() {
    return this.repository.borrowedBooks();
  }

  async booksByAuthor() {
    return this.repository.booksByAuthor();
  }

  async loanCountByBook() {
    return this.repository.loanCountByBook();
  }

  async clientsWithActiveLoans() {
    return this.repository.clientsWithActiveLoans();
  }
}