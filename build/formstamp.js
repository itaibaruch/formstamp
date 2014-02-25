var addValidations, comp, filter, getComputedStyleFor, indexOf, innerHeightOf, scrollToTarget;

comp = function(a, b) {
  return ("" + a).toLowerCase().indexOf(b.toString().toLowerCase()) > -1;
};

filter = function(x, xs, valueAttr) {
  if (x) {
    return xs.filter(function(i) {
      var item;
      item = valueAttr ? i[valueAttr] : i;
      return comp(item, x);
    });
  } else {
    return xs;
  }
};

indexOf = function(array, elem) {
  var index, _i, _ref;
  for (index = _i = 0, _ref = array.length - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; index = 0 <= _ref ? ++_i : --_i) {
    if (angular.equals(array[index], elem)) {
      return index;
    }
  }
  return -1;
};

getComputedStyleFor = function(elem, prop) {
  return parseInt(window.getComputedStyle(elem, null).getPropertyValue(prop));
};

innerHeightOf = function(elem) {
  return elem.clientHeight - getComputedStyleFor(elem, 'padding-top') - getComputedStyleFor(elem, 'padding-bottom');
};

scrollToTarget = function(container, target) {
  var item, viewport;
  if (!(container && target)) {
    return;
  }
  viewport = {
    top: container.scrollTop,
    bottom: container.scrollTop + innerHeightOf(container)
  };
  item = {
    top: target.offsetTop,
    bottom: target.offsetTop + target.offsetHeight
  };
  if (item.bottom > viewport.bottom) {
    return container.scrollTop += item.bottom - viewport.bottom;
  } else if (item.top < viewport.top) {
    return container.scrollTop -= viewport.top - item.top;
  }
};

addValidations = function(attrs, ctrl) {
  var match, maxLengthValidator, maxlength, minLengthValidator, minlength, pattern, patternValidator, validate, validateRegex;
  validate = function(ctrl, validatorName, validity, value) {
    ctrl.$setValidity(validatorName, validity);
    if (validity) {
      return value;
    } else {
      return void 0;
    }
  };
  if (attrs.ngMinlength) {
    minlength = parseInt(attrs.ngMinlength);
    minLengthValidator = function(value) {
      return validate(ctrl, 'minlength', ctrl.$isEmpty(value) || value.length >= minlength, value);
    };
    ctrl.$formatters.push(minLengthValidator);
    ctrl.$parsers.push(minLengthValidator);
  }
  if (attrs.ngMaxlength) {
    maxlength = parseInt(attrs.ngMaxlength);
    maxLengthValidator = function(value) {
      return validate(ctrl, 'maxlength', ctrl.$isEmpty(value) || value.length <= maxlength, value);
    };
    ctrl.$formatters.push(maxLengthValidator);
    ctrl.$parsers.push(maxLengthValidator);
  }
  if (attrs.ngPattern) {
    pattern = attrs.ngPattern;
    validateRegex = function(regexp, value) {
      return validate(ctrl, 'pattern', ctrl.$isEmpty(value) || regexp.test(value), value);
    };
    match = pattern.match(/^\/(.*)\/([gim]*)$/);
    if (match) {
      pattern = new RegExp(match[1], match[2]);
      patternValidator = function(value) {
        return validateRegex(pattern, value);
      };
    } else {
      patternValidator = function(value) {
        var patternObj;
        patternObj = scope.$eval(pattern);
        if (!patternObj || !patternObj.test) {
          throw minErr('ngPattern')('noregexp', 'Expected {0} to be a RegExp but was {1}. Element: {2}', pattern, patternObj, startingTag(element));
        }
        return validateRegex(patternObj, value);
      };
    }
    ctrl.$formatters.push(patternValidator);
    return ctrl.$parsers.push(patternValidator);
  }
};

