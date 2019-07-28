var WeatherFinder = {

getWeather(timeMillis, zone) {
    return this.weatherChances[zone](this.calculateForecastTarget(timeMillis));
},

calculateForecastTarget: function(timeMillis) { 
    // Thanks to Rogueadyn's SaintCoinach library for this calculation.
    // lDate is the current local time.

    var unixSeconds = parseInt(timeMillis / 1000);
    // Get Eorzea hour for weather start
    var bell = unixSeconds / 175;

    // Do the magic 'cause for calculations 16:00 is 0, 00:00 is 8 and 08:00 is 16
    var increment = (bell + 8 - (bell % 8)) % 24;

    // Take Eorzea days since unix epoch
    var totalDays = unixSeconds / 4200;
    totalDays = (totalDays << 32) >>> 0; // Convert to uint

    // 0x64 = 100
    var calcBase = totalDays * 100 + increment;

    // 0xB = 11
    var step1 = ((calcBase << 11) ^ calcBase) >>> 0;
    var step2 = ((step1 >>> 8) ^ step1) >>> 0;

    // 0x64 = 100
    return step2 % 100;
},

getEorzeaHour: function(timeMillis) {
    var unixSeconds = parseInt(timeMillis / 1000);
    // Get Eorzea hour
    var bell = (unixSeconds / 175) % 24;
    return Math.floor(bell);
},

getWeatherTimeFloor: function(date) {
    var unixSeconds = parseInt(date.getTime() / 1000);
    // Get Eorzea hour for weather start
    var bell = (unixSeconds / 175) % 24;
    var startBell = bell - (bell % 8);
    var startUnixSeconds = unixSeconds - (175 * (bell - startBell));
    return new Date(startUnixSeconds * 1000);
},

weatherChances: {
"Limsa Lominsa": function(chance) { if (chance < 20) { return "Clouds"; } else if (chance < 50) { return "Clear Skies"; } else if (chance < 80) { return "Fair Skies"; } else if (chance < 90) { return "Fog"; } else { return "Rain"; } },
"Middle La Noscea": function(chance) { if (chance < 20) { return "Clouds"; } else if (chance < 50) { return "Clear Skies"; } else if (chance < 70) { return "Fair Skies"; } else if (chance < 80) { return "Wind"; } else if (chance < 90) { return "Fog"; } else { return "Rain"; } },
"Lower La Noscea": function(chance) { if (chance < 20) { return "Clouds"; } else if (chance < 50) { return "Clear Skies"; } else if (chance < 70) { return "Fair Skies"; } else if (chance < 80) { return "Wind"; } else if (chance < 90) { return "Fog"; } else { return "Rain"; } },
"Eastern La Noscea": function(chance) { if (chance < 5) { return "Fog"; } else if (chance < 50) { return "Clear Skies"; } else if (chance < 80) { return "Fair Skies"; } else if (chance < 90) { return "Clouds"; } else if (chance < 95) { return "Rain"; } else { return "Showers"; } },
"Western La Noscea": function(chance) { if (chance < 10) { return "Fog"; } else if (chance < 40) { return "Clear Skies"; } else if (chance < 60) { return "Fair Skies"; } else if (chance < 80) { return "Clouds"; } else if (chance < 90) { return "Wind"; } else { return "Gales"; } },
"Upper La Noscea": function(chance) { if (chance < 30) { return "Clear Skies"; } else if (chance < 50) { return "Fair Skies"; } else if (chance < 70) { return "Clouds"; } else if (chance < 80) { return "Fog"; } else if (chance < 90) { return "Thunder"; } else { return "Thunderstorms"; } },
"Outer La Noscea": function(chance) { if (chance < 30) { return "Clear Skies"; } else if (chance < 50) { return "Fair Skies"; } else if (chance < 70) { return "Clouds"; } else if (chance < 85) { return "Fog"; } else { return "Rain"; } },
"Mist": function(chance) { if (chance < 20) { return "Clouds"; } else if (chance < 50) { return "Clear Skies"; } else if (chance < 70) { return "Fair Skies"; } else if (chance < 80) { return "Fair Skies"; } else if (chance < 90) { return "Fog"; } else { return "Rain"; } },
"Gridania": function(chance) { if (chance < 5) { return "Rain"; } else if (chance < 20) { return "Rain"; } else if (chance < 30) { return "Fog"; } else if (chance < 40) { return "Clouds"; } else if (chance < 55) { return "Fair Skies"; } else if (chance < 85) { return "Clear Skies"; } else { return "Fair Skies"; } },
"Central Shroud": function(chance) { if (chance < 5) { return "Thunder"; } else if (chance < 20) { return "Rain"; } else if (chance < 30) { return "Fog"; } else if (chance < 40) { return "Clouds"; } else if (chance < 55) { return "Fair Skies"; } else if (chance < 85) { return "Clear Skies"; } else { return "Fair Skies"; } },
"East Shroud": function(chance) { if (chance < 5) { return "Thunder"; } else if (chance < 20) { return "Rain"; } else if (chance < 30) { return "Fog"; } else if (chance < 40) { return "Clouds"; } else if (chance < 55) { return "Fair Skies"; } else if (chance < 85) { return "Clear Skies"; } else { return "Fair Skies"; } },
"South Shroud": function(chance) { if (chance < 5) { return "Fog"; } else if (chance < 10) { return "Thunderstorms"; } else if (chance < 25) { return "Thunder"; } else if (chance < 30) { return "Fog"; } else if (chance < 40) { return "Clouds"; } else if (chance < 70) { return "Fair Skies"; } else { return "Clear Skies"; } },
"North Shroud": function(chance) { if (chance < 5) { return "Fog"; } else if (chance < 10) { return "Showers"; } else if (chance < 25) { return "Rain"; } else if (chance < 30) { return "Fog"; } else if (chance < 40) { return "Clouds"; } else if (chance < 70) { return "Fair Skies"; } else { return "Clear Skies"; } },
"The Lavender Beds": function(chance) { if (chance < 5) { return "Clouds"; } else if (chance < 20) { return "Rain"; } else if (chance < 30) { return "Fog"; } else if (chance < 40) { return "Clouds"; } else if (chance < 55) { return "Fair Skies"; } else if (chance < 85) { return "Clear Skies"; } else { return "Fair Skies"; } },
"Ul'dah": function(chance) { if (chance < 40) { return "Clear Skies"; } else if (chance < 60) { return "Fair Skies"; } else if (chance < 85) { return "Clouds"; } else if (chance < 95) { return "Fog"; } else { return "Rain"; } },
"Western Thanalan": function(chance) { if (chance < 40) { return "Clear Skies"; } else if (chance < 60) { return "Fair Skies"; } else if (chance < 85) { return "Clouds"; } else if (chance < 95) { return "Fog"; } else { return "Rain"; } },
"Central Thanalan": function(chance) { if (chance < 15) { return "Dust Storms"; } else if (chance < 55) { return "Clear Skies"; } else if (chance < 75) { return "Fair Skies"; } else if (chance < 85) { return "Clouds"; } else if (chance < 95) { return "Fog"; } else { return "Rain"; } },
"Eastern Thanalan": function(chance) { if (chance < 40) { return "Clear Skies"; } else if (chance < 60) { return "Fair Skies"; } else if (chance < 70) { return "Clouds"; } else if (chance < 80) { return "Fog"; } else if (chance < 85) { return "Rain"; } else { return "Showers"; } },
"Southern Thanalan": function(chance) { if (chance < 20) { return "Heat Waves"; } else if (chance < 60) { return "Clear Skies"; } else if (chance < 80) { return "Fair Skies"; } else if (chance < 90) { return "Clouds"; } else { return "Fog"; } },
"Northern Thanalan": function(chance) { if (chance < 5) { return "Clear Skies"; } else if (chance < 20) { return "Fair Skies"; } else if (chance < 50) { return "Clouds"; } else { return "Fog"; } },
"The Goblet": function(chance) { if (chance < 40) { return "Clear Skies"; } else if (chance < 60) { return "Fair Skies"; } else if (chance < 85) { return "Clouds"; } else if (chance < 95) { return "Fog"; } else { return "Rain"; } },
"Mor Dhona": function(chance) {if (chance < 15) {return "Clouds";}  else if (chance < 30) {return "Fog";}  else if (chance < 60) {return "Gloom";}  else if (chance < 75) {return "Clear Skies";}  else {return "Fair Skies";}},
"Ishgard": function(chance) {if (chance < 60) {return "Snow";}  else if (chance < 70) {return "Fair Skies";}  else if (chance < 75) {return "Clear Skies";}  else if (chance < 90) {return "Clouds";}  else {return "Fog";}},
"Coerthas Central Highlands": function(chance) {if (chance < 20) {return "Blizzards";}  else if (chance < 60) {return "Snow";}  else if (chance < 70) {return "Fair Skies";}  else if (chance < 75) {return "Clear Skies";}  else if (chance < 90) {return "Clouds";}  else {return "Fog";}},
"Coerthas Western Highlands": function(chance) {if (chance < 20) {return "Blizzards";}  else if (chance < 60) {return "Snow";}  else if (chance < 70) {return "Fair Skies";}  else if (chance < 75) {return "Clear Skies";}  else if (chance < 90) {return "Clouds";}  else {return "Fog";}},
"The Sea of Clouds": function(chance) {if (chance < 30) {return "Clear Skies";}  else if (chance < 60) {return "Fair Skies";}  else if (chance < 70) {return "Clouds";}  else if (chance < 80) {return "Fog";}  else if (chance < 90) {return "Wind";}  else {return "Umbral Wind";}},
"Azys Lla": function(chance) {if (chance < 35) {return "Fair Skies";}  else if (chance < 70) {return "Clouds";}  else {return "Thunder";}},
"The Dravanian Forelands": function(chance) {if (chance < 10) {return "Clouds";}  else if (chance < 20) {return "Fog";}  else if (chance < 30) {return "Thunder";}  else if (chance < 40) {return "Dust Storms";}  else if (chance < 70) {return "Clear Skies";}  else {return "Fair Skies";}},
"The Dravanian Hinterlands": function(chance) {if (chance < 10) {return "Clouds";}  else if (chance < 20) {return "Fog";}  else if (chance < 30) {return "Rain";}  else if (chance < 40) {return "Showers";}  else if (chance < 70) {return "Clear Skies";}  else {return "Fair Skies";}},
"The Churning Mists": function(chance) {if (chance < 10) {return "Clouds";}  else if (chance < 20) {return "Gales";}  else if (chance < 40) {return "Umbral Static";}  else if (chance < 70) {return "Clear Skies";}  else {return "Fair Skies";}},
"Idyllshire": function(chance) {if (chance < 10) {return "Clouds";}  else if (chance < 20) {return "Fog";}  else if (chance < 30) {return "Rain";}  else if (chance < 40) {return "Showers";}  else if (chance < 70) {return "Clear Skies";}  else {return "Fair Skies";}},
// Data format changed from aggregate to marginal breakpoints
"Rhalgr's Reach": function(chance) { if ((chance -= 15) < 0) { return "Clear Skies"; } else if ((chance -= 45) < 0) { return "Fair Skies"; } else if ((chance -= 20) < 0) { return "Clouds"; } else if ((chance -= 10) < 0) { return "Fog"; } else { return "Thunder"; } },
"The Fringes": function(chance) { if ((chance -= 15) < 0) { return "Clear Skies"; } else if ((chance -= 45) < 0) { return "Fair Skies"; } else if ((chance -= 20) < 0) { return "Clouds"; } else if ((chance -= 10) < 0) { return "Fog"; } else { return "Thunder"; } },
"The Peaks": function(chance) { if ((chance -= 10) < 0) { return "Clear Skies"; } else if ((chance -= 50) < 0) { return "Fair Skies"; } else if ((chance -= 15) < 0) { return "Clouds"; } else if ((chance -= 10) < 0) { return "Fog"; } else if ((chance -= 10) < 0) { return "Wind"; } else { return "Dust Storms"; } },
"The Lochs": function(chance) { if ((chance -= 20) < 0) { return "Clear Skies"; } else if ((chance -= 40) < 0) { return "Fair Skies"; } else if ((chance -= 20) < 0) { return "Clouds"; } else if ((chance -= 10) < 0) { return "Fog"; } else { return "Thunderstorms"; } },
"Kugane": function(chance) { if ((chance -= 10) < 0) { return "Rain"; } else if ((chance -= 10) < 0) { return "Fog"; } else if ((chance -= 20) < 0) { return "Clouds"; } else if ((chance -= 40) < 0) { return "Fair Skies"; } else { return "Clear Skies"; } },
"The Ruby Sea": function(chance) { if ((chance -= 10) < 0) { return "Thunder"; } else if ((chance -= 10) < 0) { return "Wind"; } else if ((chance -= 15) < 0) { return "Clouds"; } else if ((chance -= 40) < 0) { return "Fair Skies"; } else { return "Clear Skies"; } },
"Yanxia": function(chance) { if ((chance -= 5) < 0) { return "Showers"; } else if ((chance -= 10) < 0) { return "Rain"; } else if ((chance -= 10) < 0) { return "Fog"; } else if ((chance -= 15) < 0) { return "Clouds"; } else if ((chance -= 40) < 0) { return "Fair Skies"; } else { return "Clear Skies"; } },
"The Azim Steppe": function(chance) { if ((chance -= 5) < 0) { return "Gales"; } else if ((chance -= 5) < 0) { return "Wind"; } else if ((chance -= 7) < 0) { return "Rain"; } else if ((chance -= 8) < 0) { return "Fog"; } else if ((chance -= 10) < 0) { return "Clouds"; } else if ((chance -= 40) < 0) { return "Fair Skies"; } else { return "Clear Skies"; } },
"Eureka Anemos": function(chance) { if ((chance -= 30) < 0) { return "Fair Skies"; } else if ((chance -= 30) < 0) { return "Gales"; } else if ((chance -= 30) < 0) { return "Showers"; } else { return "Snow"; } },
"Eureka Pagos": function(chance) { if ((chance -= 10) < 0) { return "Clear Skies"; } else if ((chance -= 18) < 0) { return "Fog"; } else if ((chance -= 18) < 0) { return "Heat Waves"; } else if ((chance -= 18) < 0) { return "Snow"; } else if ((chance -= 18) < 0) { return "Thunder"; } else { return "Brizzards"; } },
"Eureka Pyros": function(chance) { if ((chance -= 10) < 0) { return "Fair Skies"; } else if ((chance -= 18) < 0) { return "Heat Waves"; } else if ((chance -= 18) < 0) { return "Thunder"; } else if ((chance -= 18) < 0) { return "Blizzards"; } else if ((chance -= 18) < 0) { return "Umbral Wind"; } else { return "Snow"; } },
"Eureka Hydatos": function(chance) { if ((chance -= 12) < 0) { return "Fair Skies"; } else if ((chance -= 22) < 0) { return "Showers"; } else if ((chance -= 22) < 0) { return "Gloom"; } else if ((chance -= 22) < 0) { return "Thunderstorms"; } else { return "Snow"; } },
"The Crystarium": function(chance) { if ((chance -= 20) < 0) { return "Clear Skies"; } else if ((chance -= 40) < 0) { return "Fair Skies"; } else if ((chance -= 15) < 0) { return "Clouds"; } else if ((chance -= 10) < 0) { return "Fog"; } else if ((chance -= 10) < 0) { return "Rain"; } else { return "Thunderstorms"; } },
"Eulmore": function(chance) { if ((chance -= 10) < 0) { return "Gales"; } else if ((chance -= 10) < 0) { return "Rain"; } else if ((chance -= 10) < 0) { return "Fog"; } else if ((chance -= 15) < 0) { return "Clouds"; } else if ((chance -= 40) < 0) { return "Fair Skies"; } else { return "Clear Skies"; } },
"Lakeland": function(chance) { if ((chance -= 20) < 0) { return "Clear Skies"; } else if ((chance -= 40) < 0) { return "Fair Skies"; } else if ((chance -= 15) < 0) { return "Clouds"; } else if ((chance -= 10) < 0) { return "Fog"; } else if ((chance -= 10) < 0) { return "Rain"; } else { return "Thunderstorms"; } },
"Kholusia": function(chance) { if ((chance -= 10) < 0) { return "Gales"; } else if ((chance -= 10) < 0) { return "Rain"; } else if ((chance -= 10) < 0) { return "Fog"; } else if ((chance -= 15) < 0) { return "Clouds"; } else if ((chance -= 40) < 0) { return "Fair Skies"; } else { return "Clear Skies"; } },
"Amh Araeng": function(chance) { if ((chance -= 45) < 0) { return "Fair Skies"; } else if ((chance -= 15) < 0) { return "Clouds"; } else if ((chance -= 10) < 0) { return "Dust Storms"; } else if ((chance -= 10) < 0) { return "Heat Waves"; } else { return "Clear Skies"; } },
"Il Mheg": function(chance) { if ((chance -= 10) < 0) { return "Rain"; } else if ((chance -= 10) < 0) { return "Fog"; } else if ((chance -= 15) < 0) { return "Clouds"; } else if ((chance -= 10) < 0) { return "Thunderstorms"; } else if ((chance -= 15) < 0) { return "Clear Skies"; } else { return "Fair Skies"; } },
"The Rak'tika Greatwood": function(chance) { if ((chance -= 10) < 0) { return "Fog"; } else if ((chance -= 10) < 0) { return "Rain"; } else if ((chance -= 10) < 0) { return "Umbral Wind"; } else if ((chance -= 15) < 0) { return "Clear Skies"; } else if ((chance -= 40) < 0) { return "Fair Skies"; } else { return "Clouds"; } },
"The Tempest": function(chance) { if ((chance -= 20) < 0) { return "Clouds"; } else if ((chance -= 60) < 0) { return "Fair Skies"; } else { return "Clear Skies"; } },
},

weatherLists: {
"Limsa Lominsa": ["Clouds","Clear Skies","Fair Skies","Fog","Rain"],
"Middle La Noscea": ["Clouds","Clear Skies","Fair Skies","Wind","Fog","Rain"],
"Lower La Noscea": ["Clouds","Clear Skies","Fair Skies","Wind","Fog","Rain"],
"Eastern La Noscea": ["Fog","Clear Skies","Fair Skies","Clouds","Rain","Showers"],
"Western La Noscea": ["Fog","Clear Skies","Fair Skies","Clouds","Wind","Gales"],
"Upper La Noscea": ["Clear Skies","Fair Skies","Clouds","Fog","Thunder","Thunderstorms"],
"Outer La Noscea": ["Clear Skies","Fair Skies","Clouds","Fog","Rain" ],
"Mist": ["Clouds","Clear Skies","Fair Skies","Fog","Rain" ],
"Gridania": ["Rain","Fog","Clouds","Fair Skies","Clear Skies"],
"Central Shroud": ["Thunder","Rain","Fog","Clouds","Fair Skies","Clear Skies"],
"East Shroud": ["Thunder","Rain","Fog","Clouds","Fair Skies","Clear Skies"],
"South Shroud": ["Fog","Thunderstorms","Thunder","Clouds","Fair Skies","Clear Skies"],
"North Shroud": ["Fog","Showers","Rain","Clouds","Fair Skies","Clear Skies"],
"The Lavender Beds": ["Clouds","Rain","Fog","Fair Skies","Clear Skies"],
"Ul'dah": ["Clear Skies","Fair Skies","Clouds","Fog","Rain"],
"Western Thanalan": ["Clear Skies","Fair Skies","Clouds","Fog","Rain"],
"Central Thanalan": ["Dust Storms","Clear Skies","Fair Skies","Clouds","Fog","Rain"],
"Eastern Thanalan": ["Clear Skies","Fair Skies","Clouds","Fog","Rain","Showers"],
"Southern Thanalan": ["Heat Waves","Clear Skies","Fair Skies","Clouds","Fog"],
"Northern Thanalan": ["Clear Skies","Fair Skies","Clouds","Fog"],
"The Goblet": ["Clear Skies","Fair Skies","Clouds","Fog","Rain"],
"Mor Dhona": ["Clouds", "Fog", "Gloom", "Clear Skies", "Fair Skies"],
"Ishgard": ["Snow", "Fair Skies", "Clear Skies", "Clouds", "Fog"],
"Coerthas Central Highlands": ["Blizzards", "Snow", "Fair Skies", "Clear Skies", "Clouds", "Fog"],
"Coerthas Western Highlands": ["Blizzards", "Snow", "Fair Skies", "Clear Skies", "Clouds", "Fog"],
"The Sea of Clouds": ["Clear Skies", "Fair Skies", "Clouds", "Fog", "Wind", "Umbral Wind"],
"Azys Lla": ["Fair Skies", "Clouds", "Thunder"],
"The Dravanian Forelands": ["Clouds", "Fog", "Thunder", "Dust Storms", "Clear Skies", "Fair Skies"],
"The Dravanian Hinterlands": ["Clouds", "Fog", "Rain", "Showers", "Clear Skies", "Fair Skies"],
"The Churning Mists": ["Clouds", "Gales", "Umbral Static", "Clear Skies", "Fair Skies"],
"Idyllshire": ["Clouds", "Fog", "Rain", "Showers", "Clear Skies", "Fair Skies"],
"Rhalgr's Reach": ["Clear Skies","Fair Skies","Clouds","Fog","Thunder"],
"The Fringes": ["Clear Skies","Fair Skies","Clouds","Fog","Thunder"],
"The Peaks": ["Clear Skies","Fair Skies","Clouds","Fog","Wind","Dust Storms"],
"The Lochs": ["Clear Skies","Fair Skies","Clouds","Fog","Thunderstorms"],
"Kugane": ["Rain","Fog","Clouds","Fair Skies","Clear Skies"],
"The Ruby Sea": ["Thunder","Wind","Clouds","Fair Skies","Clear Skies"],
"Yanxia": ["Showers","Rain","Fog","Clouds","Fair Skies","Clear Skies"],
"The Azim Steppe": ["Gales","Wind","Rain","Fog","Clouds","Fair Skies","Clear Skies"],
"Eureka Anemos": ["Fair Skies", "Gales", "Showers", "Snow"],
"Eureka Pagos": ["Clear Skies", "Fog", "Heat Waves", "Snow", "Thunder", "Brizzards"],
"Eureka Pyros": ["Fair Skies", "Heat Waves", "Thunder", "Blizzards", "Umbral Wind", "Snow"],
"Eureka Hydatos": ["Fair Skies", "Showers", "Gloom", "Thunderstorms", "Snow"],
"The Crystarium": ["Clear Skies", "Fair Skies", "Clouds", "Fog", "Rain", "Thunderstorms"],
"Eulmore": ["Gales", "Rain", "Fog", "Clouds", "Fair Skies", "Clear Skies"],
"Lakeland": ["Clear Skies", "Fair Skies", "Clouds", "Fog", "Rain", "Thunderstorms"],
"Kholusia": ["Gales", "Rain", "Fog", "Clouds", "Fair Skies", "Clear Skies"],
"Amh Araeng": ["Fair Skies", "Clouds", "Dust Storms", "Heat Waves", "Clear Skies"],
"Il Mheg": ["Rain", "Fog", "Clouds", "Thunderstorms", "Clear Skies", "Fair Skies"],
"The Rak'tika Greatwood": ["Fog", "Rain", "Umbral Wind", "Clear Skies", "Fair Skies", "Clouds"],
"The Tempest": ["Clouds", "Fair Skies", "Clear Skies"]
}
};
    