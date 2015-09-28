import StoreMixin from 'ember-data-actions/mixins/store';

export default {
  name: 'ember-data-actions',
  initialize(application) {
    var store = application.container.lookup('service:store');
    store.reopen(StoreMixin);
  }
};