angular.module('formstamp', []).run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('/templates/calendar.html',
    "<div class=\"fs-calendar\" data-ng-switch=\"selectionMode\">\n" +
    "  <div data-ng-switch-when=\"year\">\n" +
    "    <div class=\"fs-calendar-header\">\n" +
    "      <span class=\"fs-calendar-prev\" data-ng-click=\"prevYearRange()\"></span>\n" +
    "      <span class=\"fs-calendar-title\" data-ng-click=\"switchSelectionMode()\">\n" +
    "        {{years[0]}}-{{years[years.length-1]}}\n" +
    "      </span>\n" +
    "      <span class=\"fs-calendar-next\" data-ng-click=\"nextYearRange()\"></span>\n" +
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
    "    <div class=\"fs-calendar-header\">\n" +
    "      <span class=\"fs-calendar-prev\" data-ng-click=\"prevYear()\"></span>\n" +
    "      <span class=\"fs-calendar-title\" data-ng-click=\"switchSelectionMode()\">\n" +
    "        {{selectedYear}}\n" +
    "      </span>\n" +
    "      <span class=\"fs-calendar-next\" data-ng-click=\"nextYear()\"></span>\n" +
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
    "    <div class=\"fs-calendar-header\">\n" +
    "      <span class=\"fs-calendar-prev\" data-ng-click=\"prevMonth()\"></span>\n" +
    "      <span class=\"fs-calendar-title\" data-ng-click=\"switchSelectionMode()\">\n" +
    "        {{selectedMonth + ', ' + selectedYear}}\n" +
    "      </span>\n" +
    "      <span class=\"fs-calendar-next\" data-ng-click=\"nextMonth()\"></span>\n" +
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


  $templateCache.put('/templates/datepicker.html',
    "<div class=\"fs-datepicker\">\n" +
    "  <input type=\"text\"\n" +
    "    class=\"form-control\"\n" +
    "    ng-focus=\"active=true\"\n" +
    "    data-ng-model=\"date\"\n" +
    "    ng-change=\"dateSelection()\"\n" +
    "    data-date-format=\"shortDate\">\n" +
    "  <div ng-if=\"active\" class=\"open\">\n" +
    "    <div class=\"dropdown-menu\">\n" +
    "      <fs-calendar ng-model=\"date\"\n" +
    "        ng-change=\"console.log('here');active=false;\"/>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n"
  );


  $templateCache.put('/templates/field.html',
    "<div class='form-group'\n" +
    "  ng-class='{\"has-error\": validationErrors.length > 0}'>\n" +
    "  <label for='{{field}}' class='col-sm-2 control-label'>{{label}}</label>\n" +
    "  <div class='col-sm-10'>\n" +
    "    <div class='fs-field-input'\n" +
    "         items='items'\n" +
    "         invalid='validationErrors.length > 0'\n" +
    "         ng-model='object[field]'></div>\n" +
    "    <div>\n" +
    "    <p class='text-danger' ng-repeat='message in validationErrors'>\n" +
    "      <span>{{message}}</span>\n" +
    "    </p>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "\n"
  );


  $templateCache.put('/templates/list.html',
    "<div class=\"dropdown open fs-list\">\n" +
    "  <ul class=\"dropdown-menu\"\n" +
    "      role=\"menu\" >\n" +
    "    <li ng-repeat=\"item in items\"\n" +
    "        ng-class=\"{true: 'active'}[$index == highlightIndex]\">\n" +
    "      <a ng-click=\"highlightItem(item)\"\n" +
    "         href=\"javascript:void(0)\"\n" +
    "         tabindex='-1'>\n" +
    "         <span ng-transclude></span>\n" +
    "       </a>\n" +
    "    </li>\n" +
    "  </ul>\n" +
    "</div>\n"
  );


  $templateCache.put('/templates/submit_field.html',
    "<div class=\"form-group\">\n" +
    "  <div class=\"col-sm-offset-2 col-sm-10\">\n" +
    "    <button type=\"submit\" class=\"btn btn-default\" ng-transclude></button>\n" +
    "  </div>\n" +
    "</div>\n"
  );

}]);

