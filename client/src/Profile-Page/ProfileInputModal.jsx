import React from 'react'

const MODAL_STYLE = {
    position : 'fixed',
    top : '50%',
    left: '50%',
    transform :'translate(-50%, -50%)',
    backgroundColor: '#FFFFFF',
    padding : '50px',
    zIndex: 1000
}

const OVERLAY_STYLE = {
    position : 'fixed',
    top : 0,
    left : 0,
    bottom : 0,
    right : 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    zIndex : 1000
}
export default function ProfileInputModal({open, onClose, children}) {
    if (!open) return null
  return (
    <>
        <div style={OVERLAY_STYLE}/>
        <div style={MODAL_STYLE}>
            <button onClick={onClose}>Close Input</button>
            {children}
        </div>
    </>
  )
}
