import type { NextPage } from 'next';
import Image from 'next/image';
import { useState, SyntheticEvent, ReactNode } from 'react';
import { Button, Stack, Typography, Grid, Container } from '@mui/material';
import BoltIcon from '@mui/icons-material/Bolt';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { styled } from '@mui/material/styles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import SettingsIcon from '@mui/icons-material/Settings';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { Header, ServiceCard } from '@components';
import { withAuthGuard } from 'src/HOC';
import homeScreen from '../assets/home/homePreview2.jpg';

// TODO refactor: divide to components
interface TabPanelProps {
  children?: ReactNode;
  index: number;
  value: number;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}>
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

TabPanel.defaultProps = {
  children: null
};

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}

const HomeHero = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  height: '100%',
  width: '100%',
  zIndex: '-1',
  maxHeight: '600px',
  '&::after': {
    content: '""',
    display: 'block',
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    background: theme.palette.primary.light
  }
}));

const HomeVideoSection = styled(Box)(({ theme }) => ({
  background: theme.palette.secondary.main,
  textAlign: 'center',
  width: '100vw',
  position: 'relative',
  left: 'calc(-50vw + 50%)'
}));

const VideoWrapper = styled(Box)(({ theme }) => ({
  background: theme.palette.primary.main,
  borderRadius: '1em',
  padding: theme.spacing(2)
}));

const steps = [
  {
    label: 'Select campaign settings',
    description: `For each ad campaign that you create, you can control how much
              you're willing to spend on clicks and conversions, which networks
              and geographical locations you want your ads to show on, and more.`
  },
  {
    label: 'Create an ad group',
    description: 'An ad group contains one or more ads which target a shared set of keywords.'
  },
  {
    label: 'Create an ad',
    description: `Try out different ad text to see what brings in the most customers,
              and learn how to enhance your ads using features like ad extensions.
              If you run into any problems with your ads, find out how to tell if
              they're running and how to resolve approval issues.`
  }
];

