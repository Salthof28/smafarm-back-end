import { Test, TestingModule } from '@nestjs/testing';
import { LivestocksService } from './livestocks.service';

describe('LivestocksService', () => {
  let service: LivestocksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LivestocksService],
    }).compile();

    service = module.get<LivestocksService>(LivestocksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
