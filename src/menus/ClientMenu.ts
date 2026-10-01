import { createInterface } from "readline";
import { ClientRepository } from "../repositories/ClientRepository";

export class ClientMenu {
  private repository = new ClientRepository();

  async start(): Promise<void> {
    const rl = createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    console.log("\n=== CLIENTES ===");
    console.log("1 - Cadastrar cliente");
    console.log("2 - Listar clientes");
    console.log("0 - Voltar");

    rl.question("Escolha: ", async (option) => {
      try {
        if (option === "1") {
          rl.question("Nome do cliente: ", async (name) => {
            rl.question("E-mail do cliente: ", async (email) => {
              try {
                const client = await this.repository.create(name, email);

                console.log(
                  `Cliente cadastrado com ID ${client.id}.`
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
          const clients = await this.repository.findAll();

          if (clients.length === 0) {
            console.log("Nenhum cliente cadastrado.");
          } else {
            clients.forEach((client) => {
              console.log(
                `${client.id} - ${client.name} | ${client.email}`
              );
            });
          }

          rl.close();
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