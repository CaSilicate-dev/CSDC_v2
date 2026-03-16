import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'

import { ConfigProvider, theme } from 'antd'

import App from './App.jsx'

function Root() {

  const [dark, setDark] = useState(true);

  return (
    <ConfigProvider
      theme={{
        algorithm: dark ? theme.darkAlgorithm : theme.defaultAlgorithm,
        token: {
          borderRadius: 0,
        }
      }}
    >
      <StrictMode>
        <App dark={dark} setDark={setDark}/>
      </StrictMode>
    </ConfigProvider>
  )
}

createRoot(document.getElementById('root')).render(
  <Root></Root>
)
