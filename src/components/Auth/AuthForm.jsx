import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme } from "@mui/material/styles";
import { Link as AuthLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Developed by Zeon
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles(() => ({
  input1: {
    height: "40px",
  },
  input2: {
    height: "20px",
  },
}));

const theme = createTheme();

export default function AuthForm({
  title,
  btnText,
  link,
  linkText,
  handleSave,
}) {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    handleSave(data.get("email"), data.get("password"));
  };

  const classes = useStyles();

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        overflow: "hidden",
        minHeight: btnText === "Логин" ? "600px" : "550px",
      }}
    >
      <div style={{ backgroundColor: "#ffffff" }}>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "black" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography
            component="h1"
            variant="h5"
            style={{ fontFamily: "Montserrat" }}
          >
            {title}
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Эл-почта"
              name="email"
              autoComplete="email"
              InputProps={{ classes: { input: classes.input1 } }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Пароль"
              type="password"
              id="password"
              autoComplete="current-password"
              InputProps={{ classes: { input: classes.input2 } }}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Запомни меня"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                backgroundColor: "#1d1d1d",
                borderRadius: "0",
                zIndex: "0",
              }}
              className="registerbtn"
            >
              {btnText}
            </Button>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
              className="forgotPassword"
            >
              <AuthLink to="/resetpas" style={{ marginBottom: "15px" }}>
                <span variant="body2" style={{ color: "#6338d9" }}>
                  Забыли пароль?
                </span>
              </AuthLink>
              <div>
                <AuthLink
                  to={link}
                  style={{
                    width: "50%",
                    color: "#6338d9",
                  }}
                >
                  {linkText}
                </AuthLink>
              </div>
            </div>
            <Copyright sx={{ mt: 5 }} />
          </Box>
        </Box>
      </div>
    </div>
  );
}
