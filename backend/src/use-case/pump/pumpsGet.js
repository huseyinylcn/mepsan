const pumpsData = require("./../../../pumps.json")

async function pumpsGet(data) {
    try {
        return {data:pumpsData}
        
    } catch (error) {
        return {err:err}
        
    }
    
}

module.exports = pumpsGet