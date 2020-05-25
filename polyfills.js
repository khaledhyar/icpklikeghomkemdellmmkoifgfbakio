( () => {
  if( window.Promise.prototype.finally ) return;

  /**
  @method
  @param {Function}
  @return {Promise} initial */
  window.Promise.prototype.finally = function( onFinally ) { // eslint-disable-line no-extend-native
    this.then( onFinally, onFinally );

    return this;
  };
})();


// https://github.com/uxitten/polyfill/blob/master/string.polyfill.js
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padEnd
if( !String.prototype.padEnd ) {
  String.prototype.padEnd = function padEnd( targetLength, padString ) { // eslint-disable-line
    targetLength = targetLength >> 0; //floor if number or convert non-number to 0;
    padString = String( ( typeof padString !== 'undefined' ? padString : ' ' ) );
    if( this.length > targetLength ) {
      return String( this );
    }
    else {
      targetLength = targetLength - this.length;
      if( targetLength > padString.length ) {
        padString += padString.repeat( targetLength / padString.length ); //append to original to ensure we are longer than needed
      }
      return String( this ) + padString.slice( 0, targetLength );
    }
  };
}


// https://github.com/uxitten/polyfill/blob/master/string.polyfill.js
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padStart
if( !String.prototype.padStart ) {
  String.prototype.padStart = function padStart( targetLength, padString ) { // eslint-disable-line
    targetLength = targetLength >> 0; //truncate if number or convert non-number to 0;
    padString = String( ( typeof padString !== 'undefined' ? padString : ' ' ) );
    if( this.length > targetLength ) {
      return String( this );
    }
    else {
      targetLength = targetLength - this.length;
      if( targetLength > padString.length ) {
        padString += padString.repeat( targetLength / padString.length ); //append to original to ensure we are longer than needed
      }
      return padString.slice( 0, targetLength ) + String( this );
    }
  };
}


( arr => {
  arr.forEach( item => {
    if( item.hasOwnProperty( 'append' ) ) return;

    Object.defineProperty( item, 'append', {
      'configurable': true,
      'enumerable': true,
      'writable': true,
      'value': function append( ...argArr ) {
        var docFrag = document.createDocumentFragment();

        argArr.forEach( argItem => {
          docFrag.appendChild(
            argItem instanceof Node
              ? argItem
              : document.createTextNode( String( argItem ) )
          );
        });

        this.appendChild( docFrag );
      }
    });
  });
})( [ Element.prototype, Document.prototype, DocumentFragment.prototype ] );


( arr => {
  arr.forEach( item => {
    if( item.hasOwnProperty( 'prepend' ) ) return;

    Object.defineProperty( item, 'prepend', {
      'configurable': true,
      'enumerable': true,
      'writable': true,
      'value': function prepend( ...argArr ) {
        var docFrag = document.createDocumentFragment();

        argArr.forEach( argItem => {
          docFrag.appendChild(
            argItem instanceof Node
              ? argItem
              : document.createTextNode( String( argItem ) )
          );
        });

        this.insertBefore( docFrag, this.firstChild );
      }
    });
  });
})( [ Element.prototype, Document.prototype, DocumentFragment.prototype ] );


// From https://github.com/cvan/keyboardevent-key-polyfill
( () => {
  var isEdgeOrIE = (
    navigator.userAgent.indexOf( 'MSIE ' ) > 0 ||
    !!navigator.userAgent.match( /Trident.*rv\:11\./ ) ||
    navigator.userAgent.indexOf( 'Edge/' ) > 0
  );
  let condition =
    !( 'KeyboardEvent' in window ) ||
    ( 'key' in KeyboardEvent.prototype && !isEdgeOrIE );
  if( condition ) return;

  var keys = {
    '3': 'Cancel',
    '6': 'Help',
    '8': 'Backspace',
    '9': 'Tab',
    '12': 'Clear',
    '13': 'Enter',
    '16': 'Shift',
    '17': 'Control',
    '18': 'Alt',
    '19': 'Pause',
    '20': 'CapsLock',
    '27': 'Escape',
    '28': 'Convert',
    '29': 'NonConvert',
    '30': 'Accept',
    '31': 'ModeChange',
    '32': ' ',
    '33': 'PageUp',
    '34': 'PageDown',
    '35': 'End',
    '36': 'Home',
    '37': 'ArrowLeft',
    '38': 'ArrowUp',
    '39': 'ArrowRight',
    '40': 'ArrowDown',
    '41': 'Select',
    '42': 'Print',
    '43': 'Execute',
    '44': 'PrintScreen',
    '45': 'Insert',
    '46': 'Delete',
    '48': [ '0', ')' ],
    '49': [ '1', '!' ],
    '50': [ '2', '@' ],
    '51': [ '3', '#' ],
    '52': [ '4', '$' ],
    '53': [ '5', '%' ],
    '54': [ '6', '^' ],
    '55': [ '7', '&' ],
    '56': [ '8', '*' ],
    '57': [ '9', '(' ],
    '91': 'OS',
    '93': 'ContextMenu',
    '106': '*',
    '107': '+',
    '109': '-',
    '110': '.',
    '111': '/',
    '144': 'NumLock',
    '145': 'ScrollLock',
    '181': 'VolumeMute',
    '182': 'VolumeDown',
    '183': 'VolumeUp',
    '186': [ ';', ':' ],
    '187': [ '=', '+' ],
    '188': [ ',', '<' ],
    '189': [ '-', '_' ],
    '190': [ '.', '>' ],
    '191': [ '/', '?' ],
    '192': [ '`', '~' ],
    '219': [ '[', '{' ],
    '220': [ '\\', '|' ],
    '221': [ ']', '}' ],
    '222': [ "'", '"' ],
    '224': 'Meta',
    '225': 'AltGraph',
    '246': 'Attn',
    '247': 'CrSel',
    '248': 'ExSel',
    '249': 'EraseEof',
    '250': 'Play',
    '251': 'ZoomOut'
  };

  // Function keys (F1-24).
  var i;
  for( i = 1; i < 25; i++ ) {
    keys[ 111 + i ] = 'F' + i;
  }

  // Printable ASCII characters.
  for( i = 65; i < 91; i++ ) {
    let letter = String.fromCharCode( i );
    keys[ i ] = [ letter.toLowerCase(), letter.toUpperCase() ];
  }

  // Numbers on numeric keyboard.
  for( i = 96; i < 106; i++ ) {
    let letter = String.fromCharCode( i - 48 );
    keys[ i ] = letter;
  }


  // Polyfill `key` on `KeyboardEvent`.
  var proto = {
    'get': function( x ) {
      var key = keys[ this.which || this.keyCode ];

      if( Array.isArray( key ) ) {
        key = key[ +this.shiftKey ];
      }

      return key;
    },
    'enumerable': true,
    'configurable': true
  };
  Object.defineProperty( KeyboardEvent.prototype, 'key', proto );
})();


