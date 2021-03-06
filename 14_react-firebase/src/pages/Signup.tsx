import React, { Fragment, useEffect, useState } from "react";

import {
  Button,
  Container,
  FormControl,
  Grid,
  Link,
  TextField,
  Typography,
} from "@material-ui/core";

import auth from "../util/firebase";

const Signup = (props: any) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      // if logged in, redirect to home
      user && props.history.push("/");
    });
  }, []);

  return (
    <Fragment>
      <Container>
        <Grid container>
          <Grid item md={4}></Grid>
          <Grid item md={4}>
            <FormControl margin="normal" fullWidth>
              <TextField
                style={{ marginTop: "0.5em", marginBottom: "0.5em" }}
                name="email"
                label="E-mail"
                fullWidth
                variant="outlined"
                value={email}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setEmail(event.target.value);
                }}
              />
            </FormControl>
            <FormControl fullWidth>
              <TextField
                style={{ marginTop: "0.5em", marginBottom: "0.5em" }}
                name="password"
                label="Password"
                fullWidth
                variant="outlined"
                type="password"
                value={password}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setPassword(event.target.value);
                }}
              />
            </FormControl>
            <FormControl fullWidth>
              <Button
                fullWidth
                style={{ marginTop: "0.5em", marginBottom: "0.5em" }}
                onClick={async () => {
                  try {
                    await auth.createUserWithEmailAndPassword(email, password);
                    // sendSignInLinkToEmail() を利用すると、メールアドレス認証のためのメールを送信することも可能
                    props.history.push("/login");
                  } catch (error) {
                    // if failed, alert it
                    alert(error.message);
                  }
                }}
              >
                Sign up
              </Button>
              <Typography align="center">
                <Link href="/login">to login</Link>
              </Typography>
            </FormControl>
          </Grid>
          <Grid item md={4}></Grid>
        </Grid>
      </Container>
    </Fragment>
  );
};

export default Signup;
