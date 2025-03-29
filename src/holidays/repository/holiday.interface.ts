import { BaseInterfaceRepository } from 'src/core/generic-repository/interface/base.interface';
import { Holiday } from '../entities/holiday.entity';

export interface HolidayRepositoryInterface extends BaseInterfaceRepository<Holiday> { }