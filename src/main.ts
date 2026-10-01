import { MainMenu } from "./menus/MainMenu";

async function main(): Promise<void> {
  const menu = new MainMenu();

  await menu.start();
}

main().catch((error) => {
  console.error("Erro ao iniciar a aplicação:", error);
});