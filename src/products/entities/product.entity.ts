import { Categorie } from 'src/categories/entities/cotegories.entity';
import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, ManyToOne, ManyToMany, JoinTable } from 'typeorm';


@Entity({ name: 'products' })
export class Products {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('decimal')
  price: number;

  @ManyToOne(() => Categorie, (categorie) => categorie.products)
  categorie: Categorie;
}
