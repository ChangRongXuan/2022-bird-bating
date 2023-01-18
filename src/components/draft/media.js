import styled from 'styled-components'

const Notion = styled.div`
  font-weight: 400;
  font-size: 12px;
  line-height: 1.6;
  text-align: justify;
  margin-bottom: 30px;
  ${({ theme }) => theme.breakpoint.xl} {
    font-size: 16px;
    font-weight: 500;
  }
`

const styles = {
  buttons: {
    marginBottom: 10,
    display: 'flex',
  },
  urlInputContainer: {
    marginBottom: 10,
  },
  urlInput: {
    fontFamily: "'Georgia', serif",
    marginRight: 10,
    padding: 3,
  },
  button: {
    marginTop: '10px',
    marginRight: '10px',
    cursor: 'pointer',
  },
  media: {
    width: '100%',
    marginBottom: '15px',
  },
}

const Audio = (props) => {
  // eslint-disable-next-line jsx-a11y/media-has-caption
  return <audio controls src={props.src} style={styles.media} />
}

const Image = (props) => {
  return <img src={props.src} style={styles.media} alt={props.alt} />
}

const Video = ({ url, title }) => {
  return (
    <>
      <video controls src={url} style={styles.media} />
      <Notion>{title}</Notion>
    </>
  )
}

export const MediaBlock = (entity) => {
  const { url, title } = entity.getData()
  const type = entity.getType()

  let media
  if (type === 'audioLink') {
    media = <Audio src={url} />
  } else if (type === 'imageLink') {
    media = <Image src={url} alt="" />
  } else if (type === 'VIDEO') {
    media = <Video url={url} title={title} />
  }

  return media
}
