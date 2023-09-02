import { Injectable } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

@Injectable()
export class CreateUser {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  balance: string;

  @ApiProperty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsString()
  password: string;

  @ApiProperty()
  @IsString()
  confirmPassword: string;
}

@Injectable()
export class EmailInput {
  @ApiProperty()
  @IsString()
  email: string;
}

export class ChangePassInput {
  @ApiProperty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  password: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  newPassword: string;
}

export class ChangeEmail {
  @ApiProperty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  newEmail: string;
}

export class TokenInput {
  @ApiProperty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsString()
  token: string;
}