(function() {
  var shiftWeekDays;

  shiftWeekDays = function(weekDays, firstDayOfWeek) {
    var weekDaysHead;
    weekDaysHead = weekDays.slice(firstDayOfWeek, weekDays.length);
    return weekDaysHead.concat(weekDays.slice(0, firstDayOfWeek));
  };

  angular.module('formstamp').directive('fsCalendar', [
    '$locale', function($locale) {
      return {
        restrict: 'E',
        templateUrl: '/templates/calendar.html',
        replace: true,
        require: '?ngModel',
        scope: {},
        controller: [
          '$scope', '$attrs', function($scope, $attrs) {
            var addDays, currentTime, i, updateSelectionRanges;
            $scope.selectionMode = 'day';
            $scope.months = $locale.DATETIME_FORMATS.SHORTMONTH;
            currentTime = new Date();
            $scope.currentDate = new Date(currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDate());
            $scope.selectedYear = $scope.currentDate.getFullYear();
            $scope.selectedMonth = $scope.months[$scope.currentDate.getMonth()];
            $scope.monthGroups = (function() {
              var _i, _results;
              _results = [];
              for (i = _i = 0; _i <= 2; i = ++_i) {
                _results.push($scope.months.slice(i * 4, i * 4 + 4));
              }
              return _results;
            })();
            $scope.prevMonth = function() {
              var month;
              month = indexOf($scope.months, $scope.selectedMonth) - 1;
              if (month < 0) {
                month = $scope.months.length - 1;
                $scope.selectedYear--;
              }
              return $scope.selectedMonth = $scope.months[month];
            };
            $scope.nextMonth = function() {
              var month;
              month = indexOf($scope.months, $scope.selectedMonth) + 1;
              if (month >= $scope.months.length) {
                month = 0;
                $scope.selectedYear++;
              }
              return $scope.selectedMonth = $scope.months[month];
            };
            $scope.prevYear = function() {
              return $scope.selectedYear--;
            };
            $scope.nextYear = function() {
              return $scope.selectedYear++;
            };
            $scope.prevYearRange = function() {
              var rangeSize, _i, _ref, _ref1, _results;
              rangeSize = $scope.years.length;
              return $scope.years = (function() {
                _results = [];
                for (var _i = _ref = $scope.years[0] - rangeSize, _ref1 = $scope.years[$scope.years.length - 1] - rangeSize; _ref <= _ref1 ? _i <= _ref1 : _i >= _ref1; _ref <= _ref1 ? _i++ : _i--){ _results.push(_i); }
                return _results;
              }).apply(this);
            };
            $scope.nextYearRange = function() {
              var rangeSize, _i, _ref, _ref1, _results;
              rangeSize = $scope.years.length;
              return $scope.years = (function() {
                _results = [];
                for (var _i = _ref = $scope.years[0] + rangeSize, _ref1 = $scope.years[$scope.years.length - 1] + rangeSize; _ref <= _ref1 ? _i <= _ref1 : _i >= _ref1; _ref <= _ref1 ? _i++ : _i--){ _results.push(_i); }
                return _results;
              }).apply(this);
            };
            $scope.switchSelectionMode = function() {
              return $scope.selectionMode = (function() {
                switch ($scope.selectionMode) {
                  case 'day':
                    return 'month';
                  case 'month':
                    return 'year';
                  default:
                    return 'day';
                }
              })();
            };
            $scope.isDayInSelectedMonth = function(day) {
              return day.getFullYear() === $scope.selectedYear && $scope.months[day.getMonth()] === $scope.selectedMonth;
            };
            $scope.isCurrentDate = function(day) {
              var _ref;
              return day.getTime() === ((_ref = $scope.currentDate) != null ? _ref.getTime() : void 0);
            };
            $scope.isSelectedDate = function(day) {
              var _ref;
              return day.getTime() === ((_ref = $scope.selectedDate) != null ? _ref.getTime() : void 0);
            };
            addDays = function(date, days) {
              return new Date(date.getFullYear(), date.getMonth(), date.getDate() + days);
            };
            updateSelectionRanges = function() {
              var day, dayOffset, firstDayOfMonth, firstDayOfWeek, monthIndex, week, _i, _ref, _ref1, _results;
              monthIndex = indexOf($scope.months, $scope.selectedMonth);
              firstDayOfMonth = new Date($scope.selectedYear, monthIndex);
              dayOffset = $scope.firstDayOfWeek - firstDayOfMonth.getDay();
              if (dayOffset > 0) {
                dayOffset -= 7;
              }
              firstDayOfWeek = addDays(firstDayOfMonth, dayOffset);
              $scope.weeks = (function() {
                var _i, _results;
                _results = [];
                for (week = _i = 0; _i <= 5; week = ++_i) {
                  _results.push((function() {
                    var _j, _results1;
                    _results1 = [];
                    for (day = _j = 0; _j <= 6; day = ++_j) {
                      _results1.push(addDays(firstDayOfWeek, 7 * week + day));
                    }
                    return _results1;
                  })());
                }
                return _results;
              })();
              return $scope.years = (function() {
                _results = [];
                for (var _i = _ref = $scope.selectedYear - 5, _ref1 = $scope.selectedYear + 6; _ref <= _ref1 ? _i <= _ref1 : _i >= _ref1; _ref <= _ref1 ? _i++ : _i--){ _results.push(_i); }
                return _results;
              }).apply(this);
            };
            $scope.$watch('selectedDate', function() {
              if ($scope.selectedDate != null) {
                $scope.selectedYear = $scope.selectedDate.getFullYear();
                return $scope.selectedMonth = $scope.months[$scope.selectedDate.getMonth()];
              }
            });
            $scope.$watch('selectedMonth', updateSelectionRanges);
            $scope.$watch('selectedYear', updateSelectionRanges);
            $scope.$watch('years', function() {
              return $scope.yearGroups = (function() {
                var _i, _results;
                _results = [];
                for (i = _i = 0; _i <= 3; i = ++_i) {
                  _results.push($scope.years.slice(i * 4, i * 4 + 4));
                }
                return _results;
              })();
            });
            $scope.firstDayOfWeek = parseInt($attrs.firstDayOfWeek || 0);
            return $scope.weekDays = shiftWeekDays($locale.DATETIME_FORMATS.SHORTDAY, $scope.firstDayOfWeek);
          }
        ],
        link: function(scope, element, attrs, ngModel) {
          var parseDate;
          parseDate = function(dateString) {
            var parsedDate, time;
            time = Date.parse(dateString);
            if (!isNaN(time)) {
              parsedDate = new Date(time);
              return new Date(parsedDate.getFullYear(), parsedDate.getMonth(), parsedDate.getDate());
            }
          };
          ngModel.$render = function() {
            return scope.selectedDate = parseDate(ngModel.$modelValue);
          };
          scope.isSameYear = function() {
            var _ref;
            return ((_ref = parseDate(ngModel.$modelValue)) != null ? _ref.getFullYear() : void 0) === scope.selectedYear;
          };
          scope.selectDay = function(day) {
            scope.selectedDate = day;
            return ngModel.$setViewValue(day);
          };
          scope.selectMonth = function(monthName) {
            scope.selectionMode = 'day';
            scope.selectedDate = void 0;
            return scope.selectedMonth = monthName;
          };
          return scope.selectYear = function(year) {
            scope.selectionMode = 'month';
            scope.selectedDate = void 0;
            return scope.selectedYear = year;
          };
        }
      };
    }
  ]);

}).call(this);

