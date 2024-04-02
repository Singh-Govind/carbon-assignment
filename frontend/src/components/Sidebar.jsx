import {
  Box,
  Input,
  InputAdornment,
  Typography,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { IoHomeOutline } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import { IoIosNotificationsOutline } from "react-icons/io";
import { CiCircleQuestion } from "react-icons/ci";
import { CiSettings } from "react-icons/ci";
import { PiDotsThreeVertical } from "react-icons/pi";
import { NavLink } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { CiBitcoin } from "react-icons/ci";
import { FaMeta } from "react-icons/fa6";
import { useState } from "react";

const getActiveLinkColor = ({ isActive, isTransitioning }) => {
  return {
    fontWeight: isActive ? "bold" : "",
    color: isActive ? "#2AB52A" : "inherit",
    viewTransitionName: isTransitioning ? "slide" : "",
    textDecoration: "none",
  };
};

function Sidebar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const menuToggler = () => {
    setMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <Box
      sx={{
        width: {
          xs: "100%",
          sm: "25%",
          md: "25%",
          lg: "20%",
          xl: "15%",
        },
        maxWidth: { lg: "25lvw", md: "30lvw" },
        minHeight: { xs: "100%", sm: "98lvh" },
        maxHeight: { xs: "100%", sm: "100lvh" },
        backgroundColor: "#1A1E1C",
        left: 0,
        padding: { xs: "1rem", sm: "1rem 0.5rem" },
        color: "#fff",
        borderBottomRightRadius: { xs: "0", sm: "15px" },
      }}
    >
      {/* logo */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "1rem",
          marginBottom: { xs: "1rem", sm: "2rem" },
        }}
      >
        <NavLink to="/">
          <img src="/logo.png" width="120px" height="40px" alt="" />
        </NavLink>
        <Box onClick={isMobile ? menuToggler : undefined}>
          <MenuIcon />
        </Box>
      </Box>

      {/* whole contain for mobile */}
      <Box
        key={menuOpen}
        sx={{
          display: {
            xs: menuOpen ? "block" : "none",
            sm: "block",
          },
        }}
        onClick={closeMenu}
      >
        {/* search */}
        <Box
          sx={{
            backgroundColor: "#333",
            borderRadius: "5px",
            marginBottom: "2.5rem",
            marginTop: {
              xs: "3rem",
            },
          }}
        >
          <Input
            inputProps={{ style: { color: "#fff" } }}
            sx={{
              height: "2.5rem",
              marginLeft: "0.5rem",
              "& ::placeholder": {
                color: "white",
                opacity: 1,
              },
            }}
            type="text"
            fullWidth={true}
            placeholder="Search"
            startAdornment={
              <InputAdornment position="start">
                <CiSearch color="#fff" opacity="1" />
              </InputAdornment>
            }
            disableUnderline={true}
          />
        </Box>

        {/* menu */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            padding: "0.2rem 0.5rem",
          }}
        >
          <NavLink to="/" style={getActiveLinkColor}>
            <Box
              sx={{
                padding: "0.5rem 0.5rem",
                display: "flex",
                alignItems: "center",
                gap: "0.8rem",
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: "#333",
                  borderRadius: "7px",
                },
              }}
            >
              <IoHomeOutline />
              <Typography>Home</Typography>
            </Box>
          </NavLink>

          <NavLink to="/crypto" style={getActiveLinkColor}>
            <Box
              sx={{
                padding: "0.5rem 0.5rem",
                display: "flex",
                alignItems: "center",
                gap: "0.8rem",
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: "#333",
                  borderRadius: "7px",
                },
              }}
            >
              <CiBitcoin />
              <Typography>Crypto</Typography>
            </Box>
          </NavLink>

          <NavLink to="/meta" style={getActiveLinkColor}>
            <Box
              sx={{
                padding: "0.5rem 0.5rem",
                display: "flex",
                alignItems: "center",
                gap: "0.8rem",
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: "#333",
                  borderRadius: "7px",
                },
              }}
            >
              <FaMeta />
              <Typography>Meta Connect</Typography>
            </Box>
          </NavLink>
        </Box>

        {/* extra menu */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
            padding: "0.5rem 0.8rem",
            marginTop: { xs: "1rem", sm: "5rem" },
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "0.8rem",
              cursor: "pointer",
            }}
          >
            <IoIosNotificationsOutline />
            <Typography>Notifications</Typography>
            <span
              style={{
                backgroundColor: "#2AB52A",
                color: "black",
                fontSize: "0.56rem",
                fontWeight: "bold",
                padding: "2px 6px",
                marginLeft: "auto",
                marginRight: "0.6rem",
                borderRadius: "2px",
              }}
            >
              12
            </span>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "0.8rem",
              cursor: "pointer",
            }}
          >
            <CiCircleQuestion />
            <Typography>Support</Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "0.8rem",
              cursor: "pointer",
            }}
          >
            <CiSettings />
            <Typography>Settings</Typography>
          </Box>
        </Box>

        {/* account */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "3rem",
            backgroundColor: "#333",
            padding: "1.3rem 1rem",
            borderRadius: "8px",
          }}
        >
          <Box
            sx={{
              position: "relative",
            }}
          >
            <img
              src="https://placehold.co/30x30"
              width="35px"
              height="35px"
              alt=""
              style={{
                borderRadius: "50%",
              }}
            />
            <span
              style={{
                position: "absolute",
                left: 26,
                top: 0,
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                backgroundColor: "#2AB52A",
              }}
            ></span>
          </Box>
          <Box>
            <Typography
              sx={{
                fontSize: "0.8rem",
              }}
            >
              Brooklyn Simmons
            </Typography>
            <Typography
              sx={{
                fontSize: "0.6rem",
              }}
            >
              brooklyn@simmons.com
            </Typography>
          </Box>
          <PiDotsThreeVertical />
        </Box>
      </Box>
    </Box>
  );
}

export default Sidebar;
