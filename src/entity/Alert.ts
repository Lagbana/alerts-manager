import { Entity, ObjectIdColumn, Column, Index } from "typeorm";
import type { Info } from "../types";

@Entity()
export class Alert {
  @ObjectIdColumn()
  _id: string;

  @Column()
  xmlns: string;

  @Index()
  @Column()
  identifier: string;

  @Column()
  sender: string;

  @Column()
  sent: string;

  @Column()
  status: string;

  @Column()
  msgType: string;

  @Column()
  source: string;

  @Column()
  scope: string;

  @Column()
  code: Array<string>;

  @Column()
  note: string;

  @Index()
  @Column()
  references: string;

  @Column()
  info: Array<Info>;

  @Column()
  signature: string;

  constructor(alert: Alert) {
    Object.assign(this, alert);
  }
}
