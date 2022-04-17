import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity("user")
export class user {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;
}
