import {
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  IconButton,
} from '@material-ui/core';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';
import ReactCountryFlag from 'react-country-flag';
import cookies from 'js-cookie';

const TranslationPopOver = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [lang, setLang] = React.useState('GB');

  const handleLanguage = (event) => {
    setAnchorEl(event.currentTarget);
  };

  useEffect(() => {
    const currentLanguageCode = cookies.get('i18next') || 'en';
    setLang(currentLanguageCode);
  }, [lang]);

  const selectedLang = (e) => {
    const { myValue } = e.currentTarget.dataset;
    const { code } = e.currentTarget.dataset;
    i18next.changeLanguage(code);
    setLang(myValue);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const languageMenu = (
    <Menu
      id='simple-menu'
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={handleClose}
    >
      <MenuItem data-my-value='GB' data-code='en' onClick={selectedLang}>
        <ListItemIcon>
          <ReactCountryFlag
            className='emojiFlag'
            countryCode={'GB'} // SA and FR
            style={{
              fontSize: '1.5rem',
              lineHeight: '2em',
              cursor: 'pointer',
            }}
            aria-label='English'
            svg
          />
        </ListItemIcon>
        <ListItemText primary='English' />
      </MenuItem>
      <MenuItem data-my-value='FR' data-code='fr' onClick={selectedLang}>
        <ListItemIcon>
          <ReactCountryFlag
            className='emojiFlag'
            countryCode='FR' // SA and FR
            style={{
              fontSize: '1.5rem',
              lineHeight: '2em',
              cursor: 'pointer',
            }}
            aria-label='French'
            svg
          />
        </ListItemIcon>
        <ListItemText primary='French' />
      </MenuItem>
    </Menu>
  );
  return (
    <>
      <IconButton aria-label='language' onClick={handleLanguage}>
        <ReactCountryFlag
          className='emojiFlag'
          countryCode={lang === 'en' ? 'GB' : lang}
          style={{
            fontSize: '1.5rem',
            lineHeight: '2em',
            cursor: 'pointer',
          }}
          aria-label='United States'
          svg
        />
      </IconButton>
      {languageMenu}
    </>
  );
};

export default TranslationPopOver;
