export class Book {
  year: number;
  title: string;
  publisher: string;
  authorId: number;

  constructor(
    year: number,
    title: string,
    authorId: number,
    publisher: string
  ) {
    this.year = year;
    this.title = title;
    this.authorId = authorId;
    this.publisher = publisher;
  }
}
