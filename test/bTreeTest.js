import { describe, it } from "mocha";
import { assert } from "chai";
import BTree from "../bTree.js";

function verifyNode(node, order, isRoot=false) {
  const numChildren = node.children().length,
        isLeaf = numChildren === 0;
  assert(numChildren <= order, `Too many children, were ${numChildren}, limit ${order}`);
  if (!isLeaf && !isRoot) {
    assert(numChildren >= Math.ceil(order / 2), "Too few children");
  }
  if (isRoot && !isLeaf) {
    assert(numChildren >= 2);
  }
  assert(node.keyCount() < order, "Too many keys");
  if (!isLeaf) {
    assert(numChildren === (node.keyCount() + 1), `Has ${node.keyCount()} key(s) but ${numChildren} children.`);
  }
  for (let child of node.children()) {
    verifyNode(child, order);
  }
}

function verifyTree(tree) {
  verifyNode(tree.root, tree.order, true);
}

function bulkInsert(tree, ...keys) {
  keys.forEach(key => tree.insert(key));
}

function assertIncludes(tree, ...keys) {
  keys.forEach(key => assert(tree.includes(key), `Can't find value ${key}.`));
}

describe("new tree", () => {
  it("makes a valid empty tree", () => {
    verifyTree(new BTree(3));
  });
});

describe("insertion & searching", () => {
  it("inserts a single element correctly", () => {
    const tree = new BTree(3);
    tree.insert(1);
    assertIncludes(tree, 1);
    verifyTree(tree);
  });

  it("inserts 2 elements correctly", () => {
    const tree = new BTree(3);
    bulkInsert(tree, 1, 2);
    assertIncludes(tree, 1, 2);
    verifyTree(tree);
  });

  it("inserts 3 elements correctly", () => {
    const tree = new BTree(3);
    bulkInsert(tree, 1, 2, 3);
    assertIncludes(tree, 1, 2, 3);
    verifyTree(tree);
  });

  it("inserts 4 elements correctly", () => {
    const tree = new BTree(3);
    bulkInsert(tree, 1, 2, 3, 4);
    assertIncludes(tree, 1, 2, 3, 4);
    verifyTree(tree);
  });

  it("inserts 7 elements correctly, requiring cascading splits", () => {
    const tree = new BTree(3);
    bulkInsert(tree, 1, 2, 3, 4, 5, 6, 7);
    assertIncludes(tree, 1, 2, 3, 4, 5, 6, 7);
    verifyTree(tree);
  });

  it("inserts 5 random elements", () => {
    const tree = new BTree(3),
          keys = [5, 8, 2, 4, 0];
    bulkInsert(tree, ...keys);
    assertIncludes(tree, ...keys);
    verifyTree(tree);
  });

  it("inserts 14 random elements", () => {
    const tree = new BTree(3),
          keys = [278,347,161,833,693,358,95,874,816,621,271,326,73,295];
    bulkInsert(tree, ...keys);
    assertIncludes(tree, ...keys);
    verifyTree(tree);
  });

  function randomSeq(len) {
    return Array(len).fill().map(i => Math.floor(Math.random() * 100000));
  }

  it("inserts a whole bunch of elements", function() {
    for (let i = 0; i < 10; i++) {
      const tree = new BTree(300),
            keys = randomSeq(50000);
      bulkInsert(tree, ...keys);
      assertIncludes(tree, ...keys);
      verifyTree(tree);
    }
  });
});
