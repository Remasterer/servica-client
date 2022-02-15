import SearchIcon from '@mui/icons-material/Search';
import { InputBaseStyled, SearchIconWrapperStyled, SearchStyled } from './styles';

export const GlobalSearchInput = ({ isAuthenticated }: { isAuthenticated: boolean }) => (
  <SearchStyled authenticated={isAuthenticated ? 1 : 0}>
    <SearchIconWrapperStyled authenticated={isAuthenticated ? 1 : 0}>
      <SearchIcon />
    </SearchIconWrapperStyled>
    <InputBaseStyled placeholder="Search…" inputProps={{ 'aria-label': 'search' }} />
  </SearchStyled>
);
