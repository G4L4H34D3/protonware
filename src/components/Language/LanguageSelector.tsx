import React from 'react';
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Icon,
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { FiGlobe } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';

export const LanguageSelector: React.FC = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <Menu>
      <MenuButton
        as={Button}
        rightIcon={<ChevronDownIcon />}
        leftIcon={<Icon as={FiGlobe} />}
        variant="ghost"
        size="sm"
      >
        {t(`languages.${i18n.language}`)}
      </MenuButton>
      <MenuList>
        <MenuItem onClick={() => changeLanguage('pt')}>
          {t('languages.pt')}
        </MenuItem>
        <MenuItem onClick={() => changeLanguage('es')}>
          {t('languages.es')}
        </MenuItem>
        <MenuItem onClick={() => changeLanguage('en')}>
          {t('languages.en')}
        </MenuItem>
      </MenuList>
    </Menu>
  );
};