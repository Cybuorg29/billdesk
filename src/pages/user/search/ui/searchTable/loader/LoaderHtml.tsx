import './Loader.css'



import React from 'react'

type Props = {}

const LoaderHtml = (props: Props) => {
  return (
    <svg viewBox="25 25 50 50" className='svg'>
    <circle r="20" cy="50" cx="50"></circle>
  </svg>
  )
}

export default LoaderHtml

