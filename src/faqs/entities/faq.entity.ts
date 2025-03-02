import { FaqCategory } from 'src/faq-categories/entities/faq-category.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Faq {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  question: string;

  @Column()
  answer: string;

  @Column()
  status: string;

  @Column()
  created_at: Date;

  @Column({ nullable: true })
  updated_at: Date;

  @Column()
  faqCategoryId: number;

  @ManyToOne(() => FaqCategory, (faqCategory) => faqCategory.faqs)
  @JoinColumn({ name: 'faqCategoryId' })
  faqCategory: FaqCategory;
}
