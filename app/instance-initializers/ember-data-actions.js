import StoreMixin from 'ember-data-actions/mixins/store';

export default {
  name: 'ember-data-actions',
  initialize(application) {
    const store = application.lookup('service:store');

    store.reopen(StoreMixin);
  }
};
