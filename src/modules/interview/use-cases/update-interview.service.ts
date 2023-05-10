import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Interview } from '../entities/interview.entity';
import { Repository } from 'typeorm';
import { isBefore } from 'date-fns';
import { GetOneByIdCandidatureService } from 'src/modules/candidature/use-cases';

export type UpdateInterviewProps = {
  id: number;
  date?: Date;
  note?: string;
  meetingLink?: string;
  candidatureId?: number;
};

@Injectable()
export class UpdateInterviewService {
  constructor(
    @InjectRepository(Interview)
    private interviewsRepository: Repository<Interview>,
    private readonly getOneCandidature: GetOneByIdCandidatureService,
  ) {}

  public async run({
    date,
    id,
    note,
    meetingLink,
    candidatureId,
  }: UpdateInterviewProps) {
    const interview = await this.interviewsRepository.findOneBy({ id });

    if (!interview) {
      throw new NotFoundException();
    }

    if (date) {
      const today = new Date();
      today.setUTCHours(0, 0, 0, 0);

      const insertedDate = new Date(date);
      insertedDate.setUTCHours(0, 0, 0, 0);

      const isDateBeforeToday = isBefore(insertedDate, today);
      if (isDateBeforeToday)
        throw new BadRequestException('Cannot create interview for the past');

      const [existingInterview] = await this.interviewsRepository.find({
        where: {
          candidatureId: interview.candidatureId,
          date,
        },
      });

      if (existingInterview)
        throw new BadRequestException('Existing interview for candidature');

      Object.assign(interview, {
        ...interview,
        date: new Date(date),
      });
    }

    if (candidatureId) {
      const candidature = await this.getOneCandidature.run(candidatureId);

      const [existingInterview] = await this.interviewsRepository.find({
        where: {
          candidatureId,
          date: interview.date,
        },
      });

      if (existingInterview)
        throw new BadRequestException('Existing interview for candidature');

      Object.assign(interview, {
        ...interview,
        candidature,
        candidatureId,
      });
    }

    Object.assign(interview, {
      ...interview,
      note: note || note === null ? note : interview.note,
      meetingLink:
        meetingLink || meetingLink === null
          ? meetingLink
          : interview.meetingLink,
    });

    await this.interviewsRepository.save(interview);

    delete interview.candidature;

    return {
      ...interview,
    };
  }
}
