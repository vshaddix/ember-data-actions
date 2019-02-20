import Mixin from '@ember/object/mixin';

export default Mixin.create({

  /**
   * Trigger a collection level action.
   *
   * @param {String} typeKey
   * @param {String} actionName - the name of the action to trigger
   */
  action(typeKey, actionName, ...args) {
    var model = this.modelFor(typeKey);
    var action = model.actionFor(this, actionName);
    return action(...args);
  }

});
