import { useMemo, useEffect, useState } from 'react'
import styled from 'styled-components'
import Immutable from 'immutable'

import { Editor, EditorState, convertFromRaw } from 'draft-js'
import decorators from './draft/entity-decorator'
import { atomicBlockRenderer } from './draft/block-redender-fn'

const blockRendererFn = (block) => {
  const atomicBlockObj = atomicBlockRenderer(block)
  return atomicBlockObj
}

const Container = styled.div`
  font-family: 'PingFang TC';
  text-align: center;
  color: ${({ theme }) => theme.textColor.brown};
  position: relative;
  font-weight: 300;
  font-size: 12px;
  line-height: 1.5;
  letter-spacing: 0.08em;
  width: 100%;
  font-weight: 400;
  ${({ theme }) => theme.breakpoint.md} {
    font-size: 18px;
    line-height: 2;
    font-weight: 400;
  }
  ${({ theme }) => theme.breakpoint.xl} {
    font-size: 18px;
    line-height: 32px;
  }

  ol > li {
    display: flex;
    align-items: center;
    line-height: 2;
    counter-increment: my-awesome-counter;
    color: rgba(255, 255, 255, 0.87);
    ::before {
      content: counter(my-awesome-counter) '.';
      display: block;
      margin-right: 0.75rem;
      font-weight: 300;
      font-size: 18px;
      line-height: 32px;
      letter-spacing: 0.1em;
      margin-right: 5px;
    }
  }

  .public-DraftStyleDefault-block {
    margin-bottom: 20px;
    ${({ theme }) => theme.breakpoint.md} {
      margin-bottom: 30px;
    }
    ${({ theme }) => theme.breakpoint.xl} {
      margin-bottom: 24px;
    }
  }
`

const Credit = styled.div`
  width: 100%;
  text-align: center;
  margin-bottom: 20px;
  font-weight: 400;
  font-size: 12px;
  line-height: 1.5;
  ${({ theme }) => theme.breakpoint.md} {
    ${({ theme }) => theme.fontSize['content-sm']}
    margin-bottom: 24px;
    line-height: 2;
  }
`

export default function Brief({ content, writers, photographers, coworker }) {
  const blocksWithoutEmptyQuote = useMemo(() => {
    return content?.blocks.filter(
      (block) => block?.type !== 'blockquote' || block?.text.replace(/\s/g, '')
    )
  }, [content])

  let contentState
  let editorState

  if (content) {
    contentState = convertFromRaw({
      ...content,
      blocks: blocksWithoutEmptyQuote,
    })
  }

  if (content) {
    editorState = EditorState.createWithContent(contentState, decorators)
  }

  return (
    <Container>
      {content && (
        <Editor
          editorState={editorState}
          readOnly
          editorKey="editor"
          blockRendererFn={blockRendererFn}
        />
      )}
      <Credit>
        <p>
          記者｜{writers}；攝影｜{photographers}
        </p>
        <p>網頁｜{coworker}</p>
      </Credit>
    </Container>
  )
}
