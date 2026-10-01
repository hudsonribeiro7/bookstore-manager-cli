import { createInterface } from "readline";
import { AuthorMenu } from "./AuthorMenu";

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

        if (option === "0") {
          console.log("Aplicação encerrada.");
          return;
        }

        console.log("Esta opção será integrada na próxima etapa.");
      } catch (error) {
        console.error("Erro:", error);
      }
    });
  }
}