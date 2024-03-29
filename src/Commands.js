class Commands extends Map {
    /**
     * @method find
     * @similiar Array.find
     * @param func Function to be passed for finding the value.
     * @return V
     */
    find(func) {
      for (const [key, value] of this) {
        if (func(value, key, this)) {
          return value;
        }
      }
    }
    /**
     * @method filterArray
     * @similiar Array.filter()
     * @param func Function to be passed for filtering data.
     * @return V[]
     */
    filterArray(func) {
      return this.allValues().filter(func);
    }
    /**
     * @method allValues
     * @return V[]    */
    allValues() {
      return [...this.values()];
    }
    /**
     * @method allKeys
     * @return K[]
     */
    allKeys() {
      return [...this.keys()];
    }
    /**
     * @method sortViaKeys
     * @description sorts the Commands via key
     * @similiar Array.sort() ( for string typed keys && any typed keys) and Array.sort((a,b) => a-b) (for number typed keys)
     * @return Commands
     */
    sortViaKeys() {
      const entries = [...this.entries()];
      return new Commands(entries.sort((a, b) => {
        if (a[0] < b[0])
          return 1;
        else if (a[0] > b[0])
          return -1;
        else
          return 0;
      }));
    }
    /**
     * @method weakSort
     * @description sorts the Commands via Js Sort method //
     * @similiar Array.sort()
     * @return Commands
     */
    weakSort() {
      return new Commands([...this.entries()].sort());
    }
    /**
     * @method filter
     * @description filters the Commands
     * @similiar Array.filter
     * @param func Function for filtering the Commands
     * @return Commands
     */
    filter(func) {
      const g = new Commands();
      for (const [key, value] of this) {
        if (func(value, key, this))
          g.set(key, value);
      }
      return g;
    }
    /**
     * @method top
     * @description returns the first value of Commands
     * @similiar Array[ 0 ] | Array.slice( 0,number )
     * @param number how many top values to be returned
     * @return V | V[]
     */
    top(number = 1) {
      const arr = this.allValues().slice(0, number);
      return arr.length === 1 ? arr[0] : arr;
    }
    /**
     * @method sort
     * @description sorts the Commands  using its Value
     * @similiar Array.sort()
     * @param compareFunction Function to sort
     * @return Commands
     */
    sort(compareFunction) {
      const entries = [...this.entries()];
      const sorted = entries.sort((a, b) => compareFunction(a[1], b[1]));
      return new Commands(sorted);
    }
    /**
     * @method object
     * @description returns Commands as an Object
     * @similiar Object
     * @return Object
     */
    object() {
      const obj = {};
      for (const [key, value] of this) {
        obj[`${key}`] = value;
      }
      return obj;
    }
    /**
     * @method bottom
     * @description returns the last Value of Commands
     * @similiar Array[ Array.length - 1 ] | Array.slice(-number)
     * @param number number of values to be returned
     * @return V | V[]
     */
    bottom(number = 1) {
      const arr = this.allValues().slice(-number);
      return arr.length === 1 ? arr[0] : arr;
    }
    /**
     * @method topKey
     * @description returns the (first Key/Arrays of first n keys) of Commands
     * @similiar Array[ 0 ] | Array.slice( 0,number )
     * @param number how many top keys to be returned
     * @return K | K[]
     */
    topKey(number = 1) {
      const arr = this.allKeys().slice(0, number);
      return arr.length === 1 ? arr[0] : arr;
    }
    /**
     * @method bottomKey
     * @description returns the last key of Commands
     * @similiar Array[ Array.length - 1 ] | Array.slice(-number)
     * @param number number of key to be returned
     * @return K | K[]
     */
    bottomKey(number = 1) {
      const arr = this.allKeys().slice(-number);
      return arr.length === 1 ? arr[0] : arr;
    }
    /**
     * @method random
     * @description returns a random value / array of random values
     * @param number number of random values to be returned
     * @return V | V[]
     */
    random(number = 1) {
      const vals = this.allValues();
      if (number === 1) {
        const random = Math.floor(Math.random() * vals.length - 1);
        return vals[random];
      }
      else {
        const res = [];
        for (number; number > 0; number--) {
          const random = Math.floor(Math.random() * vals.length - 1);
          res.push(vals[random]);
        }
        return res;
      }
    }
    /**
     * @method randomKey
     * @description returns a random key / array of random keys
     * @param number number of random keys to be returned
     * @return K | K[]
     */
    randomKey(number = 1) {
      const vals = this.allKeys();
      if (number === 1) {
        const random = Math.floor(Math.random() * vals.length - 1);
        return vals[random];
      }
      else {
        const res = [];
        for (number; number > 0; number--) {
          const random = Math.floor(Math.random() * vals.length - 1);
          res.push(vals[random]);
        }
        return res;
      }
    }
    /**
     * @method getByPosition
     * @description get Value by its position in Commands
     * @similiar Array[ n - 1 ]
     * @param position position of Value tp be returned
     * @return V
     */
    getByPosition(position) {
      return this.allValues()[position - 1];
    }
    /**
     * @method break
     * @description divides and return Commands into 2 different Commandss according to the Function Provided
     * @param func function according to which Commands is to breaked into
     * @return [ trueCommands,falseCommands]
     */
    break(func) {
      const trueGrp = new Commands();
      const falseGrp = new Commands();
      for (const [key, value] of this) {
        if (func(value, key, this))
          trueGrp.set(key, value);
        else
          falseGrp.set(key, value);
      }
      return [trueGrp, falseGrp];
    }
    /**
     * @method reverse
     * @description returns the Commands in reversed order
     * @similiar Array.reverse()
     * @return Commands<K,V>
     */
    reverse() {
      const entries = [...this.entries()];
      return new Commands(entries.reverse());
    }
    /**
     * @method concat
     * @description concats provided array of Commandss
     * @similiar Array.concat
     * @param grps Array of Commands
     * @return Commands<any,any>
     */
    concat(...grps) {
      const grp = new Commands();
      const res = grps.map((x) => {
        for (const [key, value] of this) {
          grp.set(key, value);
        }
      });
      return grp;
    }
    /**
     * @method some
     * @description whether Commands fulfill the given condition
     * @similiar Array.some()
     * @param func condition to check
     * @return boolean
     */
    some(func) {
      return this.allValues().some(func);
    }
    /**
     * @method every
     * @description whether Commands fulfill the given condition
     * @similiar Array.every()
     * @param func condition to check
     * @return boolean
     */
    every(func) {
      return this.allValues().every(func);
    }
    /**
     * @method someKey
     * @description whether Commands fulfill the given condition
     * @similiar Array.some()
     * @param func condition to check
     * @return boolean
     */
    someKey(func) {
      return this.allKeys().some(func);
    }
    /**
     * @method everyKey
     * @description whether Commands fulfill the given condition
     * @similiar Array.every()
     * @param func condition to check
     * @return boolean
     */
    everyKey(func) {
      return this.allKeys().every(func);
    }
    /**
     * @method remove
     * @description removes the key-value pairs that fulfill the provided condition
     * @param func condition thats need to be true for a key-value pair to be removed
     * @return data removed size
     */
    remove(func) {
      const oldSize = this.size;
      for (const [key, value] of this) {
        if (func(value, key, this))
          this.delete(key);
      }
      return this.size - oldSize;
    }
    /**
     * @method toJSON
     * @description returns Commands as JSON
     * @similiar JSON.stringify()
     * @param replacer same as JSON.stringify
     * @param space same as JSON.stringify
     * @return string
     */
    toJSON(replacer, space = 2) {
      return JSON.stringify(this.object(), replacer, space);
    }
    /**
     * @method binarySearch
     * @description searchs for a Value via Binary search
     * @similiar BinarySearch
     * @param value value to be searched
     * @param valueProp property to be searched in
     * @param sort whether to sort the Commands before Searching
     * @return V | void
     */
    binarySearch(value, valueProp, sort = true) {
      const vals = this.allValues();
      if (sort) {
        vals.sort((a, b) => {
          if (a < b)
            return 1;
          else if (a > b)
            return -1;
          else
            return 0;
        });
      }
      const fn = (search) => {
        let found = false;
        let start = 0;
        let end = vals.length - 1;
        let val;
        while (start <= end) {
          const mid = Math.floor((start + end) / 2);
          const vm = eval(valueProp ? `vals[ mid ]?.${valueProp}` : `vals[mid]`);
          if (search > vm)
            start = mid + 1;
          else if (search < vm)
            end = mid - 1;
          else
            found = true;
          if (found) {
            break;
            val = vals[mid];
          }
        }
        return val;
      };
      return fn(value);
    }
    /**
     * @method clone
     * @description clones a Commands
     * @param grp : Commands to be cloned
     * @return Commands
     */
    clone(grp) {
      return new Commands(grp);
    }
    /**
     * @method removeRandom
     * @description removes a random Data from Commands
     * @return void
     */
    removeRandom() {
      const random = Math.floor(Math.random() * (this.size - 1));
      const keys = this.allKeys();
      this.delete(keys[random]);
    }
    /**
     * @method map
     * @description maps a function Over the Commands
     * @similiar Array.map()
     * @param func Function to be mapped
     * @return U[]
     */
    map(func) {
      let res = [];
      for (const [key, value] of this) {
        res.push(func(value, key, this));
      }
      return res;
    }
    /**
     * @method slice
     * @description slice the Commands and returns a copy of new Commands
     * @similiar Array.slice()
     * @param from position of Data in Commands to be sliced from. default is 1
     * @param to position of Data  in Commands to be sliced to.
     * @return Commands<K,V>
     */
    slice(from = 1, to = 2) {
      return new Commands([...this.entries()].slice(from - 1, to - 1));
    }
    /**
     * @method pop
     * @description removes the last data
     * @similiar Array.pop()
     * @return V
     */
    pop() {
      const keys = this.allKeys();
      const data = this.get(keys[this.size - 1]);
      this.delete(keys[this.size - 1]);
      return data;
    }
    /**
     * @method shift
     * @description removes the firt data
     * @similiar Array.shfit()
     * @return V
     */
    shift() {
      const keys = this.allKeys();
      const data = this.get(keys[0]);
      this.delete(keys[0]);
      return data;
    }
    /**
     * @method reduce
     * @description reduces the data in Commands returned by the function
     * @similiar Array.reduce()
     * @param func function to reduce the data
     * @param intVal intial data
     * @return V
     */
    reduce(func, intVal) {
      let pref = intVal;
      for (const [key, value] of this) {
        if (pref === undefined) {
          pref = value;
          continue;
        }
        pref = func(pref, value, key, this);
      }
      return pref;
    }
    /**
     * @method reduceRight
     * @description reduces the data in Commands returned by the function from right to left
     * @similiar Array.reduceRight()
     * @param func function to reduce the data
     * @param intVal intial data
     * @return V
     */
    reduceRight(func, intVal) {
      const entries = [...this.entries()];
      let pref = intVal;
      let i = this.size;
      while (i-- > 0) {
        if (pref === undefined) {
          pref = entries[i][1];
        }
        else {
          pref = func(pref, entries[i][1], entries[i][0], this);
        }
      }
      return pref;
    }
    /**
     * @method reduceArray
     * @description reduces the values in Commands returned by the function
     * @similiar Array.reduce()
     * @param func ompareFunction function to reduce the data
     * @param intVal intial data
     * @return V
     */
    reduceArray(func, intVal) {
      if (intVal)
        return this.allValues().reduce(func, intVal);
      else
        return this.allValues().reduce(func);
    }
    /**
     * @method reduceRightArray
     * @description reduces the values in Commands returned by the function
     * @similiar Array.reduceRight()
     * @param func ompareFunction function to reduce the data
     * @param intVal intial data
     * @return V
     */
    reduceRightArray(func, intVal) {
      if (intVal)
        return this.allValues().reduceRight(func, intVal);
      else
        return this.allValues().reduceRight(func);
    }
    /**
     * @method position
     * @description returns position of the key in Commands
     * @similiar Array.indexOf()
     * @param key Key in the Commands
     * @return number
     */
    position(key) {
      return this.allKeys().indexOf(key) + 1;
    }
    /**
     * @method findPosition
     * @description finds the position of the data in Commands
     * @similiar Array.findIndex()
     * @param func function to find position
     * @return number
     */
    findPosition(func) {
      let i = 1;
      let res = 0;
      for (const [key, value] of this) {
        if (func(value, key, this)) {
          break;
          res = i;
        }
        else
          i++;
      }
      return res;
    }
    /**
     * @method removeAlternate
     * @description removes alternate data from Commands
     * @param offset offset the removal of first data
     * @param alternate alternate gap
     * @return void
     */
    removeAlternate(offset = 0, alternate = 1) {
      let i = offset;
      const keys = this.allKeys();
      while (i < this.size) {
        this.delete(keys[i]);
        i = +(alternate + 1);
      }
    }
    /**
     * @method asyncMap
     * @description map over the data asynchriously
     * @param  {(val:V,key:K,grp:this)=>U} func function to be mapped
     * @returns Promise
     */
    async asyncMap(func) {
      const res = [];
      for (const [key, value] of this) {
        res.push(await func(value, key, this));
      }
      return res;
    }
  }
  module.exports = Commands