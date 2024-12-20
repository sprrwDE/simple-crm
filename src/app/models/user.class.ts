export class User {
  firstName!: string;
  lastName!: string;
  birthDate!: number;
  street!: string;
  zip!: number;
  city!: string;

  constructor(obj?: any) {
    this.firstName = obj ? obj.firstName : '';
    this.lastName = obj ? obj.lastName : '';
    this.birthDate = obj ? obj.birthDate : '';
    this.street = obj ? obj.street : '';
    this.zip = obj ? obj.zip : '';
    this.city = obj ? obj.city : '';
  }

  public toJSON() {
    return {
      firstName: this.firstName,
      lastName: this.lastName,
      birthDate: this.birthDate,
      street: this.street,
      zip: this.zip,
      city: this.city
    };
  }
}
