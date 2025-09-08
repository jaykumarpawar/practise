import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Section {
  @Prop({ required: true })
  type: string;

  @Prop({ type: Object }) // you can refine with stricter schema later
  content: Record<string, any>;
}

export const SectionSchema = SchemaFactory.createForClass(Section);

@Schema({ collection: 'resumes', timestamps: true })
export class Resume extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: false })
  userId: string;

  @Prop({ type: [SectionSchema], default: [] })
  sections: Section[];
}

export const ResumeSchema = SchemaFactory.createForClass(Resume);
