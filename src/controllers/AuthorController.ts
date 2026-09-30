import { AuthorService } from "../services/AuthorService";

export class AuthorController {
  private service: AuthorService;

  constructor() {
    this.service = new AuthorService();
  }

  async create(name: string) {
    return this.service.create(name);
  }

  async findAll() {
    return this.service.findAll();
  }
}