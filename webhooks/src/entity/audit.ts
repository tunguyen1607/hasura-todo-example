import { Column, Entity, PrimaryColumn, CreateDateColumn } from "typeorm";

@Entity("audit")
export class audit {
  @PrimaryColumn()
  id: string;

  @Column()
  description: string;

  @CreateDateColumn()
  created_at: Date;
}
