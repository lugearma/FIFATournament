var $icono = $('#img_menu'),
	$menu = $('#menu');

	function esconderMenu () {
		$menu.slideToggle();
	}

	$icono.click( esconderMenu );
