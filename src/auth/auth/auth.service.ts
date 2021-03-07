import { Injectable } from '@nestjs/common';
import { JwtService } from  '@nestjs/jwt';
import { UserService } from  '../user/user.service';
import { User } from  '../../models/user.model';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) { }

    private async validate(userData: User): Promise<User> {
        return await this.userService.findByEmail(userData.email);
    }

    public async login(user: User): Promise< any | { status: number }>{
        return this.validate(user).then((userData)=>{
            if(!userData){
                return { status: 404 };
            }

            let payload = `${userData.name}${userData.id}`;
            const accessToken = this.jwtService.sign(payload);

            delete userData.password;

            return {
                access_token: accessToken,
                expires_in: 3600,
                status: 200,
                user: userData,
            };
        });
    }

    public async register(user: User): Promise<any>{
        return this.userService.create(user)
    } 
}
