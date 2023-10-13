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

// @note dynamic guard
/*
import { CanActivate, ExecutionContext, mixin } from '@nestjs/common'
import { IRequestPayload } from '../types/request'

type AllowedPaths = `/${string}/${string}`

export const AdminGuard = (allowedPaths?: AllowedPaths[]) => {
  class AdminGuardMixin implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
      const request = context.switchToHttp().getRequest<IRequestPayload>()
      const requestPath = request.path as AllowedPaths

      if (allowedPaths?.includes(requestPath)) return true

      return request.isAdmin
    }
  }

  const guard = mixin(AdminGuardMixin)
  return guard
}

*/
