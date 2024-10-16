import { setSeederFactory } from 'typeorm-extension';
import { JobPosition } from '../entities/job-position.entity';
import { defaultJobPositionsData } from '../seed-data/default-data';

export default setSeederFactory(JobPosition, (faker) => {
  //const status = new JobPosition();

  // Selecciona un estado civil al azar de los por defecto
  const randomJobPosition = faker.helpers.arrayElement(defaultJobPositionsData);

  return randomJobPosition;
});
