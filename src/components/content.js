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
  text-align: justify;
  color: ${({ theme }) => theme.textColor.white};
  position: relative;
  font-weight: 300;
  font-size: 18px;
  line-height: 32px;
  letter-spacing: 0.08em;
  width: 100%;
  ${({ theme }) => theme.breakpoint.xl} {
    font-size: 20px;
    line-height: 32px;
    margin-bottom: 100px;
  }

  .public-DraftStyleDefault-block {
    margin-bottom: 35px;
  }

  ol,
  ul {
    margin-bottom: 35px;
  }

  ol > li {
    display: flex;
    align-items: center;
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
`

export default function Content({ data = { blocks: [], entityMap: {} } }) {

  const blocksWithoutEmptyQuote = useMemo(() => {
    return data.blocks.filter(
      (block) => block.type !== 'blockquote' || block.text.replace(/\s/g, '')
    )
  }, [data])

  //contentState = contentBlock + entityMap
  const contentState = convertFromRaw({
    ...data,
    blocks: blocksWithoutEmptyQuote,
  })

  // editorState = 儲存在編輯器中的所有內容(只會有一個editorState)
  const editorState = EditorState.createWithContent(contentState, decorators)

  return (
    <Container>
      <Editor
        editorState={editorState}
        readOnly
        editorKey="editor"
        blockRendererFn={blockRendererFn}
      />
    </Container>
  )
}
