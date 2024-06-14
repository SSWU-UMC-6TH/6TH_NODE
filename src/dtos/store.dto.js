export class StoreDTO {
  constructor({ name, location, description }) {
    if (!name || !location || !description) {
      throw new Error("All fields must be provided");
    }
    this.name = name;
    this.location = location;
    this.description = description;
  }
}
