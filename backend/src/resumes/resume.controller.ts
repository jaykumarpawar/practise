import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ResumeService } from './resume.service';

@Controller('resumes')
export class ResumeController {
  constructor(private readonly resumeService: ResumeService) { }

  @Post()
  async createResume(@Body() body: any) {
    const { userId = null, title, sections } = body;
    return this.resumeService.createResume(userId, title, sections);
  }

  @Get(':id')
  async getResume(@Param('id') id: string) {
    console.log({ id, message: 'sdjbfjksbdfks jdfkskdfjksdfsd' });
    console.log({ id, message: 'sdjbfjksbdfks jdfkskdfjksdfsd' });
    console.log({ id, message: 'sdjbfjksbdfks jdfkskdfjksdfsd' });
    console.log({ id, message: 'sdjbfjksbdfks jdfkskdfjksdfsd' });
    console.log({ id, message: 'sdjbfjksbdfks jdfkskdfjksdfsd' });
    return 0;
    return this.resumeService.getResume(id);
  }

  @Get('user/:userId')
  async listResumes(@Param('userId') userId: string) {
    console.log('sdfsdf');
    return this.resumeService.listResumes(userId);
  }
}
