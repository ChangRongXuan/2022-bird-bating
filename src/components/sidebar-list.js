import styled from 'styled-components'
import { useState } from 'react'
import classNames from 'classnames'

const ListWarp = styled.a`
  cursor: pointer;
  margin-bottom: 10px;
  display: inline-block;
  transition-duration: 0.3s;
  h3 {
    color: ${({ theme }) => theme.textColor.white};
    ${({ theme }) => theme.fontSize['subtitle-md']}
  }
  .active {
    text-decoration-line: underline;
    color: ${({ theme }) => theme.textColor.brown};
    transition-duration: 0.3s;
  }
`

const mock = [
  { id: 1, title: '突然變殺人凶手 滿腹委屈' },
  { id: 2, title: '沈大俠有話直說 遭人誤解' },
  { id: 3, title: '工作中投射缺憾 渴望父愛' },
  { id: 4, title: '不再蹚司法渾水 專注醫療' },
]

export default function SidebarList() {
  const [activeId, setActiveId] = useState(null)

  return (
    <>
      {mock.map((item) => {
        return (
          <ListWarp
            href={`#${item.id}`}
            key={item.id}
            onClick={() => {
              setActiveId(item.id)
            }}
          >
            <h3 className={classNames({ active: activeId === item.id })}>
              {item.title}
            </h3>
          </ListWarp>
        )
      })}
    </>
  )
}
