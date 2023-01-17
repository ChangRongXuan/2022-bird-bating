import { DividerBlock } from './divider'
import { EmbeddedCodeBlock } from './embedded-code'
import { ImageBlock } from './image'
import { MediaBlock } from './media'
import { SlideShow } from './slideshow'
import { TableBlock } from './table'
import styled from 'styled-components'
import Quote from '../../assets/quote.svg'

const QuoteContainer = styled.div`
  color: #b7db6a;
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 2;
  text-align: justify;
  position: relative;
  margin: auto;

  > img {
    width: 70%;
    margin: auto;
    margin-bottom: 34px;
  }

  ${({ theme }) => theme.breakpoint.xl} {
    max-width: 480px;
    margin-bottom: 48px;
    > img {
      width: 100%;
    }
  }
`

const ListContainer = styled.div`
  display: flex;
  align-items: center;
  line-height: 2;
  ::before {
    content: '';
    display: block;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: rgba(0, 9, 40, 0.66);
    margin-right: 0.7rem;
    background: #afafaf;
  }
`

const H2 = styled.p`
  font-family: 'Noto Sans TC';
  font-weight: 700;
  line-height: 1.5;
  margin: 48px 0px 30px 0px;
  text-align: center;
  ${({ theme }) => theme.breakpoint.xl} {
    font-size: 40px;
    margin: 24px 0px 36px 0px;
  }
`

const H3 = styled.p`
  font-family: 'Noto Sans TC';
  font-weight: 400;
  line-height: 1.5;
  margin: 30px 0px 30px 0px;
  text-align: center;
  ${({ theme }) => theme.breakpoint.xl} {
    font-size: 36px;
  }
`

export const H2Block = (props) => {
  const content = props.block.getText()

  return <H2>{content}</H2>
}

export const H3Block = (props) => {
  const content = props.block.getText()

  return <H3>{content}</H3>
}

export const QuoteBlock = (props) => {
  const content = props.block.getText()

  return (
    <QuoteContainer>
      <img src={Quote} alt="quote"></img>
      <span>{content}</span>
    </QuoteContainer>
  )
}

export const ListBlock = (props) => {
  const content = props.block.getText()

  return <ListContainer>{content}</ListContainer>
}

const AtomicBlock = (props) => {
  const entity = props.contentState.getEntity(props.block.getEntityAt(0))
  const entityType = entity.getType()

  switch (entityType) {
    case 'audioLink':
    case 'imageLink':
    case 'VIDEO': {
      return MediaBlock(entity)
    }
    case 'IMAGE': {
      return ImageBlock(entity)
    }
    case 'SLIDESHOW': {
      return SlideShow(entity)
    }
    case 'EMBEDDEDCODE': {
      return EmbeddedCodeBlock(entity)
    }
    case 'DIVIDER': {
      return DividerBlock()
    }
    case 'TABLE': {
      return TableBlock(props)
    }
    default: {
      return null
    }
  }
}

export function blockRenderer(block) {
  const blockType = block.getType()
  switch (blockType) {
    case 'atomic': {
      return {
        component: AtomicBlock,
        editable: false,
      }
    }
    case 'header-one': {
      return {
        component: H2Block,
        editable: false,
      }
    }
    case 'header-two': {
      return {
        component: H3Block,
        editable: false,
      }
    }
    case 'blockquote': {
      return {
        component: QuoteBlock,
        editable: false,
      }
    }
    case 'unordered-list-item': {
      return {
        component: ListBlock,
        editable: false,
      }
    }
    default: {
      return null
    }
  }
}
