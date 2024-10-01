import { Test, TestingModule } from '@nestjs/testing';
import { DataSource } from 'typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

export default async (): Promise<void> => {
  console.log('SETUP CALLED...');
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [
      ConfigModule.forRoot({
        envFilePath: '.env', // Path to your .env file
        isGlobal: true, // Make the configuration available globally
      }),
    ],
  }).compile();

  const app = moduleFixture.createNestApplication();
  await app.init();

  const configService = moduleFixture.get(ConfigService);
  console.log(
    'ENV VARS ->>>',
    configService.get('POSTGRES_HOST'),
    configService.get('PORT'),
  );
  const dataSource = new DataSource({
    type: 'postgres',
    host: configService.get('POSTGRES_HOST'),
    port: parseInt(configService.get('POSTGRES_PORT')),
    username: configService.get('POSTGRES_USERNAME'),
    password: configService.get('POSTGRES_PASSWORD'),
  });

  await dataSource.initialize();

  const queryRunner = dataSource.createQueryRunner();

  await queryRunner.connect();

  await queryRunner.createDatabase('grants-apply-test', true);

  console.log('DB CONNECTION ->>>');

  await queryRunner.release();

  await dataSource.destroy();

  console.log('SETUP FINISHED...');
};
