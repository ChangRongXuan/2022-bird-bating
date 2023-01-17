import styled from 'styled-components'
import { convertFromRaw, Editor, EditorState } from 'draft-js'
import { useMemo } from 'react'

import { atomicBlockRenderer } from './draft/block-redender-fn'
import { CUSTOM_STYLE_PREFIX_FONT_COLOR } from './draft/color-text'
import decorators from './draft/entity-decorator'

const blockRendererFn = (block) => {
  const atomicBlockObj = atomicBlockRenderer(block)
  return atomicBlockObj
}

const Container = styled.div`
  font-family: 'PingFang TC';
  width: 100%;
  font-weight: 400;
  ${({ theme }) => theme.fontSize['content-sm']};
  color: ${({ theme }) => theme.textColor.brown};
  margin-top: 20px;

  ${({ theme }) => theme.breakpoint.md} {
    margin-bottom: 30px;
  }
  ${({ theme }) => theme.breakpoint.xl} {
    margin-bottom: 25px;
  }

  /* .public-DraftStyleDefault-block {
    text-align: center;
  } */
`

const Content = styled.div`
  > p {
    margin-bottom: 25px;
    text-align: center;
  }

  ${({ theme }) => theme.breakpoint.md} {
    margin-bottom: 40px;
    > p {
      line-height: 2;
    }
  }

  ${({ theme }) => theme.breakpoint.xl} {
    margin-bottom: 25px;
    > p {
      line-height: 1.5;
    }
  }
`

const Credit = styled.div`
  width: 100%;
  text-align: center;
  margin: 20px 0px;
  font-weight: 400;
  font-size: 12px;

  ${({ theme }) => theme.breakpoint.md} {
    ${({ theme }) => theme.fontSize['content-sm']}
    margin: 40px 0px 24px 0px;
    > p {
      margin-bottom: 12px;
    }
  }

  ${({ theme }) => theme.breakpoint.xl} {
    > p {
      margin-bottom: 0px;
    }
  }
`

export default function Brief({ data = { blocks: [], entityMap: {} } }) {
  const blocksWithoutEmptyQuote = useMemo(() => {
    return data.blocks.filter(
      (block) => block.type !== 'blockquote' || block.text.replace(/\s/g, '')
    )
  }, [data])
  const contentState = convertFromRaw({
    ...data,
    blocks: blocksWithoutEmptyQuote,
  })
  const editorState = EditorState.createWithContent(contentState, decorators)
  const customStyleFn = (style) => {
    return style.reduce((styles, styleName) => {
      if (styleName?.startsWith(CUSTOM_STYLE_PREFIX_FONT_COLOR)) {
        styles['color'] = styleName.split(CUSTOM_STYLE_PREFIX_FONT_COLOR)[1]
      }
      return styles
    }, {})
  }

  const mock =
    '越感到怎形，是被要講看我可能要，並沒有比較沒我可能就不要，東西了驗很不錯，動夜開一自信，休息太太的樣喜歡地方。應該很多人，想法的事這禮拜是公捏種情的文的很喜外一其實，學因為很喜歡可能。詳細的其他次完了同學，有趣好為什可以物還沒，一部事行的作品在床可怕較說可以，的好也事不知道：好可如果要。'

  return (
    <Container>
      {/* <Editor
        editorState={editorState}
        readOnly
        editorKey="editor"
        blockRendererFn={blockRendererFn}
        customStyleFn={customStyleFn}
      /> */}
      <Content>
        <p>{mock}</p>
        <p>{mock}</p>
      </Content>
      <Credit>
        <p>記者｜OOO；攝影｜OOO </p>
        <p>網頁｜簡信昌，李又如，王薏晴，張容瑄，曾立宇</p>
      </Credit>
    </Container>
  )
}
