import { useEffect, useState } from 'react';

declare global {
  interface Window {
    onYouTubeIframeAPIReady: () => void;
  }
}

interface Props {
  videoId: string;
  youtubeId: string;
}

interface Player {
  destroy: () => void;
  pauseVideo: () => void;
  playVideo: () => void;
}

const CONSTANTS = {
  YOUTUBE_API_URL: '//www.youtube.com/iframe_api',
  SCRIPT_ID: 'youtube-api',
};

const appendYoutubeApiScript = (onLoadCallBack: () => void) => {
  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.async = true;
  script.id = CONSTANTS.SCRIPT_ID;
  script.src = `${window.location.protocol}${CONSTANTS.YOUTUBE_API_URL}`;
  document.getElementsByTagName('head')[0].appendChild(script);

  script.onload = function () {
    onLoadCallBack();
  };
};

export function useYoutubeApi({ videoId, youtubeId }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [hasPlayedVideo, setHasPlayedVideo] = useState(false);
  const [cancelled, setCancelled] = useState(false);

  let player: Player;

  function playVideo() {
    if (!player || cancelled) {
      setIsLoading(false);
      return;
    }

    player.playVideo();
    setHasPlayedVideo(true);
  }

  function onChange(event: YT.OnStateChangeEvent) {
    const { data, target } = event;

    // Cannot use the YT.PlayerState enum because it was declared using
    // const which isn't allowed with our currect TS configuration ('--isolatedModules' = false)
    if (data === 3 && cancelled) {
      setCancelled(false);

      // We don't have access to our video instance yet
      // so we're using the one provided by the event
      target.pauseVideo();
    }
  }

  function pauseVideo() {
    setCancelled(true);

    if (!player || !player.pauseVideo) {
      return;
    }

    player.pauseVideo();
  }

  function cleanupPlayer() {
    if (!player) {
      return;
    }
    player.destroy();
  }

  function createVideo() {
    if (!window.YT.Player || !window.YT) {
      return;
    }

    player = new window.YT.Player(videoId, {
      events: {
        onReady: playVideo,
        onStateChange: onChange,
      },
      playerVars: {
        rel: 0,
      },
      videoId: youtubeId,
    });
  }

  useEffect(() => {
    window.onYouTubeIframeAPIReady = function () {
      createVideo();
    };

    // If script has already been loaded, skip to creating the video
    if (document.querySelector(`#${CONSTANTS.SCRIPT_ID}`) && isLoading) {
      createVideo();
      return;
    }

    if (isLoading) {
      appendYoutubeApiScript(createVideo);
    }

    return () => {
      cleanupPlayer();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, hasPlayedVideo]);

  return { isLoading, setIsLoading, hasPlayedVideo, pauseVideo };
}
