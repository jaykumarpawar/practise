import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Resume } from './resume.schema';

@Injectable()
export class ResumeService {
  constructor(@InjectModel(Resume.name) private resumeModel: Model<Resume>) { }

  async createResume(userId: string | null, title: string, sections: any[]) {
    const resume = new this.resumeModel({
      title,
      userId,
      sections,
    });
    return resume.save();
  }

  async getResume(id: string) {
    return this.resumeModel.findById(id).exec();
  }

  async listResumes(userId: string) {
    console.log('11111111111111');
    // return this.resumeModel.find({ userId }).exec();
    return this.resumeModel.find().exec();
  }
}
