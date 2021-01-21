import { Directive, Input, HostListener, OnInit, OnChanges } from '@angular/core';

import { NgxSimpleScrollService } from './scroll-to.service';
import { INgxSimpleScrollConfig } from './scroll-to-config.interface';

@Directive({
  selector: '[ngxSimpleScroll]',
})

export class NgxSimpleScrollDirective implements OnInit, OnChanges {
  @HostListener('click')
  onClick() {
    this.async
      ? setTimeout(() => this.ngxSimpleScrollService.scrollTo(this.config), 0)
      : this.ngxSimpleScrollService.scrollTo(this.config);
  }

  @Input() targetSelector: string;
  @Input() async: boolean;
  @Input() scrollToFocus: boolean;
  @Input() scrollToParent: boolean;
  @Input() parentSelector: string;
  @Input() scrollToAnimatedObject: boolean;

  private config: INgxSimpleScrollConfig;

  constructor(private ngxSimpleScrollService: NgxSimpleScrollService) {}

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
