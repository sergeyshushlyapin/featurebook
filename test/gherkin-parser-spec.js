var gherkin = require('../lib/gherkin-parser'),
  assert = require('assert');

describe('gherkin-parser', function () {

  describe('#parse', function () {

    it('should parse a simple feature with a single scenario', function () {
      var featureAsJson = gherkin.parse('test/resources/hello_world.feature'),
        firstScenario = featureAsJson.scenarios[0];

      assert.equal(featureAsJson.name, 'Hello World');

      assert.equal(featureAsJson.scenarios.length, 1);
      assert.equal(featureAsJson.scenario_outlines.length, 0);

      assert.equal(firstScenario.name, 'Look Ma');
      assert.equal(firstScenario.steps.length, 3);

      assertStepEqual(firstScenario.steps[0], 'Given', 'I am in a browser');
      assertStepEqual(firstScenario.steps[1], 'When', 'I make a syntax error');
      assertStepEqual(firstScenario.steps[2], 'Then', 'stuff should be red');
    });

    it('should parse a simple feature with a single scenario outline', function () {
      var featureAsJson = gherkin.parse('test/resources/eating_cucumbers.feature'),
        firstScenarioOutline = featureAsJson.scenario_outlines[0];

      assert.equal(featureAsJson.name, 'Eating cucumbers');
      assert.equal(featureAsJson.scenarios.length, 0);
      assert.equal(featureAsJson.scenario_outlines.length, 1);

      assert.equal(firstScenarioOutline.name, 'Eat');
      assert.equal(firstScenarioOutline.steps.length, 3);

      assertStepEqual(firstScenarioOutline.steps[0], 'Given', 'there are <start> cucumbers');
      assertStepEqual(firstScenarioOutline.steps[1], 'When', 'I eat <eat> cucumbers');
      assertStepEqual(firstScenarioOutline.steps[2], 'Then', 'I should have <left> cucumbers');

      assert.equal(firstScenarioOutline.examples.length, 3);
      assertRowEqual(firstScenarioOutline.examples[0], ['start', 'eat', 'left']);
      assertRowEqual(firstScenarioOutline.examples[1], [12, 5, 7]);
      assertRowEqual(firstScenarioOutline.examples[2], [20, 5, 15]);
    });

  });

  function assertStepEqual(actualStep, keyword, name) {
    assert.equal(keyword, actualStep.keyword);
    assert.equal(name, actualStep.name);
  }

  function assertRowEqual(actualRow, expectedRow) {
    assert.deepEqual(actualRow, expectedRow);
  }

});