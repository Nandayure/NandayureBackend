import { setSeederFactory } from 'typeorm-extension';
import { Gender } from '../entities/gender.entity';

export default setSeederFactory(Gender, (faker) => {
  const gender = new Gender();

  gender.Name = faker.person.gender();

  return gender;
});
