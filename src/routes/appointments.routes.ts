import { Router } from 'express';

import AppointmentsRepository from '../repositories/AppointmentsRepository';
import AppointmentsController from '../controllers/AppoitmentsController';

const appointmentsRepository = new AppointmentsRepository();

const appointmentsController = new AppointmentsController(
  appointmentsRepository,
);

const appointmentsRouter = Router();

appointmentsRouter.get('/', appointmentsController.List);
appointmentsRouter.post('/', appointmentsController.Create);

export default appointmentsRouter;
