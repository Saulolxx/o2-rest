import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Interview } from '../entities/interview.entity';
import { Repository } from 'typeorm';
import { GetOnePerson } from 'src/modules/person/use-cases';
import { isBefore } from 'date-fns';

export type CreateInterviewProps = {
  date: Date;
  note?: string;
  meetingLink?: string;
  candidateId: number;
};

@Injectable()
export class CreateInterviewService {
  constructor(
    @InjectRepository(Interview)
    private interviewsRepository: Repository<Interview>,
    private readonly getOnePerson: GetOnePerson,
  ) {}

  public async run({
    date,
    note,
    meetingLink,
    candidateId,
  }: CreateInterviewProps) {
    const candidate = await this.getOnePerson.run(candidateId);

    const [existingInterview] = await this.interviewsRepository.find({
      where: {
        candidateId,
        date,
      },
    });

    if (existingInterview)
      throw new BadRequestException('Existing interview for candidate ');

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
      candidate,
      candidateId,
    });

    await this.interviewsRepository.save(interview);

    delete interview.candidate;

    return {
      ...interview,
    };
  }
}
