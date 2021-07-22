const mongoose = require('mongoose')

const profileSchema = mongoose.Schema({
User: {
    type: String
},
    Laptop: {type: Number, default: 0},
    Sniper: {type: Number, default: 0},
    SpaceScript: {type: Number, default: 0},
    WekyMoon: {type: Number, default: 0},
    WekyRipOff: {type: Number, default: 0},
    PlasticHand: {type: Number, default: 0},
    LifeShield: {type: Number, default: 0},
    Phone: {type: Number, default: 0},
    GotchaBox: {type: Number, default: 0},
    Fox: {type: Number, default: 0},
    Eagle: {type: Number, default: 0},
    Tiger: {type: Number, default: 0},
    Bear: {type: Number, default: 0},
    Fish: {type: Number, default: 0},
    RareFish: {type: Number, default: 0},
    LegendaryFish: {type: Number, default: 0},
    Bread: {type: Number, default: 0},
    FaceButLie: {type: Number, default: 0},
    SilverMoon: {type: Number, default: 0},
    BunEffect: {type: Number, default: 0},
    EnergyDrink: {type: Number, default: 0},
    EnergyBolt: {type: Number, default: 0},
    Booster: {type: Number, default: 0},
    SunGlasses: {type: Number, default: 0},
    BoosterEffect: {type: Number, default: 0},
    SliceOfTomato: {type: Number, default: 0},
    CommonBox: {type: Number, default: 0},
    WekyArmor: {type: Number, default: 0},
})
module.exports = mongoose.model('inventories', profileSchema)