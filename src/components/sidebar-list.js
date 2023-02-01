import styled from 'styled-components'
import { useState, useMemo } from 'react'
import classNames from 'classnames'
import { logGAEvent } from '../utils/analytics'

import { Editor, EditorState, convertFromRaw } from 'draft-js'
import decorators from './draft/entity-decorator'
import { atomicBlockRenderer } from './draft/block-redender-fn'

const blockRendererFn = (block) => {
  const atomicBlockObj = atomicBlockRenderer(block)
  return atomicBlockObj
}

const Container = styled.div`
  .header-one {
    ${({ theme }) => theme.fontSize['subtitle-md']};
    cursor: pointer;
    font-family: 'PingFang TC';
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 1.5;
    color: rgba(255, 255, 255, 0.87);
    margin-bottom: 14px;
    text-align: left;
    display: block;
  }

  .header-two {
    cursor: pointer;
    font-family: 'PingFang TC';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 1.5;
    color: rgba(255, 255, 255, 0.87);
    margin-bottom: 14px;
    text-align: left;
    display: block;
  }
`

const ListWarp = styled.a`
  cursor: pointer;
  margin-bottom: 10px;
  display: inline-block;
  transition-duration: 0.3s;

  .active {
    text-decoration-line: underline;
    color: ${({ theme }) => theme.textColor.brown};
    transition-duration: 0.3s;
  }
`

export default function SidebarList({
  data = { blocks: [], entityMap: {} },
  setShow,
}) {
  const [activeId, setActiveId] = useState(null)

  const blocksOfHeader = useMemo(() => {
    return data?.blocks?.filter(
      (block) => block?.type === 'header-one' || block?.type === 'header-two'
    )
  }, [data])

  return (
    <Container>
      {blocksOfHeader.map((item) => {
        return (
          <ListWarp
            href={`#${item.key}`}
            key={item.text}
            onClick={() => {
              setActiveId(item.key)
              logGAEvent('Click', `索引-${item.text}`)
              setShow(false)
            }}
            className={item.type}
          >
            <p className={classNames({ active: activeId === item.key })}>
              {item.text}
            </p>
          </ListWarp>
        )
      })}
    </Container>
  )
}
