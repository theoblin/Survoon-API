import { Injectable } from '@nestjs/common';
import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { UserService } from '../user.service';

export function IsPasswordValid(min:number|null,name:string,validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: any) {
          if (!value) {
            this.error = `No ${name} provided`;
            return false;
          }
          if (value.length < min && min != null) {
            this.error = `Password must ${min} characters minimum`;
            return false;
          }
       
          return true;
        },
        defaultMessage(): string {
          return this.error || 'Something went wrong';
        }
      },
    });
  };
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

@ValidatorConstraint({ name: 'isMatchingOldPassword', async: true })
    @Injectable()
    export class IsMatchingOldPasswordConstraint
      implements ValidatorConstraintInterface
    {
      constructor(protected readonly usersService: UserService) {}
    
      async validate(password: string, args: ValidationArguments) {
        console.log((await this.usersService.getOneUserByEmail(
          args.object["email"]
        )));
        return false
      }
    }
    
    export function IsMatchingOldPassword(email:string,validationOptions?: ValidationOptions) {
      return function (object: any, propertyName: string) {
        registerDecorator({
          target: object.constructor,
          propertyName: propertyName,
          options: validationOptions,
          constraints: [email],
          validator: IsMatchingOldPasswordConstraint,
        });
      }
    }