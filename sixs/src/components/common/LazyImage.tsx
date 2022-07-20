import { NextPage } from 'next'
import React from 'react'
import styled from 'styled-components'

type Props = {
  src: string;
  alt?: string;
}

const LazyImage: NextPage<Props> = ({ src, alt }) => {
  return (
    <ScLazyImage className='lazy-image'>
      <React.Suspense fallback={<div>hihi</div>}>
        <img src={src} alt={alt || `lazy-img-no-${Math.random()}`} />
      </React.Suspense>
    </ScLazyImage>
  )
}

const ScLazyImage = styled.div`
  
`

export default LazyImage