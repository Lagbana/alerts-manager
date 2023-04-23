import { Entity, ObjectIdColumn, Column, Index } from "typeorm";

@Entity()
export class EventCode {
  @ObjectIdColumn()
  _id: string;

  @Index({ unique: true })
  @Column()
  code: string;

  @Column()
  urgency: string;

  @Column()
  severity: string;

  @Column()
  certainty: string;

  @Column()
  comments: string;

  @Column()
  description: string;

  constructor(eventCode: EventCode) {
    Object.assign(this, eventCode);
  }
}
