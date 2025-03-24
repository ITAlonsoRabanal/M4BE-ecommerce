import { Entity, PrimaryGeneratedColumn, Column, OneToOne, ManyToMany } from 'typeorm';
import { Order } from './orders.entity';
import { Product } from './products.entity';

@Entity('order_details')
export class OrderDetail {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false,
    transformer: {
      to: (value: number) => value,
      from: (value: string) => parseFloat(value),
    },
  })
  price: number;

  @OneToOne(() => Order, (order) => order.orderDetail, { onDelete: 'CASCADE' })
  order: Order;

  @ManyToMany(() => Product, (product) => product.orderDetails)
  products: Product[];
}
