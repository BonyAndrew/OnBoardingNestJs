import { Products } from 'src/products/entities/product.entity';
import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, ManyToOne, ManyToMany, JoinTable, OneToMany } from 'typeorm';

@Entity({ name: 'categories' })
export class Categorie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('decimal')
  price: number;

  @OneToMany(() => Products, (products) => products.categorie)
  products: Products;
}