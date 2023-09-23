import React from 'react'
import './Drop.css'
type Props = {}

const Drop = (props: Props) => {
  return (
    <div className="typing-indicator">
    <div className="typing-circle"></div>
    <div className="typing-circle"></div>
    <div className="typing-circle"></div>
    <div className="typing-shadow"></div>
    <div className="typing-shadow"></div>
    <div className="typing-shadow"></div>
</div>
  )
}

export default Drop