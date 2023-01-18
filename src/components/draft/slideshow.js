import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
// import required modules
import { Pagination } from 'swiper'
import styled from 'styled-components'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'

const Container = styled.div`
  margin-bottom: 40px;
`
export function SlideShow(entity) {
  const slideInfo = entity.getData()

  const slides = slideInfo.map((item) => {
    return (
      <SwiperSlide key={item.id}>
        <img src={item.url} alt={item.description} />
      </SwiperSlide>
    )
  })

  return (
    <Container>
      <Swiper
        pagination={{
          dynamicBullets: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        {slides}
      </Swiper>
    </Container>
  )
}
