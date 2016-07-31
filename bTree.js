function indexOfSorted(array, key) {
  let min = 0,
      max = array.length - 1;
  while (min <= max) {
    let mid = min + Math.floor((max - min) / 2);
    if (array[mid] === key) {
      return mid;
    } else if (array[mid] < key) {
      min = mid + 1;
    } else if (array[mid] > key) {
      max = mid - 1;
    }
  }
  return -1;
}

class Node {
  constructor(keys=[], children=[]) {
    this._keys = keys;
    this._children = children;
    this.parent = null;
  }

  keyCount() {
    return this._keys.length;
  }

  children() {
    return this._children;
  }

  includes(key) {
    if (indexOfSorted(this._keys, key) !== -1) {
      return true;
    }
    const childIdx = this._childIdxFor(key);
    if (childIdx < this._children.length) {
      return this._children[childIdx].includes(key);
    }
    return false;
  }

  insert(key) {
    const childIdx = this._childIdxFor(key);
    this._keys.splice(childIdx, 0, key);
  }

  leafFor(key) {
    if (this._children.length === 0) {
      return this;
    }
    return this._children[this._childIdxFor(key)].leafFor(key);
  }

  split() {
    const medianIdx = Math.floor(this._keys.length / 2),
          leftNode = new Node(this._keys.slice(0, medianIdx), this._children.slice(0, medianIdx + 1)),
          rightNode = new Node(this._keys.slice(medianIdx + 1), this._children.slice(medianIdx + 1));

    leftNode._children.forEach(c => c.parent = leftNode);
    rightNode._children.forEach(c => c.parent = rightNode);
    return [this._keys[medianIdx], leftNode, rightNode];
  }

  insertChildBefore(key, node) {
    this._children[indexOfSorted(this._keys, key)] = node;
    node.parent = this;
  }

  insertChildAfter(key, node) {
    const idx = indexOfSorted(this._keys, key);
    this._children.splice(idx+1, 0, node);
    node.parent = this;
  }

  _childIdxFor(key) {
    let min = 0,
        max = this._keys.length - 1;
    while (min <= max) {
      const idx = min + Math.floor((max - min) / 2);
      if (this._keys[idx] === key) {
        return null;
      } else if (this._keys[idx] > key) {
        if (idx === 0 || this._keys[idx-1] < key) {
          return idx;
        } else {
          max = idx - 1;
        }
      } else if (this._keys[idx] < key) {
        if (idx === this._keys.length - 1) {
          return this._keys.length;
        } else {
          min = idx + 1;
        }
      }
    }
    return this._keys.length;
  }
}

export default class BTree {
  // order = max # of children
  constructor(order) {
    this.order = order;
    this.root = new Node([]);
  }

  insert(key) {
    if (this.includes(key)) {
      return;
    }
    const leaf = this.root.leafFor(key);
    leaf.insert(key);
    this._splitUp(leaf);
  }

  includes(key) {
    return this.root.includes(key);
  }

  toString() {
    return JSON.stringify(this.root, ["_keys", "_children"], " ");
  }

  _splitUp(node) {
    while (node !== null && node.keyCount() >= this.order) {
      const [splitKey, leftNode, rightNode] = node.split();
      if (node.parent === null) {
        node.parent = new Node([]);
        this.root.parent = node.parent;
        this.root = node.parent;
      }
      node.parent.insert(splitKey);
      node.parent.insertChildBefore(splitKey, leftNode);
      node.parent.insertChildAfter(splitKey, rightNode);
      node = node.parent;
    }
  }
}
