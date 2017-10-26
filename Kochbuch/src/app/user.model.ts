/** 
 * @author Daniel Abel
 * @author Alexander Krieg
 */
export class User {
    id: number;
    email: String;
    creationDate: Date;
    deletionDate: Date;
    pwHash: String;
    constructor(id:number){
      this.id = id;
    }
  }