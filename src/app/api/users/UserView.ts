import { User } from "knex/types/tables.js";

class UserView {
  id: number;
  name: string;
  email: string;
  created_at: Date;
  updated_at: Date;

  constructor(user : User) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
    this.created_at = user.created_at;
    this.updated_at = user.updated_at;
  
  }
}

export default UserView;