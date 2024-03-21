declare module "knex/types/tables" {
  interface User {
      id: number;
      email: string;
      password: string;
      created_at: Date;
      updated_at: Date;
  }

    interface Departments {
        departments: {
        id: number;
        name: string;
        created_at: Date;
        updated_at: Date;
        };
    }

    interface Tables {
        users: User;
        departments: Departments;

    }
}