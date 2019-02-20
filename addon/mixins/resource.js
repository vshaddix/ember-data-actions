import Mixin from '@ember/object/mixin';
import { get } from '@ember/object';

export default Mixin.create({

  /**
   * Add your action handlers to the actions object. Handlers are functions that
   * take 4 arguments (type, store, adapter, params), and the return value is
   * handed directly back to the caller.
   *
   * Model action handlers are great for when you want to work with records,
   * rather than just raw JSON results. For example, you could create a factory
   * action that creates new records by invoking a collection level action and
   * creating records from the results.
   */

  /**
   * Lookup the action handler for this particular action. If none exists, fall
   * back to the default action handler.
   *
   * @param {DS.Store} store
   * @param {String} actionName - the name of the collection action to trigger
   */
  actionFor(actionName) {
    var type = this.constructor;
    var store = get(this, 'store');
    var adapter = store.adapterFor(type.modelName);
    var handler = get(this, `actions.${actionName}`);
    var invokeAdapterAction = (params) => {
      var adapterAction = adapter.actionFor(type, actionName, this);
      return adapterAction(params);
    };

    if (handler) {
      return handler.bind(this, invokeAdapterAction, type);
    } else {
      handler = this.get('defaultAction');
      return handler.bind(this, invokeAdapterAction, type, actionName);
    }
  },

  /**
   * The default action is to simply handoff to the adapter.
   *
   * @param {Function} adapterAction - the corresponding adapterAction
   * @param {DS.Model} type
   * @param {String} actionName - the name of the collection action to trigger
   * @param {Object} params - arbitrary arguments to the action handler
   */
  defaultAction(adapterAction, type, actionName, params) {
    return adapterAction(params);
  }

});
