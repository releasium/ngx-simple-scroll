import { Directive, Input, HostListener, OnInit, OnChanges } from '@angular/core';

import { ScrollToService } from './scroll-to.service';
import { IScrollToConfig } from './scroll-to-config.interface';

@Directive({
  selector: '[ngxSimpleScroll]',
})

export class NgxSimpleScrollDirective implements OnInit, OnChanges {
  @HostListener('click')
  onClick() {
    this.async
      ? setTimeout(() => this.scrollToService.scrollTo(this.config), 0)
      : this.scrollToService.scrollTo(this.config);
  }

  @Input() targetSelector: string;
  @Input() async: boolean;
  @Input() scrollToFocus: boolean;
  @Input() scrollToParent: boolean;
  @Input() parentSelector: string;
  @Input() scrollToAnimatedObject: boolean;

  private config: IScrollToConfig;

  constructor(private scrollToService: ScrollToService) {
  }

  ngOnInit() {
    this.setConfig();
  }

  ngOnChanges() {
    this.setConfig();
  }

  private setConfig() {
    this.config = {
      targetSelector: this.targetSelector,
      scrollToFocus: this.scrollToFocus,
      scrollToParent: this.scrollToParent,
      parentSelector: this.parentSelector,
      scrollToAnimatedObject: this.scrollToAnimatedObject,
    };
  }
}