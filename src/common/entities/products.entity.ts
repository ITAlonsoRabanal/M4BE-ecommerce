import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable, JoinColumn } from 'typeorm';
import { Category } from './categories.entity';
import { OrderDetail } from './orderDetails.entity';


@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  name: string;

  @Column({ type: 'text', nullable: false })
  description: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false,
    transformer: {  // TypeOrm guarda el tipo 'decimal' como string, entonces asi lo convertimos a un float 
      to: (value: number) => value,
      from: (value: string) => parseFloat(value)
    }, 
  })
  price: number;

  @Column({ type: 'int', nullable: false })
  stock: number;

  @Column({ type: 'varchar', default: 'https://via.placeholder.com/150' })
  imgUrl: string;

  @ManyToOne(() => Category, (category) => category.products, { onDelete: 'CASCADE' })
  @JoinColumn()
  category: Category;


  @ManyToMany(() => OrderDetail, (orderDetail) => orderDetail.products)
  @JoinTable()
  orderDetails: OrderDetail[];
}
