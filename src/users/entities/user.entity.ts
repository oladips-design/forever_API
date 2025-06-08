import { Roles } from 'src/utils/common/user-roles.enum';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, CreateDateColumn,Timestamp, UpdateDateColumn } from 'typeorm';

@Entity("users")
export class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column({unique: true, nullable: true})
    email: string;

    @Column({nullable: true, select: false})
    password_hash: string;

    @Column({type: 'enum', enum: Roles, default: Roles.GUEST})
    role: Roles;

    @CreateDateColumn()
    created_at: Timestamp;

    @UpdateDateColumn()
    updated_at: Timestamp;

}
