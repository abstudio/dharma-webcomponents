<?
Class DHARMA_WEBCOMPONENTS_AUTOTEXTAREA extends DWebComponent {

	protected function install(&$app, $model) {
		dharma()->primaryApplication()->bpackage($this->local('assets/components/autotextarea/'), '')
			->autoconnect();
		dharma()->primaryApplication()->addScript('$(document).ready(function() { 
			$("textarea[dharma-web-component=autotextarea]").autotextarea();
		});');
	}

	public function controller(&$app, $model) {
		# Parse template			
		return $app->parse($this->asset('template.php', Array(
			'model' => &$model
		)));
	}
}
?>