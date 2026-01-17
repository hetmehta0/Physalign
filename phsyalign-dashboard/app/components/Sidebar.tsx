'use client'
import { useState } from 'react'
import Hamburger from './Hamburger'

const turnDarkMode = () => {
  const root = document.documentElement
  root.classList.toggle('dark')
  localStorage.setItem('theme', root.classList.contains('dark') ? 'dark' : 'light')
}

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="fixed top-0 left-0 z-[99]">

      {/* 🍔 Button */}
      <button
        className="
          fixed top-5 left-5 z-[100]
          p-2 rounded-lg
          hover:bg-slate-100 dark:hover:bg-slate-800
          transition
        "
        onClick={() => setIsOpen(!isOpen)}
      >
        <Hamburger />
      </button>

      {/*Sidebar */}
      <div
        className={`
          fixed top-0 left-0 z-[101]
          h-screen w-[220px] pt-[70px]
          bg-white dark:bg-slate-900
          shadow-lg
          transform transition-transform duration-300 ease-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <ul className="px-4 mt-6 space-y-1">
          {['Profile', 'Help', 'Sign Out'].map((item) => (
            <li
              key={item}
              className="
                px-4 py-3 rounded-lg text-sm cursor-pointer
                text-slate-700 dark:text-slate-200
                hover:bg-slate-100 dark:hover:bg-slate-800
                transition
              "
              onClick={() => setIsOpen(false)}
            >
              {item}
            </li>
          ))}

          <li>
            <button
              onClick={() => {
                turnDarkMode()
                setIsOpen(false)
              }}
              className="
                w-full text-left
                px-4 py-3 rounded-lg text-sm
                text-slate-700 dark:text-slate-200
                hover:bg-slate-100 dark:hover:bg-slate-800
                transition
              "
            >
              Toggle Dark Mode
            </button>
          </li>
        </ul>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[100] bg-black/30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  )
}