(function() {
  angular.module("formstamp").directive("fsCheckbox", [
    '$window', function($window) {
      return {
        restrict: "A",
        scope: {
          disabled: '=',
          required: '=',
          errors: '=',
          items: '=',
          inline: '='
        },
        require: '?ngModel',
        template: function(el, attrs) {
          var itemTpl, template;
          itemTpl = el.html() || 'template me: {{item | json}}';
          return template = "<div class='fs-racheck'>\n  <div ng-repeat='item in items track by item.id'>\n    <a class=\"fs-racheck-item\"\n       href='javascript:void(0)'\n       onclick=\"this.focus()\"\n       ng-click=\"toggle(item)\"\n       fs-space='toggle(item)'>\n      <span class=\"fs-check-outer\"><span ng-show=\"isSelected(item)\" class=\"fs-check-inner\"></span></span>\n      " + itemTpl + "\n    </a>\n  </div>\n  <p ng-repeat='error in errors' class='text-danger'>{{error}}</p>\n</div>";
        },
        controller: function($scope, $element, $attrs) {
          $scope.toggle = function(item) {
            if (!$scope.isSelected(item)) {
              $scope.selectedItems.push(item);
            } else {
              $scope.selectedItems.splice(indexOf($scope.selectedItems, item), 1);
            }
            return false;
          };
          $scope.isSelected = function(item) {
            return indexOf($scope.selectedItems, item) > -1;
          };
          $scope.invalid = function() {
            return ($scope.errors != null) && $scope.errors.length > 0;
          };
          return $scope.selectedItems = [];
        },
        link: function(scope, element, attrs, ngModelCtrl, transcludeFn) {
          var setViewValue;
          if (ngModelCtrl) {
            setViewValue = function(newValue, oldValue) {
              if (!angular.equals(newValue, oldValue)) {
                return ngModelCtrl.$setViewValue(scope.selectedItems);
              }
            };
            scope.$watch('selectedItems', setViewValue, true);
            return ngModelCtrl.$render = function() {
              if (!scope.disabled) {
                return scope.selectedItems = ngModelCtrl.$viewValue || [];
              }
            };
          }
        }
      };
    }
  ]);

}).call(this);

(function() {
  angular.module('formstamp').directive('dateFormat', [
    'dateFilter', function(dateFilter) {
      return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, element, attrs, ngModel) {
          ngModel.$formatters.push(function(value) {
            var date, milis;
            date = angular.isString(value) ? (milis = Date.parse(value), !isNaN(milis) ? new Date(milis) : void 0) : value;
            return dateFilter(date, attrs.dateFormat);
          });
          return ngModel.$parsers.push(function(value) {
            return new Date(value);
          });
        }
      };
    }
  ]);

}).call(this);

(function() {
  angular.module('formstamp').directive('fsDatepicker', [
    'fsPopupManager', function(popupManager) {
      return {
        restrict: 'EA',
        require: '?ngModel',
        scope: {},
        templateUrl: '/templates/datepicker.html',
        replace: true,
        link: function(scope, element, attrs, ngModel) {
          scope.popup = popupManager;
          ngModel.$render = function() {
            return scope.date = ngModel.$modelValue;
          };
          return scope.dateSelection = function() {
            return ngModel.$setViewValue(scope.date);
          };
        }
      };
    }
  ]);

}).call(this);

(function() {
  angular.module('formstamp').directive('fsField', [
    function() {
      var VALIDATION_DIRECTIVES;
      VALIDATION_DIRECTIVES = ['ngRequired', 'ngMinlength', 'ngMaxlength', 'ngPattern', 'ngDisabled'];
      return {
        restrict: 'A',
        replace: true,
        require: ['^fsFormFor', '^form'],
        scope: {
          items: '=',
          field: '@fsField',
          type: '@',
          label: '@'
        },
        templateUrl: '/templates/field.html',
        compile: function(tElement, tAttrs) {
          var inputDiv, inputDivRaw, type;
          type = tAttrs.type;
          inputDivRaw = tElement[0].querySelector('.fs-field-input');
          inputDiv = angular.element(inputDivRaw);
          angular.element(inputDiv).attr(type, '');
          angular.forEach(VALIDATION_DIRECTIVES, function(dir) {
            if (tAttrs[dir]) {
              return inputDiv.attr(tAttrs.$attr[dir], tAttrs[dir]);
            }
          });
          inputDiv.attr('name', tAttrs.fsField);
          return function(scope, element, attrs, ctrls) {
            var formCtrl, formForCtrl;
            formForCtrl = ctrls[0];
            formCtrl = ctrls[1];
            scope.object = formForCtrl.getObject();
            scope.objectName = formForCtrl.getObjectName();
            formCtrl = element.parent().controller('form');
            scope.defaultErrors = {
              'required': 'This field is required!',
              'pattern': 'This field should match pattern!',
              'minlength': 'This field should be longer!',
              'maxlength': 'This field should be shorter!'
            };
            scope.hasErrorFor = function(validityName) {
              return formCtrl[scope.field].$error[validityName];
            };
            return scope.$watch(function() {
              var errs;
              if (!formCtrl.$dirty) {
                return;
              }
              scope.validationErrors = [];
              angular.forEach(scope.defaultErrors, function(value, key) {
                if (scope.hasErrorFor(key)) {
                  return scope.validationErrors.push(value);
                }
              });
              if (scope.object.$error && (errs = scope.object.$error[scope.field])) {
                scope.validationErrors = scope.validationErrors.concat(errs);
              }
              console.log(scope.validationErrors);
            });
          };
        }
      };
    }
  ]);

}).call(this);

