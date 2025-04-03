import { Controller } from '@nestjs/common';

@Controller('dogs')
export class DogsController {
    findAll(): string {
        return 'This action returns all dogs';
      }    
}
