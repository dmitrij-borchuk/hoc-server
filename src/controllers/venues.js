import R from 'ramda';
import { VenueModel } from '../utils/db';

export const getAllVenues = R.bind(VenueModel.findAll, VenueModel);

export const getVenueById = R.bind(VenueModel.findById, VenueModel);

export const createVenue = data => VenueModel.create(data);
