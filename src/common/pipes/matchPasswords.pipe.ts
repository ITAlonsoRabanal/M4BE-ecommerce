import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class MatchPasswordPipe implements PipeTransform {
    transform(value: any) {
        const { password, confirmPassword } = value;

        if (password !== confirmPassword) {
            throw new BadRequestException('Las contraseñas no coinciden');
        }

        return value;
  }
}
