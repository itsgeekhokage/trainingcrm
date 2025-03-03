/** @format */
import { useEffect, useState } from "react";
import HeaderPaper from "./HeaderPaper";
import { Box, CircularProgress, Typography } from "@mui/material";
import { getData } from "../../apis/agent/getApis";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

const HeadersList = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const fetchHeadersData = async () => {
    if (!params?.project_code || !params?.training_type) return [];
    const response = await getData({
      endpoint: `headers/${params.project_code}/${params.training_type}`,
    });
    return response.data;
  };

  const {
    data: list = [],
    error,
    isLoading,
  } = useQuery({
    queryKey: ["headersData", params?.project_code, params?.training_type],
    queryFn: fetchHeadersData,
    enabled: !!params?.project_code && !!params?.training_type,
  });

  useEffect(() => {
    const storedUser = JSON.parse(sessionStorage.getItem("trainingcrm"));
    if (!storedUser) {
      console.log("No user found");
      navigate("/");
    } else {
      setUser(storedUser);
    }
  }, [navigate]);

  return (
    <Box
      padding={3}
      display="flex"
      flexDirection="column"
      alignItems="center"
      gap={2}
      height="50vh"
      overflow="auto">
      {isLoading && <CircularProgress />}

      {error && (
        <Typography color="error">Error loading headers data</Typography>
      )}

      {list.map((item) => (
        <HeaderPaper
          key={item.id}
          user={user}
          data={item}
        />
      ))}
    </Box>
  );
};

export default HeadersList;
