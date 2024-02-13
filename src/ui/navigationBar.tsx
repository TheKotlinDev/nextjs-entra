"use client"

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import Link from 'next/link';
import { useSession } from "next-auth/react";
import { signIn, signOut } from "next-auth/react";

const pages = [
    {'name': 'Page 1', 'pageUri': '/secure/page-1', 'authenticated': true}, 
    {'name': 'Page 2', 'pageUri': '/secure/page-2', 'authenticated': true}, 
    {'name': 'Page 3', 'pageUri': '/secure/page-3', 'authenticated': true}
];
const settings = [
    {'name': 'Account', 'pageUri': '/secure/account', 'authenticated': true},
    {'name': 'Login', 'pageUri': null, 'authenticated': false},
    {'name': 'Logout', 'pageUri': null, 'authenticated': true}
];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = (pageName?: string) => {
    setAnchorElUser(null);

    switch(pageName) {
      case 'Logout': signOut({
        callbackUrl: `http://${window.location.hostname}/`,
        redirect: true
      });
      case 'Login': signIn();
    }
  };

  const { data: session, status } = useSession()

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link key="logo" href="/">
            <Typography
              variant="h6"
              noWrap
              sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
              }}
            >
              Logo
            </Typography>
          </Link>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            {status === 'authenticated' ? (
              <>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: { xs: 'block', md: 'none' },
                  }}
                >
                  {pages.filter((page => {
                    if (status === 'authenticated') {
                      return page.authenticated == true
                    } else {
                      return page.authenticated == false
                    }
                  })).map((page) => (
                    <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                        <Link key={page.name} href={page.pageUri}>
                            <Typography textAlign="center">{page.name}</Typography>
                        </Link>
                    </MenuItem>
                  ))}
                </Menu>
              </>
            ): <span style={{minWidth: '48px'}} />}
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.filter((page => {
                if (status === 'authenticated') {
                  return page.authenticated == true
                } else {
                  return page.authenticated == false
                }
              })).map((page) => (
                <Link key={page.name} href={page.pageUri}>
                    <Button
                        key={page.name}
                        onClick={handleCloseNavMenu}
                        sx={{ my: 2, color: 'white', display: 'block' }}
                    >
                        {page.name}
                    </Button>
                </Link>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Account logo" src={session?.user?.image || undefined} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={() => handleCloseUserMenu()}
            >
              {settings.filter((setting => {
                if (status === 'authenticated') {
                  return setting.authenticated == true
                } else {
                  return setting.authenticated == false
                }
              })).map((setting) => {
                if (setting.pageUri) {
                  return (
                    <Link key={setting.name} href={setting.pageUri}>
                      <MenuItem key={setting.name} onClick={() => handleCloseUserMenu()}>
                        <Typography textAlign="center">{setting.name}</Typography>
                      </MenuItem>
                    </Link>
                  )
                } else {
                  return (
                    <MenuItem key={setting.name} onClick={() => handleCloseUserMenu(setting.name)}>
                      <Typography textAlign="center">{setting.name}</Typography>
                    </MenuItem>
                  )
                }
              })}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;