(function() {
  angular.module('formstamp').directive('fsFormFor', [
    '$window', function($window) {
      return {
        restrict: 'A',
        require: '?form',
        scope: {
          object: '=fsFormFor'
        },
        compile: function(tElement, tAttrs) {
          tElement.attr('class', 'form-horizontal');
          tElement.attr('role', 'form');
          return function(scope, element, attrs, formController) {
            return $window.addEventListener('beforeunload', function() {
              if (formController.$dirty) {
                return 'You will lose unsaved changes unless you stay on this page';
              }
            });
          };
        },
        controller: function($scope, $element, $attrs) {
          this.getObject = function() {
            return $scope.object;
          };
          this.getObjectName = function() {
            return $attrs.fsFormFor;
          };
        }
      };
    }
  ]);

}).call(this);

(function() {
  var widgetRoot;

  widgetRoot = function(el) {
    var currentEl;
    currentEl = el;
    while (currentEl && (currentEl.className != null) && currentEl.className.indexOf("fs-widget-root") < 0) {
      currentEl = currentEl.parentNode;
    }
    return currentEl;
  };

  angular.module("formstamp").directive("fsInput", [
    '$window', '$timeout', function($window, $timeout) {
      return {
        restrict: "A",
        link: function(scope, element, attrs) {
          var focusElement, fsRoot;
          focusElement = function() {
            return setTimeout((function() {
              return element[0].focus();
            }), 0);
          };
          if (attrs["fsFocusWhen"] != null) {
            scope.$watch(attrs["fsFocusWhen"], function(newValue) {
              if (newValue) {
                return focusElement();
              }
            });
          }
          if (attrs["fsBlurWhen"] != null) {
            scope.$watch(attrs["fsBlurWhen"], function(newValue) {
              if (newValue) {
                return focusElement();
              }
            });
          }
          if (attrs["fsOnFocus"] != null) {
            element.on('focus', function(event) {
              return scope.$apply(attrs["fsOnFocus"]);
            });
          }
          if (attrs["fsOnBlur"] != null) {
            element.on('blur', function(event) {
              return scope.$apply(attrs["fsOnBlur"]);
            });
          }
          if (attrs["fsHoldFocus"] != null) {
            fsRoot = $(element).parents(".fs-widget-root").first();
            return fsRoot.on("mousedown", function(event) {
              if (event.target !== element.get(0)) {
                event.preventDefault();
                return false;
              } else {
                return true;
              }
            });
          }
        }
      };
    }
  ]);

}).call(this);

(function() {
  angular.module("formstamp").directive("fsList", function() {
    return {
      restrict: "A",
      scope: {
        items: '=',
        "class": '@'
      },
      transclude: true,
      replace: true,
      templateUrl: "/templates/list.html",
      link: function($scope, $element, $attrs) {
        var ensureHighlightedItemVisible;
        ensureHighlightedItemVisible = function() {
          var delayedScrollFn;
          delayedScrollFn = function() {
            var li, ul;
            ul = $element.find('ul')[0];
            li = ul.querySelector('li.active');
            return scrollToTarget(ul, li);
          };
          return setTimeout(delayedScrollFn, 0);
        };
        return $scope.$watch('highlightIndex', function(idx) {
          return ensureHighlightedItemVisible();
        });
      },
      controller: function($scope, $element, $attrs, $filter) {
        var updateSelectedItem;
        updateSelectedItem = function(hlIdx) {
          if ($scope.$parent.listInterface != null) {
            return $scope.$parent.listInterface.selectedItem = $scope.items[hlIdx];
          }
        };
        $scope.highlightItem = function(item) {
          $scope.highlightIndex = $scope.items.indexOf(item);
          return $scope.$parent.listInterface.onSelect(item);
        };
        $scope.$watch('items', function(newItems) {
          $scope.highlightIndex = 0;
          return updateSelectedItem(0);
        });
        $scope.$watch('highlightIndex', function(idx) {
          return updateSelectedItem(idx);
        });
        $scope.move = function(d) {
          var items;
          items = $scope.items;
          $scope.highlightIndex += d;
          if ($scope.highlightIndex === -1) {
            $scope.highlightIndex = items.length - 1;
          }
          if ($scope.highlightIndex >= items.length) {
            return $scope.highlightIndex = 0;
          }
        };
        $scope.highlightIndex = 0;
        if ($scope.$parent.listInterface != null) {
          return $scope.$parent.listInterface.move = function(delta) {
            return $scope.move(delta);
          };
        }
      }
    };
  });

}).call(this);

