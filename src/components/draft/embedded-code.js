import React /* eslint-disable-line */, { useEffect, useRef } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  /* position: fixed;
  top: 0;
  left: 0;
  width: 100%; */
  outline: 1px solid white;
`

export const Block = styled.div`
  position: relative;
  /* styles for image link */
  outline: 1px solid yellow;
  img.img-responsive {
    margin: 0 auto;
    max-width: 100%;
    height: auto;
    display: block;
  }
`

export const Caption = styled.div`
  line-height: 1.43;
  letter-spacing: 0.4px;
  font-size: 14px;
  /* color: #808080; */
  color: white;
  padding: 15px 15px 0 15px;
`

export const EmbeddedCodeBlock = (entity) => {
  const { caption, embeddedCode } = entity.getData()
  console.log('caption', caption)
  console.log('embeddedCode', embeddedCode)
  const embedded = useRef(null)

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
      `<div id="draft-embed">${embeddedCode}</div>`,
      'text/html'
    )

    const scripts = ele.querySelectorAll('script')
    const nonScripts = ele.querySelectorAll('div#draft-embed > :not(script)')

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

    console.log('fragment', fragment)
    node.appendChild(fragment)
  }, [embeddedCode])

  return (
    <Container>
      <Block ref={embedded} id="eeee" />
      {caption ? <Caption>{caption}</Caption> : null}
    </Container>
  )
}
