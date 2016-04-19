var player = {
	'health':100,
	'food':100,
	'water':100,
	'day':0,
	'hour':12,
	'stocks': {},              // <item_id>:<quanity>
	'foodStores': {},          // <food_id>:<quanity>
	'waterStores': {},         // <water_id>:<quanity>
	'tools':{},                // <item_id>:<health>
	'craftableItems':[],       // <item_id>
	'discoveredRegions':[],    // <region_id>
	'discoveredMaterials':[],  // <mat_id>
	'multipliers':{}
}