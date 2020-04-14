import { startOfHour } from 'date-fns';

import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

interface Request {
  provider: string;
  date: Date;
}

class CreateAppointmenteService {
  private appointmentsRepository: AppointmentsRepository;

  constructor(appoitmentsRespository: AppointmentsRepository) {
    this.appointmentsRepository = appoitmentsRespository;
  }

  public execute({ provider, date }: Request): Appointment {
    const appoitmentDate = startOfHour(date);

    const findAppointmentInSameDate = this.appointmentsRepository.findByDate(
      appoitmentDate,
    );

    if (findAppointmentInSameDate)
      throw new Error('This appointment is already booked');

    const appointment = this.appointmentsRepository.create({
      provider,
      date: appoitmentDate,
    });

    return appointment;
  }
}

export default CreateAppointmenteService;
