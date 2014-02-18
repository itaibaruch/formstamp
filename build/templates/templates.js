angular.module('angular-w', []).run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('/templates/calendar.html',
    "<div class=\"w-calendar\" data-ng-switch=\"selectionMode\">\n" +
    "  <div data-ng-switch-when=\"year\">\n" +
    "    <div class=\"w-calendar-header\">\n" +
    "      <span class=\"w-calendar-prev\" data-ng-click=\"prevYearRange()\"></span>\n" +
    "      <span class=\"w-calendar-title\" data-ng-click=\"switchSelectionMode()\">\n" +
    "        {{years[0]}}-{{years[years.length-1]}}\n" +
    "      </span>\n" +
    "      <span class=\"w-calendar-next\" data-ng-click=\"nextYearRange()\"></span>\n" +
    "    </div>\n" +
    "    <table class=\"table-condensed\">\n" +
    "      <tr data-ng-repeat=\"yearGroup in yearGroups\">\n" +
    "        <td data-ng-repeat=\"year in yearGroup\"\n" +
    "            data-ng-click=\"selectYear(year)\"\n" +
    "            data-ng-class=\"{'active': year == selectedYear}\"\n" +
    "            class=\"year\">\n" +
    "          {{year}}\n" +
    "        </td>\n" +
    "      </tr>\n" +
    "    </table>\n" +
    "  </div>\n" +
    "  <div data-ng-switch-when=\"month\">\n" +
    "    <div class=\"w-calendar-header\">\n" +
    "      <span class=\"w-calendar-prev\" data-ng-click=\"prevYear()\"></span>\n" +
    "      <span class=\"w-calendar-title\" data-ng-click=\"switchSelectionMode()\">\n" +
    "        {{selectedYear}}\n" +
    "      </span>\n" +
    "      <span class=\"w-calendar-next\" data-ng-click=\"nextYear()\"></span>\n" +
    "    </div>\n" +
    "    <table class=\"table-condensed\">\n" +
    "      <tr data-ng-repeat=\"monthGroup in monthGroups\">\n" +
    "        <td data-ng-repeat=\"month in monthGroup\"\n" +
    "            data-ng-click=\"selectMonth(month)\"\n" +
    "            data-ng-class=\"{'active': month == selectedMonth && isSameYear()}\"\n" +
    "            class=\"month\">\n" +
    "          {{month}}\n" +
    "        </td>\n" +
    "      </tr>\n" +
    "    </table>\n" +
    "  </div>\n" +
    "  <div data-ng-switch-default>\n" +
    "    <div class=\"w-calendar-header\">\n" +
    "      <span class=\"w-calendar-prev\" data-ng-click=\"prevMonth()\"></span>\n" +
    "      <span class=\"w-calendar-title\" data-ng-click=\"switchSelectionMode()\">\n" +
    "        {{selectedMonth + ', ' + selectedYear}}\n" +
    "      </span>\n" +
    "      <span class=\"w-calendar-next\" data-ng-click=\"nextMonth()\"></span>\n" +
    "    </div>\n" +
    "    <table class=\"table-condensed\">\n" +
    "      <thead>\n" +
    "      <tr>\n" +
    "        <th data-ng-repeat=\"weekDay in weekDays\">\n" +
    "          {{weekDay}}\n" +
    "        </th>\n" +
    "      </tr>\n" +
    "      </thead>\n" +
    "      <tbody>\n" +
    "      <tr data-ng-repeat=\"week in weeks\">\n" +
    "        <td data-ng-repeat=\"day in week\" class=\"day\"\n" +
    "            data-ng-class=\"{'day-in-selected-month': isDayInSelectedMonth(day),\n" +
    "                       'day-current': isCurrentDate(day),\n" +
    "                       'active': isSelectedDate(day)}\"\n" +
    "            data-ng-click=\"selectDay(day)\">\n" +
    "          {{day.getDate()}}\n" +
    "        </td>\n" +
    "      </tr>\n" +
    "      </tbody>\n" +
    "    </table>\n" +
    "  </div>\n" +
    "</div>\n"
  );


  $templateCache.put('/templates/checkbox.html',
    "<<<<<<< HEAD\n" +
    "<div class='w-racheck'>\n" +
    "  <div ng-repeat='item in shownItems track by item.id'>\n" +
    "    <a class=\"w-racheck-item\" ng-click=\"toggle(item)\" href='javascript:void(0)' >\n" +
    "      <span class=\"w-check-outer\"><span ng-show=\"isSelected(item)\" class=\"w-check-inner\"></span></span>\n" +
    "      {{item[valueAttr]}}\n" +
    "    </a>\n" +
    "=======\n" +
    "<div class='w-checkbox'>\n" +
    "  <div class='checkbox' ng-repeat='item in shownItems track by item.id' ng-class=\"{'w-checkbox-inline': inline}\">\n" +
    "    <label ng-click='toggle(item)'>\n" +
    "      <a href='javascript:void(0)'\n" +
    "         class='w-checkbox-item-container'\n" +
    "         w-space='toggleOnSpace($event, item)'>\n" +
    "        <span ng-disabled='disabled'\n" +
    "              class=\"w-checkbox-item-container-sign w-checkbox-icon\"\n" +
    "              ng-class=\"{'w-checkbox-icon-checked': hasItem(item), 'w-checkbox-icon-unchecked': !hasItem(item)}\">&nbsp;</span>\n" +
    "        {{item[valueAttr]}}\n" +
    "      </a>\n" +
    "    </label>\n" +
    ">>>>>>> fix focus for checkbox and radio; keyboard\n" +
    "  </div>\n" +
    "  <p ng-repeat='error in errors' class='text-danger'>{{error}}</p>\n" +
    "</div>\n"
  );


  $templateCache.put('/templates/chz.html',
    "<div class='w-chz'>\n" +
    "  <div ng-hide=\"active\" class=\"w-chz-sel\" ng-class=\"{'btn-group': selectedItem}\">\n" +
    "      <a class=\"btn btn-default w-chz-active\"\n" +
    "         ng-class='{\"btn-danger\": invalid}'\n" +
    "         href=\"javascript:void(0)\"\n" +
    "         ng-click=\"active=true\"\n" +
    "         w-focus='focus'\n" +
    "         ng-disabled=\"disabled\"\n" +
    "         ng-blur='focus=false'>\n" +
    "         <span ng-show='selectedItem'>{{ getSelectedLabel() }}</span>\n" +
    "         <span ng-hide='selectedItem'>none</span>\n" +
    "      </a>\n" +
    "      <button type=\"button\"\n" +
    "              class=\"btn btn-default w-chz-clear-btn\"\n" +
    "              aria-hidden=\"true\"\n" +
    "              ng-show='selectedItem'\n" +
    "              ng-click='reset()'>&times;</button>\n" +
    "    </div>\n" +
    "  <div class=\"open\" ng-if=\"active\">\n" +
    "    <input class=\"form-control\"\n" +
    "           w-down='move(1)'\n" +
    "           w-up='move(-1)'\n" +
    "           w-pgup='onPgup($event)'\n" +
    "           w-pgdown='onPgdown($event)'\n" +
    "           w-enter='onEnter($event)'\n" +
    "           w-tab='onTab()'\n" +
    "           w-esc='onEsc()'\n" +
    "           w-focus=\"active\"\n" +
    "           type=\"search\"\n" +
    "           placeholder='Search'\n" +
    "           ng-model=\"search\" />\n" +
    "    <ul class=\"dropdown-menu w-chz-items-list-default w-chz-items-list\"\n" +
    "        role=\"menu\"\n" +
    "        ng-show=\"shownItems.length\">\n" +
    "       <li ng-repeat=\"item in shownItems\"\n" +
    "           ng-class=\"{active: isActive(item)}\">\n" +
    "         <a ng-click=\"selection(item)\"\n" +
    "            href=\"javascript:void(0)\"\n" +
    "            id='{{item[keyAttr]}}'\n" +
    "            tabindex='-1'>{{ getItemLabel(item) }}</a>\n" +
    "       </li>\n" +
    "    </ul>\n" +
    "  </div>\n" +
    "  <!-- FIXME: why errors here -->\n" +
    "  <p ng-repeat='error in errors' class='text-danger'>{{error}}</p>\n" +
    "</div>\n"
  );


  $templateCache.put('/templates/datepicker.html',
    "<span>\n" +
    "  <input type=\"text\"\n" +
    "    class=\"form-control\"\n" +
    "    ng-focus=\"active=true\"\n" +
    "    data-ng-model=\"date\"\n" +
    "    ng-change=\"dateSelection()\"\n" +
    "    data-date-format=\"shortDate\">\n" +
    "  <div ng-if=\"active\" class=\"open\">\n" +
    "    <div class=\"dropdown-menu\">\n" +
    "      <w-calendar ng-model=\"date\"\n" +
    "        ng-change=\"console.log('here');active=false;\"/>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</span>\n"
  );


  $templateCache.put('/templates/field.html',
    "<div class='form-group'\n" +
    "  ng-class='{\"has-error\": validationErrors.length > 0}'>\n" +
    "  <label for='{{field}}' class='col-sm-2 control-label'>{{label}}</label>\n" +
    "  <div class='col-sm-10'>\n" +
    "    <div class='w-field-input'\n" +
    "         items='items'\n" +
    "         invalid='validationErrors.length > 0'\n" +
    "         ng-model='object[field]'></div>\n" +
    "    <div>\n" +
    "      <p class='text-danger' ng-repeat='message in validationErrors'>\n" +
    "        <span>{{message}}</span>\n" +
    "      </p>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "\n"
  );


  $templateCache.put('/templates/multi-select.html',
    "<div class='w-multi-select'>\n" +
    "  <div class=\"w-multi-options\" ng-if=\"selectedItems.length > 0\">\n" +
    "    <a ng-repeat='selectedItem in selectedItems' class=\"btn\" ng-click=\"deselect(selectedItem)\">\n" +
    "      {{ getItemLabel(selectedItem) }}\n" +
    "      <span class=\"glyphicon glyphicon-remove\" ></span>\n" +
    "    </a>\n" +
    "  </div>\n" +
    "  <!-- FIXME: why not use existing control -->\n" +
    "  <input ng-keydown=\"onkeys($event)\"\n" +
    "         ng-focus=\"active=true\"\n" +
    "         w-down='move(1)'\n" +
    "         w-up='move(-1)'\n" +
    "         w-pgup='onPgup($event)'\n" +
    "         w-pgdown='onPgdown($event)'\n" +
    "         w-enter='onEnter($event)'\n" +
    "         w-tab='onTab()'\n" +
    "         w-esc='onEsc()'\n" +
    "         w-focus=\"active\"\n" +
    "         ng-blur=\"deactivate()\"\n" +
    "         class=\"form-control\"\n" +
    "         type=\"text\"\n" +
    "         placeholder='Search'\n" +
    "         ng-model=\"search\" />\n" +
    "  <div ng-if=\"active && shownItems.length > 0\" class=\"open\">\n" +
    "    <ul class=\"dropdown-menu w-multi-select-items-list-default w-multi-select-items-list\"\n" +
    "        role=\"menu\" >\n" +
    "      <li ng-repeat=\"item in shownItems\"\n" +
    "          ng-class=\"{true: 'active'}[item == activeItem]\">\n" +
    "        <a ng-click=\"selection(item)\"\n" +
    "           href=\"javascript:void(0)\"\n" +
    "           id='{{item[keyAttr]}}'\n" +
    "           tabindex='-1'>{{ getItemLabel(item) }}</a>\n" +
    "      </li>\n" +
    "    </ul>\n" +
    "  </div>\n" +
    "  <p ng-repeat='error in errors' class='text-danger'>{{error}}</p>\n" +
    "</div>\n"
  );


  $templateCache.put('/templates/radio.html',
    "<<<<<<< HEAD\n" +
    "<div class='w-racheck'>\n" +
    "  <div ng-repeat='item in shownItems'>\n" +
    "  <a class=\"w-racheck-item\" ng-click=\"toggle(item)\" href='javascript:void(0)' >\n" +
    "    <span class=\"w-radio-outer\"><span ng-show=\"isSelected(item)\" class=\"w-radio-inner\"></span></span>\n" +
    "    {{item[valueAttr]}}\n" +
    "  </a>\n" +
    "=======\n" +
    "<div class='w-radio'>\n" +
    "  <div class='radio' ng-repeat='item in shownItems' ng-class=\"{'w-radio-inline': inline}\">\n" +
    "    <label ng-click='selection(item)'>\n" +
    "      <a href='javascript:void(0)'\n" +
    "         tabindex='{{ $first ? 0 : -1 }}'\n" +
    "         class='w-radio-item-container'\n" +
    "         w-down='move($event, +1)'\n" +
    "         w-up='move($event, -1)'>\n" +
    "        <span ng-disabled='disabled'\n" +
    "              class=\"w-radio-item-container-sign w-radio-icon\"\n" +
    "              ng-class=\"{'w-radio-icon-checked': isSelected(item), 'w-radio-icon-unchecked': !isSelected(item)}\">&nbsp;</span>\n" +
    "        {{item[valueAttr]}}\n" +
    "      </a>\n" +
    "    </label>\n" +
    ">>>>>>> fix focus for checkbox and radio; keyboard\n" +
    "  </div>\n" +
    "  <p ng-repeat='error in errors' class='text-danger'>{{error}}</p>\n" +
    "</div>\n" +
    "\n" +
    "\n"
  );


  $templateCache.put('/templates/submit_field.html',
    "<div class=\"form-group\">\n" +
    "  <div class=\"col-sm-offset-2 col-sm-10\">\n" +
    "    <button type=\"submit\" class=\"btn btn-default\" ng-transclude></button>\n" +
    "  </div>\n" +
    "</div>\n"
  );

}]);
