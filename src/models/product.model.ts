import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity({name: 'products'})
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: 'name'})
    name: string;

    @Column({name: 'price'})
    price: number;

    @CreateDateColumn({type: 'timestamp'})
    created_at: Date;
}
