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
		'multiplier':{'wood':3}
	},

	'Bucket':{
		'item_id':2,
		'requires':{'wood':5, 'rope':2},
		'description':'Gather much more water',
		'name':'Wooden Bucket',
		'wearPerUse':-1,
		'time':1,
		'foodUse':3,
		'waterUse':2,
		'multiplier':{'water':5}
	},

	'Rope':{
		'item_id':3,
		'requires':{'wood':10},
		'description':'A rope for climbing',
		'name':'Rope',
		'wearPerUse':-1,
		'time':3,
		'foodUse':5,
		'waterUse':5,
		'multiplier':{}
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
	'iron':{'mat_id':3, 'difficulty':3, 'chance':20, 'tool':'Stone Hatchet'},
	'stone':{'mat_id':4, 'difficulty:':2, 'chance':50, 'tool':''}
}