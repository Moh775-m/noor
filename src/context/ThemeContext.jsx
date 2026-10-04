import { createContext, useState, useEffect } from 'react'

export const ThemeContext = createContext()

export function ThemeProvider({ children }){
  const [dark, setDark] = useState(()=>{
    const saved = localStorage.getItem('noor-theme')
    if(saved) return saved === 'dark'
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  useEffect(()=>{
    const root = document.documentElement
    if(dark){
      root.classList.add('dark')
      localStorage.setItem('noor-theme','dark')
    }else{
      root.classList.remove('dark')
      localStorage.setItem('noor-theme','light')
    }
  },[dark])

  const toggleTheme = ()=> setDark(d=>!d)

  return(
    <ThemeContext.Provider value={{ dark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}