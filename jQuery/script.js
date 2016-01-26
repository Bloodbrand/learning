$( document ).ready( function () { //fire only when DOM is ready
	//findAndReplace(); 
	//selectAll_li();
	//selectDescendants();
	//selectMultipleElements();
	//selectFirstLast();
	//selectOddEven();
	//traverse();
	//addRemoveNodes();
	//buttonInteraction();
	useThis();
} );

function findAndReplace () {
	console.log ( $('h1').text() ); //return text content
	$( 'h1' ).text( 'text updated with jQuery' ); //update text	
}

function selectAll_li (argument) {
	$( 'li' ).text( 'berlin' );	
}

function selectDescendants () {
	console.log ( $( '#destinations li' ) ); //selects ALL li that are children of id 'destination'
	console.log ( $( '#destinations > li' ) ); //selects just DIRECT children
}

function selectMultipleElements () {
	console.log ( $( '.promo, #romania' ) );
}

function selectFirstLast () {
	console.log( $( '#destinations li:first, li:last' ) );
}

function selectOddEven () {	
	console.log( $( '#destinations li:odd' ) );
	console.log( $( '#destinations li:even' ) );
}

function traverse () {
	console.log( $( 'li' ) .first() .next() ); //second li
	console.log( $( 'li' ) .first() .parent() ); //selects whole ul
	console.log( $( '#destinations' ) .children( 'li' ) ); //selects direct children
}

function addRemoveNodes () {
	var price = $( '<p>from $399.99</p>' ); //creates node
	$( '.vacation' ).append( price ); //adds as last child
	//$( '.vacation' ).prepend( price ); //adds as first child
	//$( '.vacation' ).before( price ); //adds above below
	//$( '.vacation' ).after( price ); //adds directly below
	$( '#priceButton' ).remove();
}

function buttonInteraction () {
	$( 'button' ).on( 'click', function () { //listen for click
		var price = $( '<p>from $399.99</p>' );
		$( '.vacation' ).find( 'li' ).append( price ); //add price to all li
		$( 'button' ).remove();
	} );
}

function useThis(){//this = currently clicked element
		$( 'button' ).on( 'click', function () { //listen for click
		var price = $( '<p>from $399.99</p>' );
		$( this ).closest( '.vacation' ).append( price ); //closest = first element up the dom that matches selector
		$( this ).remove();
	} );
}