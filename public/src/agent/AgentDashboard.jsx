import { Box, Paper } from '@mui/material'
import React from 'react'
import { Outlet } from 'react-router-dom'
import Profile from './components/Profile'

const AgentDashboard = () => {
  return (
    <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
      <Profile/>
      <Outlet/>
    </Box>
  )
}

export default AgentDashboard
