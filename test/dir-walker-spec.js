var walker = require('../lib/dir-walker'),
  assert = require('assert'),
  path = require('path');

describe('directory-walker', function () {
  describe('#walkSync', function () {
    it('should return directory tree', function () {
      var tree = walker.walkSync('test/resources', '.');

      assertNodeEqual(tree, '.', 'folder', '.');

      assert.equal(tree.items.length, 3);

      assertNodeEqual(tree.items[0], 'eating_cucumbers.feature', 'file', 'test/resources/eating_cucumbers.feature');
      assertNodeEqual(tree.items[1], 'hello_world.feature', 'file', 'test/resources/hello_world.feature');
      assertNodeEqual(tree.items[2], 'non_functional', 'folder', 'test/resources/non_functional');
      assertNodeEqual(tree.items[2].items[0], 'load_testing.feature', 'file', 'test/resources/non_functional/load_testing.feature');
    });
  });

  function assertNodeEqual(actualNode, expectedName, expectedType, expectedPath) {
    assert.equal(actualNode.name, expectedName);
    assert.equal(actualNode.type, expectedType);
    assert.equal(actualNode.path, path.normalize(expectedPath));
  }

});