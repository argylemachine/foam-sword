import Ember from 'ember';

export default Ember.Controller.extend( {
	dataSource: function( ){
		return this.store.find( "dataSource" );
	}.property( "dataList" ).volatile( ),
} );
