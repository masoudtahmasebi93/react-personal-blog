import { Box, Container } from '@mui/material'
import Header from './Header'
import './MainLayout.css'

export default function MainLayout(props: any) {
  return (
    <>
      <Header></Header>
      <Container className="main">
        <Box>{props.children}</Box>
      </Container>
    </>
  )
}
