const mapData = require('./json/maps.json');
const resourceData = require('./json/resources.json')

const MapsController = async (_req, res) => {
    try {
        res.status(200).send(mapData);
    } catch (error) {
        console.error(error);
        res.sendStatus(401);
    }
};


const ResourceController = async (_req, res) => {
    try {
        res.status(200).send(resourceData);
    } catch (error) {
        console.error(error);
        res.sendStatus(401);
    }
}

module.exports = {MapsController, ResourceController}