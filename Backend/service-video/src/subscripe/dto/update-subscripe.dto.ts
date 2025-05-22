import { PartialType } from '@nestjs/mapped-types';
import { CreateSubscripeDto } from './create-subscripe.dto';

export class UpdateSubscripeDto extends PartialType(CreateSubscripeDto) {}
