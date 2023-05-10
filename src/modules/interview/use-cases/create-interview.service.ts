import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Interview } from '../entities/interview.entity';
import { Repository } from 'typeorm';
import { isBefore } from 'date-fns';
import { GetOneByIdCandidatureService } from 'src/modules/candidature/use-cases';

export type CreateInterviewProps = {
  date: Date;
  note?: string;
  meetingLink?: string;
  candidatureId: number;
};

@Injectable()
export class CreateInterviewService {
  constructor(
    @InjectRepository(Interview)
    private interviewsRepository: Repository<Interview>,
    private readonly getOneCandidature: GetOneByIdCandidatureService,
  ) {}

  public async run({
    date,
    note,
    meetingLink,
    candidatureId,
  }: CreateInterviewProps) {
    const candidature = await this.getOneCandidature.run(candidatureId);

    const [existingInterview] = await this.interviewsRepository.find({
      where: {
        candidatureId,
        date,
      },
    });

    if (existingInterview)
      throw new BadRequestException('Existing interview for candidature ');

    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);

    const insertedDate = new Date(date);
    insertedDate.setUTCHours(0, 0, 0, 0);

    const isDateBeforeToday = isBefore(insertedDate, today);
    if (isDateBeforeToday)
      throw new BadRequestException('Cannot create interview for the past');

    const interview = new Interview();

    Object.assign(interview, {
      date: new Date(date),
      note: note || note === null ? note : null,
      meetingLink: meetingLink || meetingLink === null ? meetingLink : null,
      candidature,
      candidatureId,
    });

    await this.interviewsRepository.save(interview);

    delete interview.candidature;

    return {
      ...interview,
    };
  }
}
