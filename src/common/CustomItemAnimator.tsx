import { BaseItemAnimator } from "recyclerlistview";

export class CustomItemAnimator extends BaseItemAnimator {
  constructor() {
    super();
  }

  animateWillMount(atX: number, atY: number, itemIndex: number) {
    return undefined;
  }
  animateDidMount(
    atX: number,
    atY: number,
    itemRef: object,
    itemIndex: number
  ) {}
  animateWillUpdate(
    fromX: number,
    fromY: number,
    toX: number,
    toY: number,
    itemRef: object,
    itemIndex: number
  ) {}
  animateShift(
    fromX: number,
    fromY: number,
    toX: number,
    toY: number,
    itemRef: object,
    itemIndex: number
  ) {
    return false;
  }
  animateWillUnmount(
    atX: number,
    atY: number,
    itemRef: object,
    itemIndex: number
  ) {}
}
