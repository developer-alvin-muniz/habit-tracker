export class HabitRecord {
  id: number;
  date: Date;
  completed: boolean;

  constructor(id: number, date: Date, completed:boolean) {
    this.id = id;
    this.date = date;
    this.completed = completed;
  }


}
