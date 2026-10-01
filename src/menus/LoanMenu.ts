import { createInterface } from "readline";
import { LoanService } from "../services/LoanService";

export class LoanMenu {
  private service = new LoanService();

  async start(): Promise<void> {
    const rl = createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    console.log("\n=== EMPRÉSTIMOS ===");
    console.log("1 - Criar empréstimo");
    console.log("2 - Listar empréstimos");
    console.log("3 - Registrar devolução");
    console.log("0 - Voltar");

    rl.question("Escolha: ", async (option) => {
      try {
        if (option === "1") {
          rl.question("ID do livro: ", async (bookIdInput) => {
            rl.question("ID do cliente: ", async (clientIdInput) => {
              try {
                const bookId = Number(bookIdInput);
                const clientId = Number(clientIdInput);

                const loan = await this.service.create(bookId, clientId);

                console.log(
                  `Empréstimo criado com ID ${loan.id}.`
                );
              } catch (error) {
                console.error("Erro:", error);
              }

              rl.close();
            });
          });

          return;
        }

        if (option === "2") {
          const loans = await this.service.findAll();

          if (loans.length === 0) {
            console.log("Nenhum empréstimo cadastrado.");
          } else {
            loans.forEach((loan) => {
              const status = loan.returnDate ? "Devolvido" : "Ativo";

              console.log(
                `${loan.id} - Livro: ${loan.bookTitle} | Cliente: ${loan.clientName} | ${status}`
              );
            });
          }

          rl.close();
          return;
        }

        if (option === "3") {
          rl.question("ID do empréstimo: ", async (loanIdInput) => {
            try {
              const loanId = Number(loanIdInput);

              await this.service.returnBook(loanId);

              console.log("Devolução registrada com sucesso.");
            } catch (error) {
              console.error("Erro:", error);
            }

            rl.close();
          });

          return;
        }

        rl.close();
      } catch (error) {
        console.error("Erro:", error);
        rl.close();
      }
    });
  }
}