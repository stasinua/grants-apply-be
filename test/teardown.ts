import { Test, TestingModule } from '@nestjs/testing';
import { DataSource } from 'typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

export default async (): Promise<void> => {
  console.log('TEARDOWN IN PROCESS...');

  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [
      ConfigModule.forRoot({
        envFilePath: '.env', // Path to your .env file
        isGlobal: true, // Make the configuration available globally
      }),
    ],
  }).compile();

  const configService = moduleFixture.get(ConfigService);

  const dataSource = new DataSource({
    type: 'postgres',
    host: configService.get('POSTGRES_HOST'),
    port: parseInt(configService.get('POSTGRES_PORT')),
    username: configService.get('POSTGRES_USERNAME'),
    password: configService.get('POSTGRES_PASSWORD'),
  });

  await dataSource.initialize();

  const app = moduleFixture.createNestApplication();
  await app.init();

  const queryRunner = dataSource.createQueryRunner();

  await queryRunner.dropDatabase('grants-apply-test');

  await dataSource.destroy();

  console.log('TEARDOWN FINISHED...');
};
