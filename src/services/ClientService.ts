import { ClientRepository } from "../repositories/ClientRepository";
import { Client } from "../models/Client";

export class ClientService {
  private repository = new ClientRepository();

  async create(name: string, email: string): Promise<Client> {
    if (!name.trim()) {
      throw new Error("O nome do cliente é obrigatório.");
    }

    if (!email.trim()) {
      throw new Error("O e-mail do cliente é obrigatório.");
    }

    return this.repository.create(name, email);
  }

  async findAll(): Promise<Client[]> {
    return this.repository.findAll();
  }
}