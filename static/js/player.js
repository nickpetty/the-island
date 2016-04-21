var player = {
	'stamina':100,
	'food':100,
	'water':100,
	'day':0,
	'hour':12,
	'min':0,
	'location':'',
	'inventory':{},
	'stocks': {'foo':1},              // <item_id>:<quanity>
	'foodStores': {},          // <food_id>:<quanity>
	'waterStores': {},         // <water_id>:<quanity>
	'tools':{},                // <item_id>:<health>
	'craftableItems':[],       // <item_id>
	'discoveredRegions':[],    // <region_id>
	'discoveredMaterials':[],  // <mat_id>
	'multipliers':{}
}