import { Request, Response } from 'express';
import { parseISO } from 'date-fns';

import CreateAppointmentService from '../services/CreateAppointmentService';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

class AppointmentsController {
  private repository: AppointmentsRepository;

  constructor(appointmentsRepository: AppointmentsRepository) {
    this.repository = appointmentsRepository;
  }

  public List = (request: Request, response: Response): Response => {
    const appointments = this.repository.all();

    return response.json(appointments);
  };

  public Create = (request: Request, response: Response): Response => {
    try {
      const { provider, date } = request.body;

      const parsedDate = parseISO(date);

      const createAppointment = new CreateAppointmentService(this.repository);

      const appointment = createAppointment.execute({
        provider,
        date: parsedDate,
      });

      return response.json(appointment);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  };
}

export default AppointmentsController;
