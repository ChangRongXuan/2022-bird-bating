import React /* eslint-disable-line */, {
  useEffect,
  useRef,
  useState,
} from 'react'
import styled from 'styled-components'
import { logGAEvent } from '../utils/analytics'
import CoverPhotoDesktop from '../assets/cover-photo-desktop.svg'
import CoverPhotoMobile from '../assets/cover-photo-mobile.svg'

const Container = styled.div`
  z-index: 500;
  .cover-photo {
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    object-fit: contain;
    z-index: -1;
    margin: auto;
  }

  .cover-photo-desktop {
    display: none;
  }
  .cover-photo-mobile {
    display: inline-block;
    width: 100%;
    height: 100%;
    object-fit: contain;
    margin: auto;
  }

  @media screen and (min-width: 768px) {
    .cover-photo-mobile {
      display: none;
    }
    .cover-photo-desktop {
      display: block;
      width: 100%;
      object-fit: contain;
    }
  }

  .video-anchor {
    height: 1px;
    visibility: hidden;
  }
`

const Block = styled.div`
  position: relative;
  z-index: 200;
  /* styles for image link */
  img.img-responsive {
    margin: 0 auto;
    max-width: 100%;
    height: auto;
    display: block;
  }
`

export default function Embedded() {
  const embeddedCode = ` 
  <script>
  (function() {
    var namespace = '__twreporterEmbeddedData';
    var pkg = 'scrollable-video';
    if (typeof window != 'undefined') {
      if (!window.hasOwnProperty(namespace)) {
        window[namespace] = {};
      }
      if (window[namespace] && !window[namespace].hasOwnProperty(pkg)) {
        window[namespace][pkg] = [];
      }
      if (Array.isArray(window[namespace][pkg])) {
        var data = {"video":{"sources":[{"type":"video\u002Fmp4","src":"https:\u002F\u002Fstorage.googleapis.com\u002Fdata-journalism-public-dev\u002F2022_bird\u002Fb_12801.mp4","width":1280,"height":720},{"type":"video\u002Fmp4","src":"https:\u002F\u002Fstorage.googleapis.com\u002Fdata-journalism-public-dev\u002F2022_bird\u002Fb_14401.mp4","width":1440,"height":810},{"type":"video\u002Fmp4","src":"https:\u002F\u002Fstorage.googleapis.com\u002Fdata-journalism-public-dev\u002F2022_bird\u002Fb_19201.mp4","width":1920,"height":1080},{"type":"video\u002Fmp4","src":"https:\u002F\u002Fstorage.googleapis.com\u002Fdata-journalism-public-dev\u002F2022_bird\u002Fb_7201.mp4","width":720,"height":1080},{"type":"video\u002Fmp4","src":"https:\u002F\u002Fstorage.googleapis.com\u002Fdata-journalism-public-dev\u002F2022_bird\u002Fb_9601.mp4","width":960,"height":1440}]},"captions":[],"appProps":{"captionsSetting":{"xBoxAlign":"right","xPosition":"8.7%","yBoxAlign":"bottom","yPosition":"20px"},"captionSetting":{"textAlign":"right"},"secondsPer100vh":1.5,"skipLoadLocationRegExp":"editor","forcedPreloadVideo":true,"gsapVersion":"3.5.1","scrollTriggerVersion":"3.5.1","pollingTimeout":700,"preloadCacheType":"force-cache"},"theme":{"mq":{"mobileMaxWidth":"767px"},"captions":{"color":"#fff","link":{"color":"#a67a44","underlineColor":"#a67a44"},"lineHieght":"1.7","mobileLineHeight":"1.7","fontStyle":"normal","fontWeight":"bold","fontSize":"24px","mobile":{"fontSize":"22px"},"fontFamily":"ff-tisa-web-pro, source-han-sans-traditional, Noto Sans TC, PingFang TC, Apple LiGothic Medium, Roboto, Microsoft JhengHei, Lucida Grande, Lucida Sans Unicode, sans-serif","box":{"background":"#404040","width":"450px","mobileWidth":"77%","spanPadding":"6px 15px","mobilePadding":"12px 12px 14px 18px"}}},"uuid":"99f7a775-2e29-438d-94a4-ee27d4c80c89"};
        window[namespace][pkg].push(data);
        }
      }
    })()
  </script>
  <div id="99f7a775-2e29-438d-94a4-ee27d4c80c89"></div>
  <script type="text/javascript" crossorigin src="https://unpkg.com/@twreporter/scrollable-video@1.0.3/dist/main.86a0a5788205961bf35c.bundle.js"></script>
`

  const embedded = useRef(null)

  // interSectionObserver
  const embeddedAnchor = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  const callbackFunction = (entries) => {
    const [entry] = entries
    setIsVisible(entry.isIntersecting)
  }

  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 1,
  }

  useEffect(() => {
    const observer = new IntersectionObserver(callbackFunction, options)
    if (embeddedAnchor.current) observer.observe(embeddedAnchor.current)
    if (isVisible) {
      logGAEvent('Scroll', 'scroll to head video')
    }
    return () => {
      if (embeddedAnchor.current) observer.unobserve(embeddedAnchor.current)
    }
  }, [embeddedAnchor, options])

  useEffect(() => {
    const node = embedded.current
    if (node.children[0]) return
    const fragment = document.createDocumentFragment()

    // `embeddedCode` is a string, which may includes
    // multiple '<script>' tags and other html tags.
    // For executing '<script>' tags on the browser,
    // we need to extract '<script>' tags from `embeddedCode` string first.
    //
    // The approach we have here is to parse html string into elements,
    // and we could use DOM element built-in functions,
    // such as `querySelectorAll` method, to query '<script>' elements,
    // and other non '<script>' elements.
    const parser = new DOMParser()
    const ele = parser.parseFromString(
      `<div id="embedded">${embeddedCode}</div>`,
      'text/html'
    )

    const scripts = ele.querySelectorAll('script')
    const nonScripts = ele.querySelectorAll('div#embedded > :not(script)')

    nonScripts.forEach((ele) => {
      fragment.appendChild(ele)
    })

    scripts.forEach((s) => {
      const scriptEle = document.createElement('script')
      const attrs = s.attributes
      for (let i = 0; i < attrs.length; i++) {
        scriptEle.setAttribute(attrs[i].name, attrs[i].value)
      }
      scriptEle.text = s.text || ''
      fragment.appendChild(scriptEle)
    })

    node.appendChild(fragment)
  }, [embeddedCode])

  return (
    <Container>
      <div className="cover-photo">
        <img
          className="cover-photo-desktop"
          src={CoverPhotoDesktop}
          alt="cover-photo"
        ></img>
        <img
          className="cover-photo-mobile"
          src={CoverPhotoMobile}
          alt="cover-photo"
        ></img>
      </div>
      <div ref={embeddedAnchor} className="video-anchor"></div>
      <Block ref={embedded} />
    </Container>
  )
}
