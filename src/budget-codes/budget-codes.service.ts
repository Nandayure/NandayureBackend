import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBudgetCodeDto } from './dto/create-budget-code.dto';
import { UpdateBudgetCodeDto } from './dto/update-budget-code.dto';
import { BudgetCodeRepository } from './repository/BudgetCode.repository';

@Injectable()
export class BudgetCodesService {
  constructor(private readonly budgetCodeRepostory: BudgetCodeRepository) {}
  async create(createBudgetCodeDto: CreateBudgetCodeDto) {
    const newCode = this.budgetCodeRepostory.create(createBudgetCodeDto);

    return await this.budgetCodeRepostory.save(newCode);
  }

  async findAll() {
    return await this.budgetCodeRepostory.findAll();
  }

  async findOne(id: number) {
    return await this.budgetCodeRepostory.findOneById(id);
  }

  async update(id: number, updateBudgetCodeDto: UpdateBudgetCodeDto) {
    const codeToEdit = await this.budgetCodeRepostory.findOneById(id);

    if (!codeToEdit) {
      throw new NotFoundException('Registro no encontrado');
    }
    return await this.budgetCodeRepostory.save({
      ...codeToEdit,
      ...updateBudgetCodeDto,
    });
  }

  async remove(id: number) {
    const codeToRemove = await this.budgetCodeRepostory.findOneById(id);

    if (!codeToRemove) {
      throw new NotFoundException('Registro no encontrado');
    }
    return await this.budgetCodeRepostory.remove(codeToRemove);
  }
}
