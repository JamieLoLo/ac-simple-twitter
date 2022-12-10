import React from 'react'

const Button = ({ className, style, title, onClick }) => {
  return (
    <button className={className} style={style} onClick={onClick}>
      {title}
    </button>
  )
}

export default Button
