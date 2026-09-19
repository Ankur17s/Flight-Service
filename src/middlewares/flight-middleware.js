const { StatusCodes } = require('http-status-codes');

const { ErrorResponse } = require('../utils/common');
const AppError = require('../utils/errors/app-error');
const { DateTimeHelper } = require('../utils/helper')

function validateCreateRequest(req, res, next) {
    if (!req.body.flightNumber) {
        ErrorResponse.message = 'Something went wrong while Creating Flight'
        ErrorResponse.error = new AppError(['flightNumber not found in the incoming request'], StatusCodes.BAD_REQUEST)
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json(ErrorResponse)
    }
    if (!req.body.airplaneId) {
        ErrorResponse.message = 'Something went wrong while Creating Flight'
        ErrorResponse.error = new AppError(['airplaneId not found in the incoming request'], StatusCodes.BAD_REQUEST)
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json(ErrorResponse)
    }
    if (!req.body.departureAirportId) {
        ErrorResponse.message = 'Something went wrong while Creating Flight'
        ErrorResponse.error = new AppError(['departureAirportId not found in the incoming request'], StatusCodes.BAD_REQUEST)
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json(ErrorResponse)
    }
    if (!req.body.arrivalAirportId) {
        ErrorResponse.message = 'Something went wrong while Creating Flight'
        ErrorResponse.error = new AppError(['arrivalAirportId not found in the incoming request'], StatusCodes.BAD_REQUEST)
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json(ErrorResponse)
    }
    if (!req.body.arrivalTime) {
        ErrorResponse.message = 'Something went wrong while Creating Flight'
        ErrorResponse.error = new AppError(['arrivalTime not found in the incoming request'], StatusCodes.BAD_REQUEST)
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json(ErrorResponse)
    }
    if (!req.body.departureTime) {
        ErrorResponse.message = 'Something went wrong while Creating Flight'
        ErrorResponse.error = new AppError(['departureTime not found in the incoming request'], StatusCodes.BAD_REQUEST)
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json(ErrorResponse)
    }
    if (!DateTimeHelper.compareDateTime(req.body.arrivalTime, req.body.departureTime)) {
        ErrorResponse.message = 'Something went wrong while Creating Flight'
        ErrorResponse.error = new AppError(['Departure Time should be lesser than Arrival Time'], StatusCodes.BAD_REQUEST)
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json(ErrorResponse)
    }
    if (!req.body.price) {
        ErrorResponse.message = 'Something went wrong while Creating Flight'
        ErrorResponse.error = new AppError(['price not found in the incoming request'], StatusCodes.BAD_REQUEST)
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json(ErrorResponse)
    }
    if (!req.body.totalSeats) {
        ErrorResponse.message = 'Something went wrong while Creating Flight'
        ErrorResponse.error = new AppError(['totalSeats not found in the incoming request'], StatusCodes.BAD_REQUEST)
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json(ErrorResponse)
    }
    next();
}

function validateUpdateSeats(req, res, next) {
    if (!req.body.seats) {
        ErrorResponse.message = 'Something went wrong while updating Flight'
        ErrorResponse.error = new AppError(['Seats not found in the incoming request'], StatusCodes.BAD_REQUEST)
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json(ErrorResponse)
    }
    next();
}

module.exports = {
    validateCreateRequest,
    validateUpdateSeats
}