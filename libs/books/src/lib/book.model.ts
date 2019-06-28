export class Book {
  id: number;
  year: number;
  title: string;
  publisher: string;
  authorId: number;

  constructor(
    id: number,
    year: number,
    title: string,
    authorId: number,
    publisher: string
  ) {
    this.id = id;
    this.year = year;
    this.title = title;
    this.authorId = authorId;
    this.publisher = publisher;
  }
}
