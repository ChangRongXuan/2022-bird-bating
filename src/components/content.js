import { useMemo, useEffect, useState } from 'react'
import styled from 'styled-components'

//不確定這個要不要留？
// import { CUSTOM_STYLE_PREFIX_FONT_COLOR } from './draft/color-text'

import { Editor, EditorState, convertFromRaw } from 'draft-js'
//decorators是讓一些一定會有固定樣式的文字透過自己客製化的方法顯示出該文字的固定樣式
import decorators from './draft/entity-decorator'
import { blockRenderer } from './draft/block-redender-fn'

const blockRendererFn = (block) => {
  const blockObj = blockRenderer(block)
  return blockObj
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
  }

  /* .public-DraftStyleDefault-block {
    margin-bottom: 40px;
    outline: 1px solid white;
  } */

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
`

export default function Content({ data = { blocks: [], entityMap: {} } }) {
  console.log('data', data)
  //有空白格的部分都加上''處理
  //blockquote=引言元素
  const blocksWithoutEmptyQuote = useMemo(() => {
    return data.blocks.filter(
      (block) => block.type !== 'blockquote' || block.text.replace(/\s/g, '')
    )
  }, [data])

  //清乾淨blocks之後再放回去
  //contentState = contentBlock + entityMap
  const contentState = convertFromRaw({
    ...data,
    blocks: blocksWithoutEmptyQuote,
  })

  // console.log('contentState', contentState)
  // editorState 用來儲存在編輯器中的所有內容(only one)

  //透過 editorState 中 getCurrentContent 這個方法就可以取得 contentState(產生contentBlock 以及 entityMap )
  //const editorState = EditorState.createEmpty(); 產生全新editorState物件
  //decorators是讓一些一定會有固定樣式的文字透過自己客製化的方法顯示出該文字的固定樣式
  //createWithContent = Returns a new EditorState object based on ContentState and decorator provided.
  const editorState = EditorState.createWithContent(contentState, decorators)

  // const customStyleFn = (style) => {
  //   return style.reduce((styles, styleName) => {
  //     if (styleName?.startsWith(CUSTOM_STYLE_PREFIX_FONT_COLOR)) {
  //       styles['color'] = styleName.split(CUSTOM_STYLE_PREFIX_FONT_COLOR)[1]
  //     }
  //     return styles
  //   }, {})
  // }

  //inlineStyleRanges 中的 style 有含有 BOLD 的會被視為 line-through
  const styleMap = {
    BOLD: {
      textDecoration: 'line-through',
    },
  }

  // const blockRenderMap = Immutable.Map({
  //   'header-one': {
  //     element: 'h2',
  //   },
  //   'header-two': {
  //     element: 'h3',
  //   },
  // })

  // function customBlockStyleFn(contentBlock) {
  //   const type = contentBlock.getType()
  //   switch (type) {
  //     case 'blockquote': {
  //       return 'superFancyBlockquote'
  //     }
  //     default: {
  //       return ''
  //     }
  //   }
  // }

  return (
    <Container>
      <Editor
        editorState={editorState}
        readOnly
        editorKey="editor"
        // blockRendererFn = set a function to define custom block rendering
        blockRendererFn={blockRendererFn}
        // define a function to transform inline styles to CSS objects
        // customStyleFn={customStyleFn}
        // blockRenderMap={extendedBlockRenderMap}
        // customStyleMap={styleMap}
        // blockStyleFn={customBlockStyleFn}
      />
    </Container>
  )
}
