var tools = {
	'stoneHatchet':{
		'item_id':1,
		'requires':{'stone':1, 'wood':1},
		'description':'A weak stone hatchet.',
		'name':'Stone Hatchet',
		'damage':5,
		'wearPerUse':-3,
		'time':1,
		'foodUse':3, //multiplier
		'waterUse':2, //multiplier
	},

	'bucket':{
		'item_id':2,
		
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
	'wood':{'mat_id':1, 'difficulty':1, 'chance':70, 'tools':[]}, // tools = list of required tool item_id's
	'bone':{'mat_id':2, 'difficulty':1, 'chance':10, 'tools':[]}
}