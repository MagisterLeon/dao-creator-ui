import { TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import React, { ReactElement } from 'react';
import Step from '@mui/material/Step';
import StepContent from '@mui/material/StepContent';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import Typography from '@mui/material/Typography';

import styles from './style.module.scss';


const steps = [
  {
    component: <TextField label="Name (e. g. Super DAO" variant="outlined" />,
    description:
      'Choose a publicly visible name for this investment club',
    label: 'What should we call this investment club?'
  },
  {
    component: <TextField label="USDT" variant="outlined" />,
    description: `Accepting deposits beyond this amount will require an on-chain transaction with gas, so aim high.`,
    label: 'What’s the upper limit of the club’s raise?',
  },
];

const ClubCreate = (): ReactElement => {
  const [activeStep, setActiveStep] = React.useState(0);

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
    <div className={styles.clubCreate}>
      <Typography variant="h2">Create on-chain club</Typography>
      <Typography variant="h4">Define the name & rules around your raise that will enable the on-chain cap table</Typography>
      <Box sx={{ maxWidth: 600 }}>
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((step, index) => (
            <Step key={step.label} >
              <StepLabel>
                <Typography variant="h5">{step.label}</Typography>
              </StepLabel>
              <StepContent>
                <Typography variant="h6">{step.description}</Typography>
                {step.component ? step.component : null}
                <Box sx={{ mb: 2 }}>
                  <div>
                    <Button
                      onClick={handleNext}
                      size="large"
                      sx={{ mr: 1, mt: 1 }}
                      variant="contained"
                    >
                      {index === steps.length - 1 ? 'Finish' : 'Continue'}
                    </Button>
                    <Button
                      disabled={index === 0}
                      onClick={handleBack}
                      size="large"
                      sx={{ mr: 1, mt: 1 }}
                    >
                      Back
                    </Button>
                  </div>
                </Box>
              </StepContent>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length && (
          <Paper elevation={0} square sx={{ p: 3 }}>
            <Typography variant="h4">Collect funds & invest together!</Typography>
            <Button onClick={handleReset}
                    size="large"
                    sx={{ mr: 1, mt: 1 }}
            >
              Reset
            </Button>
          </Paper>
        )}
      </Box>
    </div>
  );
}

export default ClubCreate;
