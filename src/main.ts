import { AuthorMenu } from "./menus/AuthorMenu";

async function main(): Promise<void> {
  const menu = new AuthorMenu();

  await menu.start();
}

main().catch((error) => {
  console.error("Erro ao iniciar a aplicação:", error);
});