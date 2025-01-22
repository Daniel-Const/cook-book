import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './index.css'
import Layout from './layout/Layout.tsx'
import Home from './routes/home.tsx'
import RecipeDashboard from './routes/recipe-dashboard.tsx'
import Recipe from './routes/recipe.tsx'

import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="recipes" element={<RecipeDashboard />} />
          <Route path="recipes/:id" element={<Recipe />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
