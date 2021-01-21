# ngx-simple-scroll
Angular library that make ability scroll to particular element using service or directive.

# Example of using NgxSimpleScrollService
```
    const scrollToServiceConfig = {
      targetSelector: `#targetId`,
      async: true,
    };

    this.ngxNgxSimpleScrollService.scrollTo(scrollToServiceConfig);
```

# Example of extending NgxSimpleScrollDirective
```
@Directive({
	selector: '[scrollToError]'
})

export class ScrollToErrorDirective extends NgxSimpleScrollDirective {
	@Input() targetSelector = 'form-msg:not(:empty)';
	@Input() async = true;
	@Input() scrollToFocus = true;
	@Input() scrollToParent = true;
	@Input() parentSelector = '.form-group';
	@Input() scrollToAnimatedObject = false;
}
```
