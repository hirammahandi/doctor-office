import { ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { JsonWebTokenError } from "jsonwebtoken";
import { Doctor } from "../../doctor/entities";

export class JwtGuard extends AuthGuard("jwt") {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  handleRequest<TUser extends Doctor>(
    err: unknown,
    user: TUser,
    info: unknown
  ) {
    if (info instanceof JsonWebTokenError) {
      throw new UnauthorizedException(info.message);
    }
    if (err || !user) {
      const message = "Invalid Token";
      throw new UnauthorizedException(message);
    }

    return user;
  }
}
