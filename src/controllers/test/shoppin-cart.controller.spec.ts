import { Test, TestingModule } from '@nestjs/testing';
import { ShoppinCartController } from '../shopping-cart.controller';

describe('ShoppinCartController', () => {
  let controller: ShoppinCartController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShoppinCartController],
    }).compile();

    controller = module.get<ShoppinCartController>(ShoppinCartController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
