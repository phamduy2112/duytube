export class CreateAuthDto {}

export class RegisterAuthDto{
    readonly full_name:string;
    readonly user_name:string;
    readonly password:string;

}

export class LoginAuthDto{
    readonly user_name:string;
    readonly password:string;
}

