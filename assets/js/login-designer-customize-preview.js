/**
 * This file adds some LIVE to the Theme Customizer live preview. To leverage
 * this, set your custom settings to 'postMessage' and then add your handling
 * here. This javascript will grab settings from customizer controls, and
 * then make any necessary changes to the page using jQuery.
 */

( function( $ ) {

	// Whether a custom logo image is available.
	function hasLogo() {
		var image = wp.customize( 'login_designer_custom_logo' )();
		return '' !== image;
	}

	// Switch to the /login-designer/ page, where we can live-preview Customizer options.
	wp.customize.bind( 'preview-ready', function() {

		wp.customize.preview.bind( 'login-designer-url-switcher', function( data ) {

			// When the section is expanded, open the fake login page.
			if ( true === data.expanded ) {

				url = '/login-designer/';

				wp.customize.preview.send( 'url', url );

			}
		});
	});

	// Add a body class based on the current template.
	wp.customize( 'login_designer__template-selector', function( value ) {
		value.bind( function( to ) {

			$( 'body.login' ).attr( 'class', 'login login-action-login wp-core-ui locale-en-us has-template-applied' );
			$( 'body.login' ).addClass( 'login-designer-template-' + to );

			// If we have a custom background color, let's remove it so the templates can shine.
			$( 'body.login' ).css( 'background-color', '' );
		} );
	} );

	// Login page background color.
	wp.customize( 'login_designer_body_bg_color', function( value ) {
		value.bind( function( to ) {

			$( 'body.login' ).removeClass( 'class', 'has-template-applied' );

			$( 'body.login' ).css( 'background-color', to );
		} );
	} );

	// Login page background image url.
	wp.customize( 'login_designer_body_bg_img__url', function( value ) {
		value.bind( function( to ) {
			$( 'body.login' ).css( 'background-image', 'url( ' + to + ')' );
		} );
	} );

	// Login page background image url.
	wp.customize( 'login_designer__gallery', function( value ) {
		value.bind( function( to ) {
			$( 'body.login' ).css( 'background-image', 'url(" ' + login_designer_script.plugin_url + '/' + to + '.jpg")' );

			console.log(login_designer_script.plugin_url);
		} );
	} );

	// Login page background image repeat.
	wp.customize( 'login_designer_body_bg_img__repeat', function( value ) {
		value.bind( function( to ) {
			var style, el;
			style = '<style class="login_designer_body_bg_img__repeat"> body.login { background-repeat: ' + to + '; } </style>';

			el =  $( '.login_designer_body_bg_img__repeat' );

			if ( el.length ) {
				el.replaceWith( style ); // style element already exists, so replace it
			} else {
				$( 'head' ).append( style ); // style element doesn't exist so add it
			}
		} );
	} );

	// Login page background image size.
	wp.customize( 'login_designer_body_bg_img__size', function( value ) {
		value.bind( function( to ) {
			var style, el;
			style = '<style class="login_designer_body_bg_img__size"> body.login { background-size: ' + to + '; } </style>';

			el =  $( '.login_designer_body_bg_img__size' );

			if ( el.length ) {
				el.replaceWith( style ); // style element already exists, so replace it
			} else {
				$( 'head' ).append( style ); // style element doesn't exist so add it
			}
		} );
	} );

	// Login page background image position.
	wp.customize( 'login_designer_body_bg_img__position', function( value ) {
		value.bind( function( to ) {
			var style, el;

			var to = to;
			var to = to.replace(/-/g, ' ');

			style = '<style class="login_designer_body_bg_img__position"> body.login { background-position: ' + to + '; } </style>';

			el =  $( '.login_designer_body_bg_img__position' );

			if ( el.length ) {
				el.replaceWith( style ); // style element already exists, so replace it
			} else {
				$( 'head' ).append( style ); // style element doesn't exist so add it
			}
		} );
	} );

	// Login page background attachment position.
	wp.customize( 'login_designer_body_bg_img__attach', function( value ) {
		value.bind( function( to ) {
			var style, el;
			style = '<style class="login_designer_body_bg_img__attach"> body.login { background-attachment: ' + to + '; } </style>';

			el =  $( '.login_designer_body_bg_img__attach' );

			if ( el.length ) {
				el.replaceWith( style ); // style element already exists, so replace it
			} else {
				$( 'head' ).append( style ); // style element doesn't exist so add it
			}
		} );
	} );

	// Custom logo.
	wp.customize( 'login_designer_custom_logo', function( value ) {

		value.bind( function( to ) {

			var style, element;

			// If we have a custom logo uploaded.
			if ( hasLogo() ) {

				// Set the background image of the logo.
				$( '#login-designer-logo' ).css( 'background-image', 'url( ' + to + ')' );

				// Grab the height & width attributes, so we can resize the logo appropriately.
				var img = new Image();

				img.onload = function(){

					// We're dividing by 2, in order to make the logo's look nice on retina devices.
					var width 	= img.width / 2,
					    height 	= img.height / 2;

		           		$( '#login-designer-logo' ).css({
		           			width: width,
						height: height,
					});

					// Setting the background size of the custom logo.
					var style = '<style class="login_designer_custom_logo"> #login-designer-logo { background-size:'+width+'px; } </style>';
				}

				img.src = to;

			} else {
				// If a logo is removed, fallback to the default WordPress logo + sizes.
				style = '<style class="login_designer_custom_logo"> #login-designer-logo { height: 84px !important; width: 84px !important; background-size: 84px !important; background-image: none, url(" ' + login_designer_script.admin_url + '/images/wordpress-logo.svg ") !important; } </style>';
			}

			// alert( style );

			// Outut the style changes (for background sizes).
			element =  $( '.login_designer_custom_logo' );

			if ( element.length ) {
				element.replaceWith( style );
			} else {
				$( 'head' ).append( style );
			}
		} );
	} );

	// Custom logo margin bottom.
	wp.customize( 'login_designer_custom_logo_margin_bottom', function( value ) {
		value.bind( function( to ) {
			var style, el;
			style = '<style class="login_designer_custom_logo_margin_bottom"> body.login #login h1 a { margin-bottom: ' + to + 'px !important; } </style>';

			el =  $( '.login_designer_custom_logo_margin_bottom' );

			if ( el.length ) {
				el.replaceWith( style ); // style element already exists, so replace it
			} else {
				$( 'head' ).append( style ); // style element doesn't exist so add it
			}
		} );
	} );

	// Login form background color.
	wp.customize( 'login_designer_form_background_color', function( value ) {
		value.bind( function( to ) {
			$( 'body.login #loginform' ).css( 'background-color', to );
		} );
	} );

	// Login form border radius.
	wp.customize( 'login_designer_form_border_radius', function( value ) {
		value.bind( function( to ) {
			var style, el;
			style = '<style class="login_designer_form_border_radius"> body.login #loginform, body.login #loginform:after { border-radius: ' + to + 'px; } </style>';

			el =  $( '.login_designer_form_border_radius' );

			if ( el.length ) {
				el.replaceWith( style ); // style element already exists, so replace it
			} else {
				$( 'head' ).append( style ); // style element doesn't exist so add it
			}
		} );
	} );

	// Login form width.
	wp.customize( 'login_designer_form_width', function( value ) {
		value.bind( function( to ) {
			$( 'body.login #login' ).css({
				width: to,
			});
		} );
	} );

	wp.customize( 'login_designer_logo_url', function( value ) {
		value.bind( function( to ) {
			$( '#login-designer-logo' ).attr( 'href', to );
		} );
	} );

} )( jQuery );