import React from "react";
import {
  Typography,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  useTheme,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const DangerZone = ({ onDeleteClick }) => {
  const theme = useTheme();
  return (
    <Card>
      <CardHeader
        avatar={<DeleteIcon />}
        title={<Typography>Eliminar mi cuenta</Typography>}
      />
      <Divider />
      <CardContent>
        <Typography>
          Una vez que elimines tu cuenta, no podrás recuperarla. Todos tus datos
          serán eliminados permanentemente.
        </Typography>
        <Button startIcon={<DeleteIcon />} onClick={onDeleteClick}>
          Eliminar mi cuenta
        </Button>
      </CardContent>
    </Card>
  );
};

export default DangerZone;
