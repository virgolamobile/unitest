<ul id="toolsList">
	<li ui-sref="poster.slide.editor.tools.text"><?php include('../.././../../../assets/img/icons/tools/svg/quill.svg'); ?></li>
	<li ui-sref="poster.slide.editor.tools.font"><?php include('../.././../../../assets/img/icons/tools/svg/font.svg'); ?></li>
	<li ui-sref="poster.slide.editor.tools.color"><?php include('../.././../../../assets/img/icons/tools/svg/droplet.svg'); ?></li>
	<li ui-sref="poster.slide.editor.tools.image"><?php include('../.././../../../assets/img/icons/tools/svg/image.svg'); ?></li>
	<li ui-sref="poster.slide.editor.tools.wand"><?php include('../.././../../../assets/img/icons/tools/svg/wand.svg'); ?></li>

<!--	
	<li><a id="toolsText" ng-class="{active: tool.active.text}" href="#!/editor/tool/text"><?php include('../assets/img/icons/tools/svg/quill.svg'); ?></a></li>
	<li><a id="toolsFont" ng-class="{active: tool.active.font}" href="#!/editor/tool/font"><?php include('../assets/img/icons/tools/svg/font.svg'); ?></a></li>
	<li><a id="toolsColor" ng-class="{active: tool.active.color}" href="#!/editor/tool/color"><?php include('../assets/img/icons/tools/svg/droplet.svg'); ?></a></li>
	<li><a id="toolsImage" ng-class="{active: tool.active.image}" href="#!/editor/tool/image"><?php include('../assets/img/icons/tools/svg/image.svg'); ?></a></li>
	<li><a id="toolsWand" ng-class="{active: tool.active.wand}" href="#!/editor/tool/wand"><?php include('../assets/img/icons/tools/svg/wand.svg'); ?></a></li>
-->
</ul>

<div ui-view id="toolsContainer"></div>