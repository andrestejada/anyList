import { AuthGuard } from "@nestjs/passport";
import { Injectable } from '@nestjs/common';
import { GqlExecutionContext } from "@nestjs/graphql";

@Injectable()
export class JwtGuard extends AuthGuard('jwt') {
    getRequest(context: GqlExecutionContext) {
        const ctx = GqlExecutionContext.create(context);
        return ctx.getContext().req;
      }
}