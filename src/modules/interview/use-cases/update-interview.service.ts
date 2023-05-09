import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Interview } from '../entities/interview.entity';
import { Repository } from 'typeorm';
import { isBefore } from 'date-fns';
import { GetOnePerson } from 'src/modules/person/use-cases';

export type UpdateInterviewProps = {
  id: number;
  date?: Date;
  note?: string;
  meetingLink?: string;
  candidateId?: number;
};

@Injectable()
export class UpdateInterviewService {
  constructor(
    @InjectRepository(Interview)
    private interviewsRepository: Repository<Interview>,
    private readonly getOnePerson: GetOnePerson,
  ) {}

  public async run({
    date,
    id,
    note,
    meetingLink,
    candidateId,
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
          candidateId: interview.candidateId,
          date,
        },
      });

      if (existingInterview)
        throw new BadRequestException('Existing interview for candidate');

      Object.assign(interview, {
        ...interview,
        date: new Date(date),
      });
    }

    if (candidateId) {
      const candidate = await this.getOnePerson.run(candidateId);

      const [existingInterview] = await this.interviewsRepository.find({
        where: {
          candidateId,
          date: interview.date,
        },
      });

      if (existingInterview)
        throw new BadRequestException('Existing interview for candidate');

      Object.assign(interview, {
        ...interview,
        candidate,
        candidateId,
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

    delete interview.candidate;

    return {
      ...interview,
    };
  }
}
