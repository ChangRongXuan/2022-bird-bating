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
  padding: 1px;
  margin-bottom: 36px;

  > img {
    width: 90%;
    margin: auto;
    margin-bottom: 34px;
  }

  ${({ theme }) => theme.breakpoint.md} {
    margin-bottom: 40px;
    max-width: 480px;
    > img {
      width: 80%;
    }
  }

  ${({ theme }) => theme.breakpoint.xl} {
    margin: 60px auto 48px auto;
    > img {
      width: 100%;
    }
  }
`

const ListContainer = styled.p`
  display: flex;
  align-items: center;
  margin: 0;
  font-weight: 400;
  color: rgba(203, 203, 203, 0.87);
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
  margin-bottom: 30px;
  text-align: center;
  font-size: 24px;
  ${({ theme }) => theme.breakpoint.md} {
    font-size: 32px;
    margin-bottom: 48px;
  }
  ${({ theme }) => theme.breakpoint.xl} {
    font-size: 40px;
    margin-bottom: 36px;
  }
`

const H3 = styled.p`
  font-family: 'Noto Sans TC';
  line-height: 1.5;
  margin-bottom: 30px;
  text-align: center;
  font-weight: 700;
  font-size: 18px;
  ${({ theme }) => theme.breakpoint.md} {
    font-size: 24px;
  }
  ${({ theme }) => theme.breakpoint.xl} {
    font-size: 36px;
    font-weight: 400;
    margin-bottom: 36px;
  }
`

const OrderListContainer = styled.p`
  font-weight: 400;
  color: rgba(203, 203, 203, 0.87);
`

export const H2Block = (props) => {
  const key = props.block.getKey()
  const content = props.block.getText()

  return <H2 id={key}>{content}</H2>
}

export const H3Block = (props) => {
  const key = props.block.getKey()
  const content = props.block.getText()

  return <H3 id={key}>{content}</H3>
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

export const OrderListBlock = (props) => {
  const content = props.block.getText()

  return <OrderListContainer>{content}</OrderListContainer>
}

const AtomicBlock = (props) => {
  const entity = props.contentState.getEntity(props.block.getEntityAt(0))
  const entityType = entity.getType()

  switch (entityType) {
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

export function atomicBlockRenderer(block) {
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
    case 'ordered-list-item': {
      return {
        component: OrderListBlock,
        editable: false,
      }
    }
    default: {
      return null
    }
  }
}
