/**
 * Node constructor, saved in the table
 * @param {String} key
 * @param {*} value
 */
function Node( key, value, next ){
	this.key = key;
	this.value = value;
	/** linkedlist structure, if hashing keys conflict */ 
	this.next = next || null;
}

/**
 * Generate key for hash table,
 * charCodeAt get Unicode number of the character
 * @param {string} key
 * @return {number} 
 */
HashTable.prototype.getHashTableCode = function( key ){
	let returnCode = 0;
	for( let i in key ){
		returnCode += key.charCodeAt(i); 
	}
	
	return returnCode % this.size;
}

/**
 * Hash table constructor
 * @param {number} size - The table array size.
 */

function HashTable( size ){
	this.tables = new Array(size);
	this.size = size;
}

/**
 * Insert data to the table
 * @param {string} key
 * @param {*} value
 */
HashTable.prototype.insert = function( key, value ){
	let code = this.getHashTableCode( key );
	let node = new Node(key, value);
	if( !this.tables[code] ){
		this.tables[code] = node;
	}
	else{
		let current = this.tables[code];
		
		/** if the key of node is the same, update the value of this node */
		if( current.key === key ){
			current.value = value;
		}
		else{
			while( current.next ){
				if( current.next.key === key ){
					current.next.value = value;
					return;
				}
				current = current.next;
			}
			current.next = node;
		}
	}
}

/**
 * Remove data to the table
 * @param {string} key
 * @return {Boolean}
 */
HashTable.prototype.remove = function( key ){
	let code = this.getHashTableCode( key );
	let result = false;
	
	if( this.tables[code] ){
		let current = this.tables[code];
		
		if( current.key === key ){
			if( current.next ){
				this.tables[code] = current.next;
			}
			else{
				this.tables[code] = null
			}
			result = true;
		}
		else{
			while( current.next ){
				if( current.next.key === key ){
					if( current.next.next ){
						current.next = current.next.next ;
					}
					else{
						current.next = null;
					}
					result = true;
					break;
				}
				current = current.next;
			}	
		}
	}

	return result;
}

/**
 * Get value of the key
 * @param {string} key
 * @return {*} returnValue
 */

HashTable.prototype.get = function( key ){
	let code = this.getHashTableCode( key );
	let returnValue = null;
	
	if( this.tables[code] ){
		let current = this.tables[code];
	
		while( current ){
			if( current.key === key ){
				returnValue = current.value;
				break;
			}
			current = current.next;
		}
	}

	return returnValue;
}

/**
 * Get all value from the table
 * @return {*} returnValue
 */

HashTable.prototype.retrieveAll = function(){
	
	let returnArray = [];
	
	this.tables.forEach( (value, index) => {
		
		if( !value.next ){
			returnArray.push(value);
		}
		else{
			let current = value;
			while( current ){
				returnArray.push( current );
				current = current.next;
			}
		}
	});

	return returnArray;
}

/**
 * Test
 */

var ht = new HashTable(30);
ht.insert('John', 12885678);
ht.insert('Dane', 12345678);
ht.insert('Dena', 98745632);
ht.insert('Dnea', 11111111);
ht.insert('John', 33333333);

console.log(ht.retrieveAll());
console.log(ht.remove('Dena'));
console.log(ht.retrieveAll());
