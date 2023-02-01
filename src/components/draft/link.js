import styled from 'styled-components'

const StyledLink = styled.a`
  color: #b7db6a;
  text-decoration: underline;
  cursor: pointer;
`

function findLinkEntities(contentBlock, callback, contentState) {
  contentBlock.findEntityRanges((character) => {
    const entityKey = character.getEntity()
    return (
      entityKey !== null &&
      contentState.getEntity(entityKey).getType() === 'LINK'
    )
  }, callback)
}

function Link(props) {
  const { url } = props.contentState.getEntity(props.entityKey).getData()
  return (
    <StyledLink
      href={url}
      target="_blank"
      rel="noopener noreferrer"
    >
      {props.children}
    </StyledLink>
  )
}

export const linkDecorator = {
  strategy: findLinkEntities,
  component: Link,
}
