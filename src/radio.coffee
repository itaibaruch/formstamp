uid = ['0', '0', '0']
# copypaste from angularjs utils
nextUid = ()->
  index = uid.length
  digit

  while index
    index -= 1
    digit = uid[index].charCodeAt(0)
    if digit == 57
      uid[index] = 'A'
      return uid.join('')
    if digit == 90
      uid[index] = '0'
    else
      uid[index] = String.fromCharCode(digit + 1)
      return uid.join('')
  uid.unshift('0')
  uid.join('')


angular
.module("formstamp")
.directive "fsRadio", ['$window', ($window) ->
    restrict: "A"
    scope:
      required: '='
      disabled: '=ngDisabled'
      items: '='
      inline: '='
      keyAttr: '@'
      valueAttr: '@'
    require: '?ngModel'
    template: (el, attrs)->
      itemTpl = el.html() || 'template me: {{item | json}}'
      name = nextUid()
      template = """
<div class='fs-racheck' ng-class="{disabled: disabled, enabled: !disabled}">
  <div class="fs-radio-label"
     ng-repeat="item in items" >
    <input
     type="radio"
     ng-model="$parent.selectedItem"
     name="#{name}"
     ng-value="item"
     ng-disabled="disabled"
     id="{{item.id}}"/>
    <label for="{{item.id}}">
      #{itemTpl}
    </label>
  </div>
  <p ng-repeat='error in errors' class='text-danger'>{{error}}</p>
</div>
      """
    link: (scope, element, attrs, ngModelCtrl, transcludeFn) ->
      if ngModelCtrl
        scope.$watch 'selectedItem', (newValue, oldValue)->
          unless newValue is oldValue
            ngModelCtrl.$setViewValue(scope.selectedItem)

        ngModelCtrl.$render = ->
          scope.selectedItem = ngModelCtrl.$modelValue
]