(function() {
  var difference, hash_key;

  hash_key = function(item) {
    return angular.toJson(item);
  };

  difference = function(a, b) {
    var b_element, hash, _i, _len;
    if (!(b && a)) {
      return a;
    }
    hash = {};
    for (_i = 0, _len = b.length; _i < _len; _i++) {
      b_element = b[_i];
      hash[hash_key(b_element)] = true;
    }
    return a.filter((function(a_element) {
      return !hash[hash_key(a_element)];
    }));
  };

  angular.module('formstamp').filter('exclude', function() {
    return function(input, selected) {
      return input.filter(function(item) {
        return selected.indexOf(item) < 0;
      });
    };
  });

  angular.module("formstamp").directive("fsMultiselect", [
    '$window', function($window) {
      return {
        restrict: "A",
        scope: {
          invalid: '=',
          items: '=',
          keyAttr: '@',
          valueAttr: '@',
          disabled: '@',
          freetext: '@',
          "class": '@'
        },
        require: '?ngModel',
        replace: true,
        transclude: true,
        templateUrl: "/templates/multiselect.html",
        controller: function($scope, $element, $attrs, $filter) {
          var keyAttr, valueAttr;
          if ($scope.freetext) {
            $scope.getItemLabel = function(item) {
              return item;
            };
            $scope.getItemValue = function(item) {
              return item;
            };
            $scope.dynamicItems = function() {
              if ($scope.search) {
                return [$scope.search];
              } else {
                return [];
              }
            };
          } else {
            valueAttr = function() {
              return $scope.valueAttr || "label";
            };
            keyAttr = function() {
              return $scope.valueAttr || "id";
            };
            $scope.getItemLabel = function(item) {
              return item && item[valueAttr()];
            };
            $scope.getItemValue = function(item) {
              return item && item[keyAttr()];
            };
            $scope.dynamicItems = function() {
              return [];
            };
          }
          $scope.dropdownItems = function() {
            var allItems, excludeFilter, searchFilter;
            searchFilter = $filter('filter');
            excludeFilter = $filter('exclude');
            allItems = $scope.items.concat($scope.dynamicItems());
            return searchFilter(excludeFilter(allItems, $scope.selectedItems), $scope.search);
          };
          $scope.selectItem = function(item) {
            if ((item != null) && indexOf($scope.selectedItems, item) === -1) {
              $scope.selectedItems.push(item);
            }
            $scope.search = "";
            return $scope.highlightIndex = 0;
          };
          $scope.unselectItem = function(item) {
            var index;
            index = indexOf($scope.selectedItems, item);
            if (index > -1) {
              return $scope.selectedItems.splice(index, 1);
            }
          };
          $scope.move = function(d) {
            var filteredItems;
            filteredItems = $scope.dropdownItems();
            $scope.highlightIndex += d;
            if ($scope.highlightIndex === -1) {
              $scope.highlightIndex = filteredItems.length - 1;
            }
            if ($scope.highlightIndex >= filteredItems.length) {
              return $scope.highlightIndex = 0;
            }
          };
          $scope.getHighlightedItem = function() {};
          $scope.onEnter = function(event) {
            var highlightedItem;
            highlightedItem = $scope.dropdownItems()[$scope.highlightIndex];
            $scope.selectItem($scope.highlightedItem);
            return false;
          };
          $scope.onPgup = function(event) {
            $scope.move(-11);
            return false;
          };
          $scope.onPgdown = function(event) {
            $scope.move(11);
            return false;
          };
          $scope.$watch('search', function() {
            return $scope.highlightIndex = 0;
          });
          $scope.selectedItems = [];
          $scope.active = false;
          return $scope.highlightIndex = 0;
        },
        link: function($scope, element, attrs, ngModelCtrl, transcludeFn) {
          var setViewValue;
          if (ngModelCtrl) {
            setViewValue = function(newValue, oldValue) {
              if (!angular.equals(newValue, oldValue)) {
                return ngModelCtrl.$setViewValue($scope.selectedItems);
              }
            };
            $scope.$watch('selectedItems', setViewValue, true);
            return ngModelCtrl.$render = function() {
              return $scope.selectedItems = ngModelCtrl.$modelValue || [];
            };
          }
        }
      };
    }
  ]);

}).call(this);

(function() {
  angular.module("formstamp").directive("fsOldFocus", function() {
    var focuz;
    focuz = function(el) {
      return window.setTimeout((function() {
        return el.focus();
      }), 0);
    };
    return {
      link: function(scope, element, attrs) {
        return scope.$watch(attrs.fsFocus, function(fcs) {
          if (fcs != null) {
            return focuz(element[0]);
          }
        });
      }
    };
  });

}).call(this);

(function() {
  angular.module("formstamp").directive("fsOldHoldFocus", function($timeout) {
    var widgetRoot;
    widgetRoot = function(el) {
      var currentEl;
      currentEl = el;
      while (currentEl && (currentEl.className != null) && currentEl.className.indexOf("fs-widget-root") < 0) {
        currentEl = currentEl.parentNode;
      }
      return currentEl;
    };
    return {
      link: function(scope, element, attrs) {
        var focusElement;
        focusElement = function() {
          return setTimeout((function() {
            return element[0].focus();
          }), 0);
        };
        if (attrs["fsHoldFocusWhen"] != null) {
          scope.$watch(attrs["fsHoldFocusWhen"], function(newValue) {
            if (newValue) {
              return focusElement();
            }
          });
        }
        element.on('focus', function(event) {
          return scope.$apply(attrs["fsHoldFocus"]);
        });
        return element.on('blur', function(event) {
          var newWidgetRoot, oldWidgetRoot;
          oldWidgetRoot = widgetRoot(event.srcElement || event.target);
          newWidgetRoot = widgetRoot(event.relatedTarget);
          if (event.relatedTarget && newWidgetRoot !== null && oldWidgetRoot === newWidgetRoot) {
            return focusElement();
          } else {
            return scope.$apply(attrs["fsHoldFocusBlur"]);
          }
        });
      }
    };
  });

}).call(this);

