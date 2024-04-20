import { Injectable } from "@nestjs/common";
import { ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, registerDecorator } from "class-validator";
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

    export function IsMatching(property: string, validationOptions?: ValidationOptions) {
      return function (object: any, propertyName: string) {
        registerDecorator({
          name: 'matchesProperty',
          target: object.constructor,
          propertyName: propertyName,
          constraints: [property],
          options: validationOptions,
          validator: {
            validate(value: any, args: ValidationArguments) {
    
              const [relatedPropertyName] = args.constraints;
              const relatedValue = (args.object as any)[relatedPropertyName];
              return typeof value === 'string' && typeof relatedValue === 'string' && value === relatedValue;
            },
            defaultMessage(args: ValidationArguments) {
              const [relatedPropertyName] = args.constraints;
              return `${propertyName} must match ${relatedPropertyName}`;
            },
          },
        });
      };
    }
    