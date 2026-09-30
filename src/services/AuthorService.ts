import { AuthorRepository } from "../repositories/AuthorRepository";
import { Author } from "../models/Author";

export class AuthorService {
  private repository: AuthorRepository;

  constructor() {
    this.repository = new AuthorRepository();
  }

  async create(name: string): Promise<Author> {
    if (!name.trim()) {
      throw new Error("O nome do autor é obrigatório.");
    }

    return this.repository.create(name);
  }

  async findAll(): Promise<Author[]> {
    return this.repository.findAll();
  }
}