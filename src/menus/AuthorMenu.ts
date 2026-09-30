import { createInterface } from "readline";
import { AuthorController } from "../controllers/AuthorController";

export class AuthorMenu {
  private controller: AuthorController;
  private rl = createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  constructor() {
    this.controller = new AuthorController();
  }

  async start(): Promise<void> {
    console.log("\n=== AUTORES ===");
    console.log("1 - Cadastrar autor");
    console.log("2 - Listar autores");
    console.log("0 - Sair");

    this.rl.question("Escolha: ", async (option) => {
      try {
        if (option === "1") {
          this.rl.question("Nome do autor: ", async (name) => {
            const author = await this.controller.create(name);
            console.log(`Autor cadastrado com ID ${author.id}.`);
            this.rl.close();
          });
        } else if (option === "2") {
          const authors = await this.controller.findAll();

          if (authors.length === 0) {
            console.log("Nenhum autor cadastrado.");
          } else {
            authors.forEach((author) => {
              console.log(`${author.id} - ${author.name}`);
            });
          }

          this.rl.close();
        } else {
          this.rl.close();
        }
      } catch (error) {
        console.error("Erro:", error);
        this.rl.close();
      }
    });
  }
}