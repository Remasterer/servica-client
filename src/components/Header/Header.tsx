import * as React from 'react';
import Toolbar from '@mui/material/Toolbar';
import { Container } from '@mui/material';
import { GlobalSearchInput } from '@components';
import { ElevationScroll } from '../../HOC';
import { HeaderBarStyled } from './styles';
import { HeaderBrand } from './HeaderBrand';
import { HeaderAuthBar } from './HeaderAuthBar';

interface HeaderGeneralProps {
  noScrollEffects?: boolean;
}

export const Header: React.FC<HeaderGeneralProps> = ({ noScrollEffects }) => {
  return (
    <ElevationScroll>
      <HeaderBarStyled noScrollEffects={noScrollEffects}>
        <Container>
          <Toolbar>
            <HeaderBrand />
            <GlobalSearchInput isAuthenticated={false} />
            <HeaderAuthBar accent={noScrollEffects} />
          </Toolbar>
        </Container>
      </HeaderBarStyled>
    </ElevationScroll>
  );
};

Header.defaultProps = {
  noScrollEffects: false
};
