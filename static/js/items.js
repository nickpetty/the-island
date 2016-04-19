var tools = {
	'Stone Hatchet':{
		'item_id':1,
		'requires':{'stone':1, 'wood':1},
		'description':'A weak stone hatchet.',
		'name':'Stone Hatchet',
		'wearPerUse':-3,
		'time':1,
		'foodUse':3, //multiplier
		'waterUse':2, //multiplier
		'multipliers':{'wood':3, 'stone':2}
	},

	'Stone Pickaxe':{
		'item_id':2,
		'requires':{'stone':1, 'wood':1},
		'description':'A weak Stone Pickaxe.',
		'name':'Stone Pickaxe',
		'wearPerUse':-3,
		'time':1,
		'foodUse':3, //multiplier
		'waterUse':2, //multiplier
		'multipliers':{'wood':2, 'stone':5}
	},

	'Bucket':{
		'item_id':3,
		'requires':{'wood':10},
		'description':'Gather much more water',
		'name':'Wooden Bucket',
		'wearPerUse':-1,
		'time':1,
		'foodUse':3,
		'waterUse':2,
		'multipliers':{'water':5}
	},

	'Rope':{
		'item_id':4,
		'requires':{'wood':10},
		'description':'A rope for climbing',
		'name':'Rope',
		'wearPerUse':-1,
		'time':3,
		'foodUse':5,
		'waterUse':5,
		'multipliers':{}
	}
}

var objects = {
	'woodFire':{
		'requires':{'wood':5, 'flint':1},
		'description':'Wood camp fire.',
		'name':'Camp Fire'
	}
}


var materials = {
	'wood':{'mat_id':1, 'difficulty':1, 'chance':70, 'tool':''}, // tools = list of required tool item_id's
	'bone':{'mat_id':2, 'difficulty':1, 'chance':10, 'tool':''},
	'iron':{'mat_id':3, 'difficulty':3, 'chance':20, 'tool':'Stone Pickaxe'},
	'stone':{'mat_id':4, 'difficulty:':2, 'chance':50, 'tool':''},
	'gold':{'mat_id':5, 'difficulty':3, 'chance':10, 'tool':'Stone Pickaxe'}
}