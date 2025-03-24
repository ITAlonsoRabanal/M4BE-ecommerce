import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';
import { OrderDetail } from './orderDetails.entity';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.orders, { onDelete: 'CASCADE' })
  user: User;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  date: Date;

  @OneToOne(() => OrderDetail, (orderDetail) => orderDetail.order, { cascade: true })
  @JoinColumn()
  orderDetail: OrderDetail;
} 
