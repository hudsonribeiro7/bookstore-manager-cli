import { createInterface } from "readline";
import { BookRepository } from "../repositories/BookRepository";

export class BookMenu {
  private repository = new BookRepository();

  async start(): Promise<void> {
    const rl = createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    console.log("\n=== LIVROS ===");
    console.log("1 - Cadastrar livro");
    console.log("2 - Listar livros");
    console.log("0 - Voltar");

    rl.question("Escolha: ", async (option) => {
      try {
        if (option === "1") {
          rl.question("Título do livro: ", async (title) => {
            rl.question("ID do autor: ", async (authorIdInput) => {
              const authorId = Number(authorIdInput);

              try {
                const book = await this.repository.create(title, authorId);

                console.log(
                  `Livro cadastrado com ID ${book.id}.`
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
          const books = await this.repository.findAll();

          if (books.length === 0) {
            console.log("Nenhum livro cadastrado.");
          } else {
            books.forEach((book) => {
              const status = book.available
                ? "Disponível"
                : "Emprestado";

              console.log(
                `${book.id} - ${book.title} | Autor: ${book.authorName} | ${status}`
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