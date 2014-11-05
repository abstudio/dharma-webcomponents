<?
Class DHARMA_WEBCOMPONENTS_HIGHLIGHT extends DWebComponent {

	protected function install(&$app, $model) {
		dharma()->primaryApplication()->bower('jquery', 'bower install jquery')
			->autoconnect();
		dharma()->primaryApplication()->bower('highlightjs', 'bower install highlightjs')
			->autoconnect()
			->requireCss('styles/'.(isset($model['attributes']['theme']) ? $model['attributes']['theme'] : 'default').'.css');
		
		dharma()->primaryApplication()->addScript('$(document).ready(function() { $("pre code").each(function(i, e) { hljs.highlightBlock(e)});});');
	}

	public function controller(&$app, $model) {
		# Parse template
		return $app->parse($this->asset('template.php', Array(
			'model' => &$model
		)));
	}
}
?>