(function() {
  angular.module('formstamp').directive('fsPopup', [
    '$rootScope', "$compile", 'fsPopupManager', function($rootScope, $compile, popupManager) {
      return {
        restrict: 'E',
        compile: function(tElement, tAttrs) {
          var content;
          content = "" + (tElement.html().trim());
          tElement.remove();
          return popupManager.add(tAttrs.name, content);
        }
      };
    }
  ]).factory('fsPopupManager', [
    '$document', '$compile', '$rootScope', function($document, $compile, $rootScope) {
      var attachTo, currentPopup, documentClickBind, popupManager;
      attachTo = void 0;
      currentPopup = void 0;
      documentClickBind = function(event) {
        if (event.target !== attachTo) {
          return $rootScope.$apply(function() {
            return $rootScope.popup.hide();
          });
        }
      };
      popupManager = {
        popups: {},
        add: function(name, popup) {
          return this.popups[name] = popup;
        },
        show: function(name, target) {
          var attachToElement, attachToScope, popupContent, popupElement;
          this.hide();
          popupContent = this.popups[name];
          if (popupContent == null) {
            return;
          }
          attachTo = target;
          attachToElement = angular.element(attachTo);
          attachToScope = attachToElement.scope();
          popupElement = angular.element("<div>" + popupContent + "</div>");
          currentPopup = $compile(popupElement)(attachToScope);
          currentPopup.bind('click', function(event) {
            event.preventDefault();
            return event.stopPropagation();
          });
          attachToElement.after(currentPopup);
          $document.bind('click', documentClickBind);
        },
        hide: function() {
          $document.unbind('click', documentClickBind);
          if (currentPopup != null) {
            currentPopup.remove();
          }
          currentPopup = attachTo = void 0;
        }
      };
      return $rootScope.popup = popupManager;
    }
  ]);

}).call(this);

(function() {
  var directiveFactory, keyCodes;

  keyCodes = {
    Tab: 9,
    ShiftTab: 9,
    Enter: 13,
    Esc: 27,
    Pgup: 33,
    Pgdown: 34,
    Left: 37,
    Up: 38,
    Right: 39,
    Down: 40,
    Space: 32
  };

  directiveFactory = function(keyCode, dirName, shift) {
    return [
      '$parse', function($parse) {
        return {
          restrict: 'A',
          link: function(scope, element, attr) {
            var fn;
            fn = $parse(attr[dirName]);
            return element.on('keydown', function(event) {
              if (event.keyCode === keyCode && event.shiftKey === shift) {
                if (!scope.$apply(function() {
                  return fn(scope, {
                    $event: event
                  });
                })) {
                  return event.preventDefault();
                }
              }
            });
          }
        };
      }
    ];
  };

  angular.forEach(keyCodes, function(keyCode, keyName) {
    var dirName, shift;
    dirName = 'fs' + keyName;
    shift = keyName.indexOf('Shift') !== -1;
    return angular.module('formstamp').directive(dirName, directiveFactory(keyCode, dirName, shift));
  });

}).call(this);

(function() {
  var nextUid, uid;

  uid = ['0', '0', '0'];

  nextUid = function() {
    var digit, index;
    index = uid.length;
    digit;
    while (index) {
      index -= 1;
      digit = uid[index].charCodeAt(0);
      if (digit === 57) {
        uid[index] = 'A';
        return uid.join('');
      }
      if (digit === 90) {
        uid[index] = '0';
      } else {
        uid[index] = String.fromCharCode(digit + 1);
        return uid.join('');
      }
    }
    uid.unshift('0');
    return uid.join('');
  };

  angular.module("formstamp").directive("fsRadio", [
    '$window', function($window) {
      return {
        restrict: "A",
        scope: {
          required: '=',
          disabled: '=',
          items: '=',
          inline: '=',
          keyAttr: '@',
          valueAttr: '@'
        },
        require: '?ngModel',
        template: function(el, attrs) {
          var itemTpl, name, template;
          itemTpl = el.html() || 'template me: {{item | json}}';
          name = nextUid();
          return template = "<div class='fs-racheck'>\n  <div class=\"fs-radio-label\"\n     ng-repeat=\"item in items\" >\n    <input\n     type=\"radio\"\n     ng-model=\"$parent.selectedItem\"\n     name=\"" + name + "\"\n     ng-value=\"item\"\n     id=\"{{item.id}}\"/>\n    <label for=\"{{item.id}}\">\n      " + itemTpl + "\n    </label>\n  </div>\n  <p ng-repeat='error in errors' class='text-danger'>{{error}}</p>\n</div>";
        },
        link: function(scope, element, attrs, ngModelCtrl, transcludeFn) {
          if (ngModelCtrl) {
            scope.$watch('selectedItem', function(newValue, oldValue) {
              if (newValue !== oldValue) {
                return ngModelCtrl.$setViewValue(scope.selectedItem);
              }
            });
            return ngModelCtrl.$render = function() {
              return scope.selectedItem = ngModelCtrl.$modelValue;
            };
          }
        }
      };
    }
  ]);

}).call(this);

