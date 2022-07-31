import React from 'react'
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import home from './home.jpg'
import bottom from './bottom.jpg'
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import "./Home.css"

import { useNavigate } from 'react-router-dom';
const Home = () => {
  const navigate = useNavigate()

  const Img = styled('img')({
    margin: 'auto',
    maxWidth: '100%',
    maxHeight: '100%',
  });


  return (
    <React.Fragment >
      <div className="homgpage" style={{ position: 'relative' }}>
        <div className="home-img-container" style={{
          display: 'block',
          padding: '5vh 15vw'
        }}>
          <div className="homeimage" style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundImage: `url(${home})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            width: '70vw',
            height: '50vh',
            backgroundPosition: 'center',
          }}>
            <div className="banner-text" style={{

            }}>



              <h1>Nothing can stop us from Learning</h1>

              <Button variant="contained" href="/Home">
                Apply Now
              </Button>
            </div>
          </div>
        </div>
        <div className="home-buttons" style={{
          padding: '1vh 15vw'
        }}>
          <Grid container >
            <Grid item>
              <ButtonBase sx={{ width: "auto", height: 400 }}>
                <Img src={bottom} />
              </ButtonBase>
            </Grid>

            <Grid item xs>
              <Typography gutterBottom variant="subtitle1" component="div">
                <Button variant="contained" onClick={() => navigate(`/teacher/home`)}>
                  Log in as Teacher
                </Button>
              </Typography>
              <Typography variant="body2" gutterBottom>
                <Button variant="contained" onClick={() => navigate(`/student/home`)}>
                  Log in as Student
                </Button>
              </Typography>

            </Grid>
            <div>
            </div>
          </Grid>
        </div>

      </div>
    </React.Fragment >
  )
}

export default Home