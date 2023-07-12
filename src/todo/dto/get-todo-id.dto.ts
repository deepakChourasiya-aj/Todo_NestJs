import { IsAlphanumeric } from 'class-validator';

export class IdDto {
  @IsAlphanumeric()
  id: string;
}
