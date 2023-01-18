import React from 'react';
import styled from 'styled-components';
import DefaultImage from '../assets/default-img-photo.svg';

const Container = styled.div`
  width: 100%;
  padding: 40px 0px 0px 0px;
  color: ${({ theme }) => theme.textColor.brown};

  p {
    font-weight: 600;
    margin-bottom: 15px;
    ${({ theme }) => theme.fontSize['subtitle-xl']};
    text-align: center;
  }
  ul {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    max-width: 640px;
    margin: auto;
  }

  ${({ theme }) => theme.breakpoint.md} {
    ul {
      max-width: 640px;
      gap: 0px 48px;
      justify-content: space-between;
    }
  }

  ${({ theme }) => theme.breakpoint.md} {
    p {
      margin-bottom: 36px;
      ${({ theme }) => theme.fontSize['content-xl']};
    }
  }
`;
const ReadMoreList = styled.li`
  list-style: none;
  width: 100%;
  max-width: 280px;
  margin: 0px 24px 24px;
  cursor: pointer;

  ${({ theme }) => theme.breakpoint.md} {
    max-width: ${(prop) => (prop.maxSize !== '1' ? '276px' : 'none')};
    margin: 0px;
    margin-bottom: 36px;
  }
`;

const ReadMoreImage = styled.div`
  width: 100%;
  height: ${(prop) => (prop.maxSize !== '1' ? '187px' : '394px')};
  overflow: hidden;
  margin-bottom: 12px;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    transition: all 0.3s ease;
  }
  img:hover {
    transform: scale(1.1);
    transition: all 0.3s ease;
  }
  ${({ theme }) => theme.breakpoint.md} {
    margin-bottom: 16px;
  }
  ${({ theme }) => theme.breakpoint.xl} {
    max-height: ${(prop) => (prop.maxSize !== '1' ? '184px' : '420px')};
    min-height: 0;
  }
`;

const Title = styled.div`
  height: 55px;
  overflow: hidden;
  font-weight: 400;
  margin-bottom: 5px;
  ${({ theme }) => theme.fontSize['content-sm']}
  word-break: break-word;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;

  ${({ theme }) => theme.breakpoint.md} {
    height: 80px;
    -webkit-line-clamp: 3;
  }
`;

export default function ReadMore({ data = [] }) {
  const readMoreLists = data?.map((item) => {
    const url = item.heroImage?.image?.url;
    return (
      <ReadMoreList key={item._id} maxSize={data.length}>
        <a
          href={`https://www.mirrormedia.mg/story/${item.slug}/`}
          target='_blank'
          rel='noreferrer'
        >
          <ReadMoreImage>
            <img src={url ? url : DefaultImage} alt='' />
          </ReadMoreImage>
          <Title>{item.title}</Title>
        </a>
      </ReadMoreList>
    );
  });

  return (
    <Container>
      <p>延伸閱讀</p>
      <ul>{readMoreLists}</ul>
    </Container>
  );
}
