import { SiteImage } from './SiteImage';

/**
 *
 * @export
 * @interface SiteYouTubeVideo
 */
export interface SiteYouTubeVideo {
  /**
   *
   * @type {SiteImage}
   * @memberof SiteYouTubeVideo
   */
  poster: SiteImage;
  /**
   *
   * @type {string}
   */
  videoId: string;
  /**
   *
   * @type {string}
   * @memberof SiteYouTubeVideo
   */
  type: SiteYouTubeVideoTypeEnum;
}

/**
 * @export
 * @enum {string}
 */
export enum SiteYouTubeVideoTypeEnum {
  SiteYouTubeVideo = 'SiteYouTubeVideo',
}
