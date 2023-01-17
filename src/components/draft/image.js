import React from 'react' // eslint-disable-line
import styled from 'styled-components'

// const styles = {
//   image: {
//     width: '100%',
//   },
// }

const Figure = styled.figure`
  img {
    width: 100%;
    margin-bottom: 20px;

    ${({ theme }) => theme.breakpoint.xl} {
      margin-bottom: 16px;
    }
  }
`

const Figcaption = styled.div`
  font-weight: 400;
  font-size: 12px;
  line-height: 1.6;
  text-align: justify;
  ${({ theme }) => theme.breakpoint.xl} {
    font-size: 16px;
    font-weight: 500;
  }
`

export function ImageBlock(entity) {
  const { url, description } = entity.getData()
  return (
    <Figure>
      <img
        // style={styles.image}
        src={url}
        // onError={(e) => (e.currentTarget.src = imageFile?.url)}
        alt="description"
      />
      <Figcaption>{description}</Figcaption>
    </Figure>
  )
}