(function() {
  angular.module("formstamp").directive("fsSelect", [
    '$compile', function($compile) {
      return {
        restrict: "A",
        scope: {
          items: '=',
          disabled: '@',
          freetext: '@',
          "class": '@'
        },
        require: '?ngModel',
        replace: true,
        template: function(el) {
          var itemTpl, template;
          itemTpl = el.html();
          return template = "<div class='fs-select fs-widget-root'>\n  <div ng-hide=\"active\" class=\"fs-select-sel\" ng-class=\"{'btn-group': item}\">\n      <a class=\"btn btn-default fs-select-active\"\n         ng-class='{\"btn-danger\": invalid}'\n         href=\"javascript:void(0)\"\n         ng-click=\"active = true\"\n         ng-disabled=\"disabled\">\n           <span ng-show='item'>" + itemTpl + "</span>\n           <span ng-hide='item'>none</span>\n      </a>\n      <button type=\"button\"\n              class=\"btn btn-default fs-select-clear-btn\"\n              aria-hidden=\"true\"\n              ng-show='item'\n              ng-click='unselectItem()'>&times;</button>\n    </div>\n  <div class=\"open\" ng-show=\"active\">\n    <input class=\"form-control\"\n           fs-input='123'\n           fs-focus-when='active'\n           fs-on-blur='active = false'\n           fs-hold-focus=''\n\n           fs-down='move(1)'\n           fs-up='move(-1)'\n           fs-pgup='move(-11)'\n           fs-pgdown='move(11)'\n           fs-enter='onEnter($event)'\n           type=\"search\"\n           placeholder='Search'\n           ng-model=\"search\" />\n    <div ng-if=\"active && dropdownItems.length > 0\">\n      <div fs-list items=\"dropdownItems\">\n       " + itemTpl + "\n      </div>\n    </div>\n  </div>\n</div>";
        },
        controller: function($scope, $element, $attrs, $filter, $timeout) {
          var keyAttr, updateDropdown, valueAttr;
          $scope.active = false;
          if ($scope.freetext) {
            $scope.getItemLabel = function(item) {
              return item;
            };
            $scope.getItemValue = function(item) {
              return item;
            };
            $scope.dynamicItems = function() {
              if ($scope.search) {
                return [$scope.search];
              } else {
                return [];
              }
            };
          } else {
            valueAttr = function() {
              return $scope.valueAttr || "label";
            };
            keyAttr = function() {
              return $scope.valueAttr || "id";
            };
            $scope.getItemLabel = function(item) {
              return item && item[valueAttr()];
            };
            $scope.getItemValue = function(item) {
              return item && item[keyAttr()];
            };
            $scope.dynamicItems = function() {
              return [];
            };
          }
          updateDropdown = function() {
            return $scope.dropdownItems = $filter('filter')($scope.items, $scope.search).concat($scope.dynamicItems());
          };
          $scope.$watch('active', function(q) {
            return updateDropdown();
          });
          $scope.$watch('search', function(q) {
            return updateDropdown();
          });
          $scope.selectItem = function(item) {
            $scope.item = item;
            $scope.search = "";
            return $scope.active = false;
          };
          $scope.unselectItem = function(item) {
            return $scope.item = null;
          };
          $scope.onBlur = function() {
            return $timeout((function() {
              return $scope.active = false;
            }), 0, true);
          };
          $scope.move = function(d) {
            return $scope.listInterface.move && $scope.listInterface.move(d);
          };
          $scope.onEnter = function(event) {
            return $scope.selectItem($scope.listInterface.selectedItem);
          };
          return $scope.listInterface = {
            onSelect: function(selectedItem) {
              return $scope.selectItem(selectedItem);
            },
            move: function() {
              return console.log("not-implemented listInterface.move() function");
            }
          };
        },
        link: function(scope, element, attrs, ngModelCtrl, transcludeFn) {
          if (ngModelCtrl) {
            scope.$watch('item', function(newValue, oldValue) {
              if (newValue !== oldValue) {
                return ngModelCtrl.$setViewValue(scope.item);
              }
            });
            return ngModelCtrl.$render = function() {
              return scope.item = ngModelCtrl.$viewValue;
            };
          }
        }
      };
    }
  ]);

}).call(this);

(function() {
  angular.module("formstamp").directive("fsSubmit", [
    '$parse', function($parse) {
      return {
        restrict: "A",
        require: '?form',
        link: function(scope, element, attr, controller) {
          var fn;
          fn = $parse(attr.fsSubmit);
          return element.bind('submit', function(event) {
            return scope.$apply(function() {
              if (!controller || controller.$valid) {
                return fn(scope, {
                  $event: event
                });
              } else {
                return controller.$setDirty();
              }
            });
          });
        }
      };
    }
  ]);

}).call(this);

(function() {
  angular.module('formstamp').directive('fsSubmitField', [
    function() {
      return {
        restrict: 'A',
        replace: true,
        transclude: true,
        templateUrl: '/templates/submit_field.html'
      };
    }
  ]);

}).call(this);
