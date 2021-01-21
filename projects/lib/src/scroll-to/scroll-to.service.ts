import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';
import { INgxSimpleScrollConfig } from './scroll-to-config.interface';

@Injectable()
export class NgxSimpleScrollService {
  private config = {
    scrollToFocus: true,
    scrollToParent: false,
    scrollToAnimatedObject: false,
  };

  private focusParams: FocusOptions = { preventScroll: true };
  private scrollParams: ScrollIntoViewOptions = { block: 'center', behavior: 'smooth' };
  private animationInterval = 50;

  scrollTo(config: INgxSimpleScrollConfig) {
    const mergedConfig = {
      ...this.config,
      ...config,
    };

    const targetSelector = mergedConfig.targetSelector;

    const target = <HTMLElement>document.querySelector(targetSelector);

    if (!target) {
      return;
    }

    if (mergedConfig.scrollToFocus) {
      this.focus(target, mergedConfig);
    }

    this.scroll(target, mergedConfig);
  }

  private focus(target: HTMLElement, config: INgxSimpleScrollConfig) {
    const isInput = target instanceof HTMLInputElement;
    const isTextarea = target instanceof HTMLTextAreaElement;

    if (isInput || isTextarea) {
      target.focus(this.focusParams);
      return;
    }

    if (!config.scrollToParent) {
      return;
    }

    const parent = this.getParent(target, config.parentSelector);

    if (!parent) {
      return;
    }

    const inputElement = <HTMLElement>parent.querySelector('input, textarea');

    if (!inputElement) {
      return;
    }

    inputElement.focus(this.focusParams);
  }

  private scroll(target: HTMLElement, config: INgxSimpleScrollConfig) {
    const el = config.scrollToParent
      ? this.getParent(target, config.parentSelector) || target
      : target;

    el.scrollIntoView(this.scrollParams);

    if (!config.scrollToAnimatedObject) {
      return;
    }

    this.initAnimationDoneSub(el)
      .subscribe(() => el.scrollIntoView(this.scrollParams));
  }

  private initAnimationDoneSub(el: Element) {
    const subj = new Subject<never>();
    let position = this.getElemPos(el);

    const interval = setInterval(
      () => {
        const newPos = this.getElemPos(el);

        if (position !== newPos) {
          position = newPos;
          return;
        }

        clearInterval(interval);
        subj.next();
        subj.complete();
      },
      this.animationInterval,
    );

    return subj;
  }

  private getElemPos(el: Element): number {
    if (!el) {
      return null;
    }

    return el.getBoundingClientRect().top;
  }

  private getParent(target: HTMLElement, selector: string): Element {
    if (!selector) {
      return null;
    }

    return target.closest(selector);
  }
}
