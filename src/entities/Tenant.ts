
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from "typeorm";
import { Membership } from "./Membership";

export enum TenantStatus {
  PROVISIONING = "PROVISIONING",
  ACTIVE = "ACTIVE",
  FAILED = "FAILED",
}

@Entity({ name: "tenants", schema: "public" })

export class Tenant {

  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar", length: 150 })
  name!: string;

  @Column({ type: "varchar", length: 63, unique: true })
  schemaName!: string;

  @Column({
    type: "enum",
    enum: TenantStatus,
    default: TenantStatus.PROVISIONING,
  })
  status!: TenantStatus;

  @CreateDateColumn({ type: "timestamptz" })
  createdAt!: Date;

  @OneToMany(() => Membership, (membership) => membership.tenant)
  memberships!: Membership[];
  
}
