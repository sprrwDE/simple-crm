export class User {
  firstName!: string;
  lastName!: string;
  birthDate!: number;
  street!: string;
  email!: string;
  zip!: number;
  city!: string;
  id!: string;

  constructor(obj?: any) {
    this.firstName = obj ? obj.firstName : '';
    this.lastName = obj ? obj.lastName : '';
    this.birthDate = obj ? obj.birthDate : '';
    this.street = obj ? obj.street : '';
    this.email = obj ? obj.email : '';
    this.zip = obj ? obj.zip : '';
    this.city = obj ? obj.city : '';
    this.id = obj ? obj.id : ''
  }

  public toJSON() {
    return {
      firstName: this.firstName,
      lastName: this.lastName,
      birthDate: this.birthDate,
      street: this.street,
      email: this.email,
      zip: this.zip,
      city: this.city,
      id: this.id
    };
  }
}