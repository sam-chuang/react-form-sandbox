import React from "react"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link as RouterLink
} from "react-router-dom"
import PasswordForm from "./react-hook-form/password"
import { ThemeProvider, CSSReset } from "@chakra-ui/core"
import { Link } from "@chakra-ui/core"
import { Provider as ReakitProvider } from "reakit"
import * as system from "reakit-system-bootstrap"

export default function App() {
  return (
    <ReakitProvider unstable_system={system}>
      <ThemeProvider>
        <CSSReset />
        <Router>
          <nav>
            <Link as={RouterLink} to="/react-hook-form">
              react-hook-form
            </Link>
          </nav>
          <Switch>
            <Route path="/react-hook-form">
              <PasswordForm />
            </Route>
          </Switch>
        </Router>
      </ThemeProvider>
    </ReakitProvider>
  )
}
