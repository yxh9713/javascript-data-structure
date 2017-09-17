/**
 * Node constructor
 * @param {*} value - The value of the node
 */
function Node( value, prev, next ){
    this.value = value;
    this.prev = prev;
    this.next = next;
}

/**
 * LinkedList constructor
 */
function DoublyLinkedList(){
	/** Total nodes */
	this.length = 0;
	
	/** The 1st node */
	this.head = null;
	
	/** The last node */
	this.tail = null;
}

/**
 * DoublyLinkedList methods
 * 
 * addToHead() - add a node to the begin of the list
 * appToTail() - add a node the end 
 * insert() - insert data into a certain position
 * remove() - remove one node from the list
 * removeAt() - remove a particular node
 * indexOf() - the index of the passed value
 * size() - total amounts of nodes
 * toString() - export string of the list
 */
DoublyLinkedList.prototype = {
	
	addToHead: function( value ){
		let node = new Node(value, null, this.head);
		// update current head node
		if( this.head ){
			this.head.prev = node;
		}
		else{
			this.tail = node;
		}
		this.head = node;
		this.length++;
	},
	
	addToTail: function( value ){
		let node = new Node(value, this.tail, null);

		if( this.tail ){
			this.tail.next = node;
		}
		else{
			this.head = node;
		}
		
		this.tail = node;
		this.length++;
	},
	
	insert: function( position, value ){
		if( position === 0 ){
			this.addToHead( value ); 
		}
		else if( position >= this.length ){
			this.addToTail( value );
		}
		else{
			let node = new Node(value, null, null);
			let current = this.head;
			let index = 0;
			
			while( current ){
				index++;
				
				if( index === position ){
					let previousNode = current;
					let nextNode = current.next;
					
					node.prev = previousNode;
					node.next = nextNode;
					previousNode.next = node;
					nextNode.prev = node;
					break;
				}
				
				current = current.next;
			}
			this.length++;
		}
	},
	
	remove: function( value ){
		let index = this.indexOf(value);
		
		// removeAt
	    if( index > -1 ){
	      return this.removeAt(index);
	    }
	    else{
	      return null;
	    }
	},
	
	removeAt: function( position ){
		if( position < 0 || position > this.length ){
			return null;
		}
		
		let current = this.head;
		let index = 0;
		
		// 1st
		if( position === 0 ){
			this.head = current.next;
			this.head.prev = null;
			this.length--;
			return current.value;
		}
		else if( position >= this.length -1 ){
			current = this.tail;
			this.tail = current.prev;
			this.tail.next = null;
			return current.value;
		}
		else{
			let previous;
			while( current.next ){
				index++;
				previous = current;
				current = current.next;
				if( position === index ){
					let nextNode = current.next;
					previous.next = nextNode;
					nextNode.prev = previous;
					this.length--;
					return current.value;
				}
			}
	  }	
	},
	
	indexOf: function( value ){
		let current = this.head;
		let index = -1;
		
		while( current && index < 10){
			index++;
			//console.log(index,current);
			if( current.value === value ){
				return index;
			}
			current = current.next;
				console.log(current);
		}
		
		return -1;
	},
	
	size: function(){
		return this.length;
	},
	
	toString: function(){
		let returnString = '';
		let current = this.head;
	
	    while( current ){
	        returnString += current.value;
	        if( current.next ){
				returnString += ', ';
	        }
	        current = current.next;
	    }
	
	    return returnString;
	}

};

/**
 * TEST 
 */
let dll = new DoublyLinkedList();
dll.addToHead(400);
dll.addToHead(300);
dll.addToHead(100);
dll.addToTail(500);
dll.insert(1, 200);

console.log(dll.toString());
