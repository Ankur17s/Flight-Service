const { StatusCodes } = require('http-status-codes');
const { Op } = require('sequelize')

const { FlightRepository } = require('../repositories');
const AppError = require('../utils/errors/app-error');

const flightRepository = new FlightRepository();

async function createFlight(data) {
    try {
        const flight = await flightRepository.create(data)
        return flight;
    } catch (error) {
        if (error.name === 'SequelizeValidationError') {
            let explanation = [];
            error.errors.forEach((err) => {
                explanation.push(err.message)
            })
            throw new AppError(explanation, StatusCodes.BAD_REQUEST)
        }
        throw new AppError('Cannot create a new Flight object', StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

async function getAllFlights(query) {
    const customFilters = {};
    let sortFilter = [];
    const endingTripTime = ' 23:59:00'
    // trips="MUM-DEL"
    if (query.trips) {
        let [departureAirportId, arrivalAirportId] = query.trips.split("-");
        customFilters.departureAirportId = departureAirportId;
        customFilters.arrivalAirportId = arrivalAirportId;
        // TODO: Add a check that they are not same
    }
    // price="1000-3000"
    if (query.price) {
        let [minPrice, maxPrice] = query.price.split('-')
        customFilters.price = {
            [Op.between]: [minPrice, (maxPrice || 20000)]
        }
    }
    // travellers=2
    if (query.travellers) {
        customFilters.totalSeats = {
            [Op.gte]: query.travellers
        }
    }
    if (query.tripDate) {
        customFilters.departureTime = {
            [Op.between]: [query.tripDate, query.tripDate + endingTripTime]
        }
    }
    // sort=price_ASC,departrueTime_DESC
    if (query.sort) {
        const params = query.sort.split(',');
        const sortFilters = params.map((param) => param.split('_'));
        sortFilter = sortFilters
    }

    try {
        const response = await flightRepository.getAllFlights(customFilters, sortFilter);
        return response;
    } catch (error) {
        throw new AppError('Cannot fetch all the flights', StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

async function getFlight(id) {
    try {
        const flight = await flightRepository.get(id);
        return flight;
    } catch (error) {
        if (error.statusCode == StatusCodes.NOT_FOUND) {
            throw new AppError('The Flight you requested is not Found', error.statusCode);
        }
        throw new AppError('Cannot fetch the Flight', StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

module.exports = {
    createFlight,
    getAllFlights,
    getFlight
}