import styled from 'styled-components'
import Sidebar from './sidebar'
import ReadMore from './readmore'
import Content from './content'
import Brief from './brief'
import axios from 'axios'
import { useState, useEffect } from 'react'

const Container = styled.div`
  width: 100%;
  position: relative;
`

const ContentWrap = styled.div`
  padding: 40px 20px 0px 20px;
  width: 100%;
  color: ${({ theme }) => theme.textColor.white};
  ${({ theme }) => theme.breakpoint.md} {
    padding: 60px 0px 0px 0px;
    max-width: 600px;
    margin: auto;
  }

  ${({ theme }) => theme.breakpoint.xl} {
    max-width: 776px;
    padding-top: 36px;
  }
`

const Footer = styled.div`
  width: 100%;
  max-width: calc(100% - 40px);
  margin: auto;
  border-top: 1px solid ${({ theme }) => theme.borderColor.white};
  padding: 8px 0px;
  text-align: center;
  color: rgba(255, 255, 255, 0.87);
  font-size: 14px;
  line-height: 2;
  ${({ theme }) => theme.breakpoint.md} {
    max-width: 600px;
  }
  ${({ theme }) => theme.breakpoint.xl} {
    max-width: 1200px;
  }
`

export default function Main() {
  const [data, setData] = useState({ blocks: [], entityMap: {} })

  const fetchData = async () => {
    // const response = await axios('/api/v2/posts/63b64bed19f7611a00e7501a')
    // const response = await axios(
    //   'http://104.199.190.189:8080/posts/63b64bed19f7611a00e7501a'
    // )
    const response = await axios(
      '/api/v2/getposts?where=%7B%22slug%22:%22birdbating%22%7D&keep=draft&related=full'
    )

    // setData(response?.data)
    setData(response?.data._items[0])
  }

  useEffect(() => {
    fetchData()
  }, [])

  const updatedTime = new Date(data.updatedAt)
    .toLocaleDateString('zh-TW', {
      hour12: false,
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    })
    .replaceAll('/', '.')

  const writers = data?.writers?.map((item) => {
    return <span key={item._id}>{item.name}</span>
  })

  const photographers = data?.photographers?.map((item) => {
    return <span key={item._id}>{item.name}</span>
  })

  const coworker = data?.extend_byline
  const content = data?.brief?.draft

  return (
    <Container>
      <Sidebar data={data?.content?.draft} />
      <ContentWrap>
        <Brief
          content={content}
          writers={writers}
          photographers={photographers}
          coworker={coworker}
        />
        <Content data={data?.content?.draft} />
        <ReadMore data={data?.relateds} />
      </ContentWrap>
      <Footer>更新時間 / {updatedTime}</Footer>
    </Container>
  )
}
