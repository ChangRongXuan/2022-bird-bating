import styled from 'styled-components'

const ColorSpan = styled.span`
  color: ${(props) => props.color};
`

function ColorText(props) {
  const { color } = props.contentState.getEntity(props.entityKey).getData()
  return <ColorSpan color={color}>{props.children}</ColorSpan>
}

// 陣列中每個元素都是一個物件，每個物件都必須要包含兩個 key：strategy 以及 component。
// strategy：需回傳一個 function，此 function 一共會有三個參數，分別是 contentBlock、callback、contentState，
// component：需回傳一個 component 進行 Decorator 的繪製。

function findColorTextEntities(contentBlock, callback, contentState) {
  contentBlock.findEntityRanges((character) => {
    const entityKey = character.getEntity()
    return (
      entityKey !== null &&
      contentState.getEntity(entityKey).getType() === 'COLORTEXT'
    )
  }, callback)
}

export const colorTextDecorator = {
  strategy: findColorTextEntities,
  component: ColorText,
}

//TODO: 不太確定用法
export const CUSTOM_STYLE_PREFIX_FONT_COLOR = 'FONT_COLOR_'
