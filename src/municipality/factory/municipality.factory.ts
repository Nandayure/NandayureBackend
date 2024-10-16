import { setSeederFactory } from 'typeorm-extension';
import { Municipality } from 'src/municipality/entities/municipality.entity';

export default setSeederFactory(Municipality, (faker) => {
  const municipality = new Municipality();

  (municipality.name = faker.company.name()),
    (municipality.address = faker.location.direction()),
    (municipality.phoneNumber = String(faker.number)),
    (municipality.gmail = faker.internet.email({
      firstName: 'Municipalidad',
      lastName: 'Nandayure',
    }));

  return municipality;
});
