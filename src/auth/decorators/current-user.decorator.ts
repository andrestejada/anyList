import { createParamDecorator, ExecutionContext ,ForbiddenException } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';
import { ValidRoles } from '../enums/valid-roles.enum';

export const CurrentUser = createParamDecorator(
  (roles: ValidRoles[]=[], context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);   
    const user:User = ctx.getContext().req.user;
    if(roles.length===0){
      return user
    }

    for (const role of roles) {
      if(user.roles.includes(role)){
        return user
      }
    }
    throw new ForbiddenException('you dont have the permision role')
  },
);