<?php
namespace Plugins\Areanet_Stats;

use Areanet\PIM\Classes\Plugin;

class StatsPlugin extends Plugin
{

    public function init(){

        $this->useORM();
        $this->useFrontend();

        $this->addBlock('INDEX_NAVIGATION_ADMIN_SUB_PREPEND', '/blocks/navigation.html');

        $this->addRoute('/areanetstats', 'views/stats.html', 'AreanetStatsCtrl');
        $this->addJSFile('scripts/stats.controller.js');

        $this->addCSSFile('/styles/plugin.css');

    }

}
