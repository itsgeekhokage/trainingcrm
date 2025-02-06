import React, { useEffect, useState } from 'react'
import HeaderPaper from './HeaderPaper';
import { Box } from '@mui/material';
import { getData, getDataByCodes } from '../../apis/agent/getApis';


const HeadersList = ({project_code, training_type}) => {
  let [list, setList] = useState([]);

  const loadHeadersData = (project_code, training_type) => {
    getData({endpoint: `headers/${project_code}/${training_type}` }).then(res => {
      setList(res.data)
    })
  }

  useEffect(() => {
    if(project_code && training_type){
      loadHeadersData(project_code, training_type)
    }
  }, [project_code, training_type])

  return (
    <Box padding={3} display={"flex"} flexDirection={"column"} alignItems={"center"} gap={2}>
        {
            list.map(item => <HeaderPaper data = {item} loadHeadersData = {loadHeadersData} />)
        }
    </Box>
  )
}

export default HeadersList
