import { IBaseModel } from "@common/lib";
import { BaseEntity, CreateDateColumn, Entity, UpdateDateColumn } from "typeorm";

@Entity()
export class BaseModel extends BaseEntity implements IBaseModel {
  @CreateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
    onUpdate: "CURRENT_TIMESTAMP(6)",
  })
  updatedAt: Date;
}
