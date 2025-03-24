import { Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from 'src/common/entities/categories.entity';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  providers: [CategoriesService],
  controllers: [CategoriesController],
  exports: [CategoriesService], // Exportar para que se use en app.module
})
export class CategoriesModule {}
