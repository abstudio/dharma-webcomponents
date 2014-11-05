<?
Class DHARMA_WEBCOMPONENTS_FILEMANAGER extends DWebComponent {

	protected function install(&$app, $model) {
		dharma()->primaryApplication()->bower('jquery.fitimage', 'bower install jquery.fitimage')
			->autoconnect();
		dharma()->primaryApplication()->bpackage($this->local('assets/components/filemanager/'), '')
			->autoconnect();
		
	}

	public function controller(&$app, $model) {
		# Generate id
		$model['id'] = !isset($model['attributes']['id'] ) ? 'fm'.rand(11111111,99999999999) : $model['attributes']['id'];
		$connector = isset($model['attributes']['connector']) ? $model['attributes']['connector'] : '';
		
		# Search for script tag
		$script = '{}';
		$import = str_get_html($model['content']);
		if (!$import) return '';

		if ($import->find(">script", 0)) {
				foreach($import->find(">script") as $element) {
					
					/* Конвертируем shd-элемент в dxhtml node */
					$case = dharma()->services->dxhtml->SHDtoDXHTMLNode($element);
					
					/* Парсим Javascript */
					$script = $app->parse($case->content);
					
				}
		}

		dharma()->primaryApplication()->addScript('$(document).ready(function() { 
			
			var options = (function() {
				var id = "'.$model['id'].'";
				'.$script.'
			})();
			
			$("div[data-id='.$model['id'].']").filemanager($.extend({
				connector: "'.$connector.'"
			}, options || {}));
		});');
		
		# Parse template
		return $app->parse($this->asset('template.php', Array(
			'model' => &$model
		)));
	}
}
?>