import { MutableRefObject } from 'react';

import { TWEEN_FUNCTIONS } from '~/lib/utils/ease';
import { randomString } from '~/lib/utils/string';

export enum SCROLL_DIRECTION {
  DOWN = 'down',
  LEFT = 'left',
  NONE = '',
  RIGHT = 'right',
  UP = 'up',
}

export type CallbackList = {
  [key: string]: () => void;
};

export type ScrollObject = {
  x: number;
  y: number;
};

export type ParamsScrollTo = {
  cb?: () => void | null;
  duration: number;
  fps: number;
  from: number;
  iteration: number;
  to: number;
  y: number;
};

const aCB: CallbackList = {};

const callbacks = () => {
  for (const key in aCB) {
    if (aCB[key]) {
      aCB[key]();
    }
  }
};

class Scroll {
  _direction: SCROLL_DIRECTION = SCROLL_DIRECTION.NONE;
  _x = 0;
  _y = 0;

  set direction(direction) {
    const update = direction !== this._direction;
    this._direction = direction;
    if (update) {
      callbacks();
    }
  }

  get direction() {
    return this._direction;
  }

  set x(x) {
    const update = x !== this._x;
    this._x = x;
    if (update) {
      callbacks();
    }
  }

  get x() {
    return this._x;
  }

  set y(y) {
    const update = y !== this._y;
    this._y = y;

    if (update) {
      callbacks();
    }
  }

  get y() {
    return this._y;
  }
}

const scroll = new Scroll();

export const getScroll = () => ({
  direction: scroll.direction,
  x: scroll.x,
  y: scroll.y,
});

export const setScroll = (scrollObject: ScrollObject) => {
  // for safari bouncing
  if (scrollObject.y < 0) {
    scrollObject.y = 0;
  }

  if (scroll.y > scrollObject.y) {
    scroll.direction = SCROLL_DIRECTION.UP;
  } else if (scroll.y < scrollObject.y) {
    scroll.direction = SCROLL_DIRECTION.DOWN;
  }

  if (scroll.x > scrollObject.x) {
    scroll.direction = SCROLL_DIRECTION.LEFT;
  } else if (scroll.x < scrollObject.x) {
    scroll.direction = SCROLL_DIRECTION.RIGHT;
  }

  scroll.x = scrollObject.x;
  scroll.y = scrollObject.y;

  return getScroll();
};

export const subscribeScroll = (callback = () => {}, _id = null) => {
  // "id" is only for tracking a value for debugging
  const id = _id ? _id + randomString() : randomString();

  aCB[id] = callback;

  // return the dispose function
  return () => {
    delete aCB[id];
  };
};

const paramsScrollTo: ParamsScrollTo = {
  duration: 0,
  fps: 60,
  from: 0,
  iteration: 0,
  to: 0,
  y: 0,
};

let cancelScrollTo = false;

export const scrollTo = (to: number, duration = 1, cb?: () => void) => {
  paramsScrollTo.from = window.scrollY || window.pageYOffset;
  paramsScrollTo.duration = duration;
  paramsScrollTo.to = to;
  paramsScrollTo.cb = cb;

  cancelScrollTo = false;

  if (paramsScrollTo.to !== paramsScrollTo.from) {
    window.requestAnimationFrame(scrollToRAF);
  } else if (cb) {
    cb();
  }

  return () => {
    cancelScrollTo = true;
  };
};

const scrollToRAF = () => {
  if (cancelScrollTo) {
    return;
  }

  // const deltaValue = paramsScrollTo.to - paramsScrollTo.from;
  const duration = paramsScrollTo.fps * paramsScrollTo.duration;

  paramsScrollTo.y = TWEEN_FUNCTIONS.EASE_OUT_CUBIC(
    paramsScrollTo.iteration,
    paramsScrollTo.from,
    paramsScrollTo.to,
    duration,
  );
  paramsScrollTo.iteration++;

  paramsScrollTo.y = Math.round(paramsScrollTo.y);

  if (paramsScrollTo.iteration <= duration) {
    window.scrollTo(0, paramsScrollTo.y);
    requestAnimationFrame(scrollToRAF);
  } else {
    paramsScrollTo.iteration = 0;
    paramsScrollTo.y = 0;
    if (paramsScrollTo.cb) {
      paramsScrollTo.cb();
    }
  }
};

export const scrollToRef = (
  ref: MutableRefObject<HTMLDivElement | null>,
  duration: number,
  cb?: () => void,
) => {
  if (!ref.current) {
    return;
  }

  scrollTo(ref.current.offsetTop, duration / 1000, cb);
};
