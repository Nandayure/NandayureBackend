import { Faq } from 'src/faqs/entities/faq.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class FaqCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Faq, (faq) => faq.faqCategory)
  faqs: Faq[];
}
