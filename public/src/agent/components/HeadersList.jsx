import { useCallback, useEffect, useState } from "react";

import HeaderPaper from './HeaderPaper';
import { Box } from '@mui/material';
import { getData, getDataByCodes } from '../../apis/agent/getApis';
import { useLocation, useParams } from "react-router-dom";


const HeadersList = ({}) => {
  const params = useParams();
  const project_code = params?.project_code;
  const training_type = params?.training_type;
  let [list, setList] = useState([]);

  const loadHeadersData = useCallback(() => {
    console.log("loading headers data");
    getData({ endpoint: `headers/${project_code}/${training_type}` }).then(
      (res) => {
        setList(res.data);
      }
    );
  }, []);


  useEffect(() => {
    console.log(project_code, training_type);
    if (project_code && training_type) {
      loadHeadersData(project_code, training_type);
    }
  }, [project_code, training_type]);

  useEffect(() => {
    console.log("dsf")
  }
  , []);


  return (
    <Box padding={3} display={"flex"} flexDirection={"column"} alignItems={"center"} gap={2} height={"50vh"} overflow={"auto"}>
        {
            list.map(item => <HeaderPaper data = {item} loadHeadersData = {loadHeadersData} />)
        }
    </Box>
  )
}

export default HeadersList
