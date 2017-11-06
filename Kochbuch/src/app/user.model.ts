/**
 * @author Daniel Abel
 * @author Alexander Krieg
 * @author Theresa Reus
 * @author Patrick Eichert
 */
export class User {
    id: number;
    username: string;
    creationDate: Date;
    deletionDate: Date;
    password: String;
    constructor(id:number){
      this.id = id;
    }
  }
