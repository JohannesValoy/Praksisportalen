import { Knex } from "knex";

declare module "knex/types/tables.js" {
  interface User {
      id: number;
      email: string;
      password: string;
      created_at: Date;
      updated_at: Date;
  }

    interface Department {
        id: number;
        name: string;
        created_at: Date;
        updated_at: Date;
    }

    interface Tables {
        users: User;
        departments: Department;
    }
}