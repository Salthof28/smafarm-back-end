import { Test, TestingModule } from '@nestjs/testing';
import { LivestocksController } from './livestocks.controller';
import { LivestocksService } from './livestocks.service';

describe('LivestocksController', () => {
  let controller: LivestocksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LivestocksController],
      providers: [LivestocksService],
    }).compile();

    controller = module.get<LivestocksController>(LivestocksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
