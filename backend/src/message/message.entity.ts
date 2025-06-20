import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class MessageEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @Column()
  senderId: string;

  @Column()
  recipientId: string;

  @Column()
  roomId: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ default: false })
  read: boolean;
}
