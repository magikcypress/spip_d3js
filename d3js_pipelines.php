<?php
/**
 * Utilisations de pipelines par d3js
 *
 * @plugin     d3js
 * @copyright  2015
 * @author     cyp
 * @licence    GNU/GPL
 * @package    SPIP\D3js\Pipelines
 */

if (!defined('_ECRIRE_INC_VERSION')) return;

/**
 * Ajout des scripts de d3js dans le head des pages publiques
 *
 *
 * @pipeline jquery_plugins
 */
function d3js_jquery_plugins($tableau){
		$tableau[] = 'javascript/d3.js';
		$tableau[] = 'javascript/d3pie.js';
		$tableau[] = 'javascript/d3-legend.js';
		$tableau[] = 'javascript/table2d3js.js';
	return $tableau;
}

/**
 * Ajoute les css pour d3js chargées dans le privé
 * 
 * @param string $flux Contenu du head HTML concernant les CSS
 * @return string       Contenu du head HTML concernant les CSS
 */
function d3js_header_prive_css($flux) {

	$css = find_in_path('css/d3js.css');
	$flux .= "<link rel='stylesheet' type='text/css' media='all' href='".direction_css($css)."' />\n";

	return $flux;
}

/**
 * Ajoute les css pour d3js chargées dans le public
 * 
 * @param string $flux Contenu du head HTML concernant les CSS
 * @return string       Contenu du head HTML concernant les CSS
**/
function d3js_insert_head_css($flux) {
	$css = find_in_path('css/d3js.css');
	$flux .= '<link rel="stylesheet" href="'.direction_css($css).'" type="text/css" media="all" />';

	return $flux;
}

?>