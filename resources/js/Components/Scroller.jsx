import React from 'react'

const Scroller = ({ children }) => {
  return (
    <div className=''>
        <div className="w-full overflow-x-scroll scrollbar-none">
          <div className="flex items-center gap-3 w-max py-1.5">
            {children}
          </div>
        </div>
    </div>
  )
}

export default Scroller