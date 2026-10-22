
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  Unique,
} from "typeorm";
import { User } from "./User";
import { Tenant } from "./Tenant";

export enum MembershipRole {
  OWNER = "OWNER",
  ADMIN = "ADMIN",
  MEMBER = "MEMBER",
}

@Entity({ name: "memberships", schema: "public" })
@Unique("UQ_memberships_user_tenant", ["userId", "tenantId"])
export class Membership {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "uuid" })
  userId!: string;

  @Column({ type: "uuid" })
  tenantId!: string;

  @Column({
    type: "enum",
    enum: MembershipRole,
    default: MembershipRole.MEMBER,
  })
  role!: MembershipRole;

  @ManyToOne(() => User, (user) => user.memberships, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "userId" })
  user!: User;

  @ManyToOne(() => Tenant, (tenant) => tenant.memberships, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "tenantId" })
  tenant!: Tenant;
}
