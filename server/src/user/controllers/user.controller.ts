import { Body, Controller, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from '../dto/user.dto';
import { UserService } from '../services/user.service';

@Controller('user')
export class UserController {
    constructor(
        private userService: UserService
    ){}

    @Post('create')
    create(@Body() createUserDto: CreateUserDto) {
        return this.userService.create(createUserDto)
    }

    @Post('register')
    register(@Body() createUserDto: CreateUserDto) {
        return this.userService.register(createUserDto)
    }

    @Patch('/confirm/:token')
    async confirmEmail(@Param('token') token: string) {
        await this.userService.confirmEmail(token);
    }

    @Patch('forgot-password')
    updateByEmail(@Body() updatePasswordDto: any) {
        return this.userService.updateByEmail(updatePasswordDto)
    }

    @Patch(':id')
    update(@Param() id: number, @Body() updateUserDto: UpdateUserDto) {
        return this.userService.update(id, updateUserDto)
    }


    @Get()
    getAll() {
        return this.userService.findAll()
    }

    @Get(':id')
    getOne(@Param('id') id: number) {
        return this.userService.findOne(id)
    }
}    