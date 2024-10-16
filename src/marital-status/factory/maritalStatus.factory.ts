import { setSeederFactory } from 'typeorm-extension';
import { MaritalStatus } from '../entities/marital-status.entity';
import { defaultMaritalStatusData } from '../seed-data/default-data';

export default setSeederFactory(MaritalStatus, (faker) => {
  // const status = new MaritalStatus();

  // Selecciona un estado civil al azar
  const randomStatus = faker.helpers.arrayElement(defaultMaritalStatusData);

  // (status.Name = randomStatus.Name),
  //   (status.Description = randomStatus.Description);

  return randomStatus;
});