const Home: NextPage = () => {
  const [value, setValue] = useState(0);
  const [activeStep, setActiveStep] = useState(0);

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <>
      <Header />
      <Container sx={{ color: '#fff', marginTop: '70px' }}>
        <Box component="section" minHeight="550px" paddingTop={15}>
          <HomeHero>
            <Box>
              <Image
                src={homeScreen}
                alt="Picture of the author"
                layout="fill"
                objectFit="cover"
                objectPosition="50% 20%"
                priority
              />
            </Box>
          </HomeHero>
          <Typography
            variant="h3"
            component="div"
            marginBottom={5}
            maxWidth="500px"
            color="inherit">
            The largest platform of searching professionals.
          </Typography>
          <Stack direction="row" spacing={2}>
            <Button variant="contained" size="large" sx={{ width: '220px' }} color="secondary">
              Find specialist
            </Button>
            <Button variant="contained" size="large" sx={{ width: '220px' }}>
              Become specialist
            </Button>
          </Stack>
        </Box>
        <Box component="section" py={8} textAlign="center">
          <Typography variant="h4" component="div" color="primary">
            You can work with people in different areas
          </Typography>
          <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} py={2}>
            <Grid item xs={4}>
              <ServiceCard
                icon={BoltIcon}
                title="Electricians"
                description="Starting from small individuals, ending with large service crew and even service firms."
              />
            </Grid>
            <Grid item xs={4}>
              <ServiceCard
                icon={BoltIcon}
                title="Electricians"
                description="Starting from small individuals, ending with large service crew and even service firms."
              />
            </Grid>
            <Grid item xs={4}>
              <ServiceCard
                icon={BoltIcon}
                title="Electricians"
                description="Starting from small individuals, ending with large service crew and even service firms."
              />
            </Grid>
            <Grid item xs={12} display="flex" justifyContent="flex-end">
              <Button
                size="large"
                color="secondary"
                sx={{
                  '& svg': {
                    fontSize: '30px !important'
                  }
                }}
                endIcon={<ArrowRightAltIcon />}>
                Explore other profesions
              </Button>
            </Grid>
          </Grid>
        </Box>
        <HomeVideoSection component="section" py={8}>
          <Box sx={{ width: 'fit-content', margin: '0 auto' }}>
            <Typography variant="h4" component="div" marginBottom={4}>
              Let`s learn how our app can make a good deal for you
            </Typography>
            <VideoWrapper>
              <iframe
                width="760"
                height="415"
                src="https://www.youtube.com/embed/ST_F0ITVWg4"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              />
            </VideoWrapper>
          </Box>
        </HomeVideoSection>
        <Box component="section" py={8}>
          <Grid container>
            <Grid item xs={6}>
              <Typography
                variant="h4"
                component="div"
                color="primary"
                maxWidth="380px"
                marginBottom={2}>
                Looking for clients? Here you will find suitable project for you
              </Typography>
              <Typography
                variant="subtitle1"
                gutterBottom
                component="div"
                color="text.secondary"
                maxWidth="440px"
                marginBottom={4}>
                Servica will provide you with detailed searching system and filters depend on your
                needs , each employer have rayting and you have possibility to give feedback after
                work.
              </Typography>
              <Button variant="contained" size="large">
                Become specialist
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Image src="/assets/builders.svg" width="500" height="300" />
            </Grid>
          </Grid>
        </Box>
        <Box component="section" py={8} textAlign="center">
          <SettingsIcon fontSize="large" color="primary" />
          <Typography variant="h4" component="div" marginBottom={4} color="secondary">
            How things work here?
          </Typography>
          <Box sx={{ width: '100%' }} color="text.primary">
            <Box>
              <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" centered>
                <Tab label="Employer  flow" {...a11yProps(0)} />
                <Tab label="Specialist flow" {...a11yProps(1)} />
              </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
              <Box
                sx={{
                  maxWidth: 400,
                  display: 'flex',
                  justifyContent: 'center',
                  width: '100%',
                  margin: '0 auto'
                }}>
                <Stepper activeStep={activeStep} orientation="vertical">
                  {steps.map((step, index) => (
                    <Step key={step.label}>
                      <StepLabel
                        optional={
                          index === 2 ? <Typography variant="caption">Last step</Typography> : null
                        }>
                        {step.label}
                      </StepLabel>
                      <StepContent>
                        <Typography>{step.description}</Typography>
                        <Box sx={{ mb: 2 }}>
                          <div>
                            <Button variant="contained" onClick={handleNext} sx={{ mt: 1, mr: 1 }}>
                              {index === steps.length - 1 ? 'Finish' : 'Continue'}
                            </Button>
                            <Button
                              disabled={index === 0}
                              onClick={handleBack}
                              sx={{ mt: 1, mr: 1 }}>
                              Back
                            </Button>
                          </div>
                        </Box>
                      </StepContent>
                    </Step>
                  ))}
                </Stepper>
                {activeStep === steps.length && (
                  <Paper square elevation={0} sx={{ p: 3 }}>
                    <Typography>All steps completed - you&apos;re finished</Typography>
                    <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                      Reset
                    </Button>
                  </Paper>
                )}
              </Box>
            </TabPanel>
            <TabPanel value={value} index={1}>
              <Box
                sx={{
                  maxWidth: 400,
                  display: 'flex',
                  justifyContent: 'center',
                  width: '100%',
                  margin: '0 auto'
                }}>
                <Stepper activeStep={activeStep} orientation="vertical">
                  {steps.map((step, index) => (
                    <Step key={step.label}>
                      <StepLabel
                        optional={
                          index === 2 ? <Typography variant="caption">Last step</Typography> : null
                        }>
                        {step.label}
                      </StepLabel>
                      <StepContent>
                        <Typography>{step.description}</Typography>
                        <Box sx={{ mb: 2 }}>
                          <div>
                            <Button variant="contained" onClick={handleNext} sx={{ mt: 1, mr: 1 }}>
                              {index === steps.length - 1 ? 'Finish' : 'Continue'}
                            </Button>
                            <Button
                              disabled={index === 0}
                              onClick={handleBack}
                              sx={{ mt: 1, mr: 1 }}>
                              Back
                            </Button>
                          </div>
                        </Box>
                      </StepContent>
                    </Step>
                  ))}
                </Stepper>
                {activeStep === steps.length && (
                  <Paper square elevation={0} sx={{ p: 3 }}>
                    <Typography>All steps completed - you&apos;re finished</Typography>
                    <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                      Reset
                    </Button>
                  </Paper>
                )}
              </Box>
            </TabPanel>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default withAuthGuard(Home, false, true);
