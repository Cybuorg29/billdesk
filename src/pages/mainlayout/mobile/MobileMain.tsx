import React from 'react'

type Props = {}

const MobileMain = (props: Props) => {
  return (
    <div style={{ width: '100vw' }}>
    <div style={{ backgroundColor: 'blue', height: '50px' }}>
      {/* Top Bar */}
    </div>
    <div style={{ backgroundColor: 'gray', minHeight: 'calc(100vh - 100px)' }}>
      {/* Content */}
    </div>
    <div style={{ backgroundColor: 'green', height: '50px' }}>
      {/* Bottom Navbar */}
    </div>
  </div>
  )
}

export default MobileMain