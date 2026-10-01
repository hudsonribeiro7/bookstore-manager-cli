import { createInterface } from "readline";
import { AuthorMenu } from "./AuthorMenu";
import { BookMenu } from "./BookMenu";
import { ClientMenu } from "./ClientMenu";
import { LoanMenu } from "./LoanMenu";
import { ReportService } from "../services/ReportService";

export class MainMenu {
  private rl = createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  async start(): Promise<void> {
    console.log("\n=== BOOKSTORE MANAGER ===");
    console.log("1 - Autores");
    console.log("2 - Livros");
    console.log("3 - Clientes");
    console.log("4 - Empréstimos");
    console.log("5 - Relatórios");
    console.log("0 - Sair");

    this.rl.question("Escolha: ", async (option) => {
      this.rl.close();

      try {
        if (option === "1") {
          const menu = new AuthorMenu();
          await menu.start();
          return;
        }

        if (option === "2") {
          const menu = new BookMenu();
          await menu.start();
          return;
        }

        if (option === "3") {
          const menu = new ClientMenu();
          await menu.start();
          return;
        }

        if (option === "4") {
          const menu = new LoanMenu();
          await menu.start();
          return;
        }

        if (option === "5") {
          const service = new ReportService();

          console.log("\n=== RELATÓRIOS ===");

          const availableBooks = await service.availableBooks();

          console.log("\nLivros disponíveis:");
          availableBooks.forEach((book) => {
            console.log(
              `${book.id} - ${book.title} | Autor: ${book.authorName}`
            );
          });

          const borrowedBooks = await service.borrowedBooks();

          console.log("\nLivros emprestados:");
          borrowedBooks.forEach((loan) => {
            console.log(
              `${loan.bookTitle} - Cliente: ${loan.clientName}`
            );
          });

          const booksByAuthor = await service.booksByAuthor();

          console.log("\nLivros por autor:");
          booksByAuthor.forEach((item) => {
            console.log(`${item.authorName}: ${item.totalBooks}`);
          });

          const loanCountByBook = await service.loanCountByBook();

          console.log("\nEmpréstimos por livro:");
          loanCountByBook.forEach((item) => {
            console.log(`${item.bookTitle}: ${item.totalLoans}`);
          });

          const activeClients = await service.clientsWithActiveLoans();

          console.log("\nClientes com empréstimos ativos:");
          activeClients.forEach((client) => {
            console.log(
              `${client.clientName}: ${client.activeLoans} empréstimo(s)`
            );
          });

          return;
        }

        if (option === "0") {
          console.log("Aplicação encerrada.");
          return;
        }

        console.log("Opção inválida.");
      } catch (error) {
        console.error("Erro:", error);
      }
    });
  }
}