const CRUDRepository = require('./crud-repository');
const { Airport, City } = require('../models')

class AirportRepository extends CRUDRepository {
    constructor() {
        super(Airport)
    }

    async getAllAirportsWithCities() {
        const response = await Airport.findAll({
            include: [
                {
                    model: City,
                    required: true,
                    as: 'cityDetails'
                }
            ]
        });
        return response;

    }
}

module.exports = AirportRepository