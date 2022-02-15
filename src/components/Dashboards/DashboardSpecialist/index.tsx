import React, { FC } from 'react';
import Grid from '@mui/material/Grid';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import { useAppDispatch, useAppSelector } from '@hooks';
import { sexExpandedDashboardMenu } from '@store';
import { DashboardHeader } from '@components';
import { DashboardMenu } from '../../DashboardMenu';
import { specialistMenuItems } from './constants';
import { DashboardMapStyled, DashboardMenuContainerStyled, ExpansionButtonStyled } from './styles';

export const DashboardSpecialist: FC = ({ children }) => {
  const dispatch = useAppDispatch();
  const isDashboardMenuExpanded = useAppSelector((state) => state.ui.isDashboardMenuExpanded);

  const handleToggleMenuExpansion = (expanded: boolean) => {
    dispatch(sexExpandedDashboardMenu(expanded));
  };

  return (
    <Grid container spacing={0} minHeight="100vh">
      <Grid item xs={isDashboardMenuExpanded ? 11 : 6}>
        <DashboardMenuContainerStyled elevation={1}>
          <DashboardHeader />
          <Grid container height="100%" mt={3} columnGap={1}>
            <Grid item xs={3} display="flex" flexDirection="column" justifyContent="space-between">
              <DashboardMenu menuItems={specialistMenuItems} />
            </Grid>
            <Grid item xs={8} pt={1}>
              {children}
              <ExpansionButtonStyled
                onClick={() => handleToggleMenuExpansion(!isDashboardMenuExpanded)}>
                {isDashboardMenuExpanded ? (
                  <KeyboardDoubleArrowLeftIcon />
                ) : (
                  <KeyboardDoubleArrowRightIcon />
                )}
              </ExpansionButtonStyled>
            </Grid>
          </Grid>
        </DashboardMenuContainerStyled>
      </Grid>
      <Grid item xs={isDashboardMenuExpanded ? 1 : 6}>
        <DashboardMapStyled elevation={0}>
          <iframe
            title="map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387193.30596698663!2d-74.25986773739224!3d40.697149413874705!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sua!4v1638362999263!5m2!1sen!2sua"
            width="100%"
            height="100%"
            style={{ border: 'none' }}
            loading="lazy"
          />
        </DashboardMapStyled>
      </Grid>
    </Grid>
  );
};
