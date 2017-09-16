/**
 * Node constructor
 * @param {*} value - The value of the node
 */
function Node( value ){
  this.value = value;
  this.next = null;
}

/**
 * LinkedList constructor
 * @param {Number} length - Total nodes
 * @param {Object} head - The 1st node
 */
function LinkedList(){
  this.length = 0;
  this.head = null;
}

/**
 * LinkedList methods
 * 
 * append() - add a new node the end
 * remove() - remove one node from the list
 * removeAt() - remove a particular node
 * indexOf() - the index of the passed value
 * size() - total amounts of nodes
 * toString() - export string of the list
 * insert() - insert data into a certain position
 */

// add a new node the end
LinkedList.prototype.append = function( value ){
    let node = new Node(value);
    
    // if list is empty
    if( this.head === null ){
      this.head = node;
    }
    else{
      // if the current has next node means it is not the last one
      let current = this.head;
      while( current.next ){
        current = current.next;
      }
      current.next = node;
    }
    
    this.length++;
    return true;
};


// remove the node
LinkedList.prototype.remove = function( value ){
    // find index of passed in value
    let index = this.indexOf(value);

    // removeAt
    if( index > -1 ){
      return this.removeAt(index);
    }
    else{
      return null;
    }
};

// remove the node at the position(index)
LinkedList.prototype.removeAt = function( position ){
  
  if( position < 0 || position > this.length ){
    return null;
  }
  
  let current = this.head;
  let index = 0;
  
  // 1st
  if( position === 0 ){
    this.head = current.next;
    this.length--;
    return current;
  }
  else{
    let previous;
    
    while( current.next ){
      index++;
      previous = current;
      current = current.next;
      
      if( position === index ){
        previous.next = current.next;
        this.length--;
        return current.value;
      }
    }
  }
};

LinkedList.prototype.indexOf = function( value ){
  let current = this.head;
  let index = 0;
  
  // 1st
  if( current.value === value ){
    return 0; 
  }
  else{
    while( current.next ){
      if( current.next.value === value ){
        index++;
        return index;
      }
      else{
        current = current.next;
        index++;
      }
    } 
  }

  return -1;
};

LinkedList.prototype.insert = function( position, value ){
  
  if( position < 0 ){
    return false;
  }
  
  if( position >= this.length ){
    this.append( value );
  }
  else{
    let node = new Node(value);

    if( position === 0 ){
      node.next = this.head;
      this.head = node;
    }
    else{
      let index = 0;
      let current = this.head;
    
      while( current.next ){
        index++;
        if( index === position ){
          node.next = current.next;
          current.next = node;
        }
        current = current.next;
      }
    }
    
    this.length++;
    return true;
  }
};

LinkedList.prototype.size = function(){ 
    return this.length;
};

LinkedList.prototype.toString = function(){
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
};