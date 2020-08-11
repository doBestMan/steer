declare module '*.svg';
declare module 'focus-trap';
declare module 'jest-next-dynamic';

interface FocusTrapInstance {
  activate: function;
  deactivate: function;
}

interface Window {
  __attentive?: any;
  _talkableq?: object[];
  dataLayer?: object[];
  google_optimize?: { get: (experimentID: string) => string | undefined };
  showTalkablePopup?: () => void;
}
