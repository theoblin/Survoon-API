import { Injectable } from "@nestjs/common";
import { ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, registerDecorator } from "class-validator";
import { UserService } from "../user.service";

@ValidatorConstraint({ name: 'isEmailUnique', async: true })
    @Injectable()
    export class IsEmailUniqueConstraint
      implements ValidatorConstraintInterface
    {
      constructor(protected readonly usersService: UserService) {}
    
      async validate(email: string) {
        return !(await this.usersService.getOneUserByEmail(
          email,
        ));
      }
    }
    
    export function isEmailUnique(validationOptions?: ValidationOptions) {
      return function (object: any, propertyName: string) {
        registerDecorator({
          target: object.constructor,
          propertyName: propertyName,
          options: validationOptions,
          constraints: [],
          validator: IsEmailUniqueConstraint,
        });
      }
    }