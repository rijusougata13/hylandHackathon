import * as React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import {
  Button,
  Grid,
  Hidden,
  IconButton,
  Input,
  useTheme,
} from "@mui/material";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ScienceIcon from "@mui/icons-material/Science";
import SendIcon from "@mui/icons-material/Send";

import { logout } from "../redux/authSlice";
import { useDispatch } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import Modal from "./Modal";
import { getPosts } from "../redux/postSlice";
import { addPost } from "../api";
import { LHC, LG, LGsvg } from "../images";


export default function LeftSidebar() {
  const theme = useTheme();

  const dispatch = useDispatch();
  const { _id } = JSON.parse(localStorage.getItem("login"));

  const [openModal, setOpenModal] = React.useState(false);
  const handleModalClose = () => {
    setOpenModal(false);
  };

  const handleModalOpen = () => {
    setOpenModal(true);
  };

  const [postText, setPostText] = React.useState("");
  const handleAddPost = async () => {
    const data = await addPost({ text: postText });
    if (data) {
      dispatch(getPosts());
      setPostText("");
    }
  };

  return (
    <>
      <Box sx={{ height: "100vh", maxWidth: "100%" }}>
        <Box textAlign="center" style={{ marginTop: "3em" }}>
          <Link
            to="/"
            style={{
              textDecoration: "none",
              color: "inherit",
              backgroundColor: "inherit",
            }}
          >
            <img src={LHC} alt="logo" width={120} />
          </Link>
        </Box>
        <List>
          <NavLink
            to="/"
            style={{
              textDecoration: "none",
              color: "inherit",
              backgroundColor: "inherit",
            }}
          >
            <ListItem
              button
              sx={{
                borderRadius: "28px",
                margin: ".5rem 0",
              }}
            >
              <ListItemIcon>
                <HomeIcon fontSize="medium" color="action" />
              </ListItemIcon>
              <Hidden lgDown>
                <ListItemText
                  primaryTypographyProps={{
                    fontSize: "18px",
                    color: theme.palette.action.active,
                  }}
                  primary="Home"
                />
              </Hidden>
            </ListItem>
          </NavLink>
          {/* <ListItem
            button
            sx={{
              borderRadius: "28px",
              margin: ".5rem 0",
            }}
          >
            <ListItemIcon>
              <BookmarkIcon fontSize="medium" color="action" />
            </ListItemIcon>
            <Hidden lgDown>
              <ListItemText
                primaryTypographyProps={{
                  fontSize: "18px",
                  color: theme.palette.action.active,
                }}
                primary="Bookmarks"
              />
            </Hidden>
          </ListItem> */}
          <ListItem
            button
            sx={{
              borderRadius: "28px",
              margin: ".5rem 0",
            }}
          >
            <ListItemIcon>
              <FavoriteIcon fontSize="medium" color="action" />
            </ListItemIcon>
            <Hidden lgDown>
              <ListItemText
                primaryTypographyProps={{
                  fontSize: "18px",
                  color: theme.palette.action.active,
                }}
                primary="Likes"
              />
            </Hidden>
          </ListItem>
          <NavLink
            to={`/profile/${_id}`}
            style={{
              textDecoration: "none",
              color: "inherit",
              backgroundColor: "inherit",
            }}
          >
            <ListItem
              button
              sx={{
                borderRadius: "28px",
                margin: ".5rem 0",
              }}
            >
              <ListItemIcon>
                <PersonIcon fontSize="medium" color="action" />
              </ListItemIcon>
              <Hidden lgDown>
                <ListItemText
                  primaryTypographyProps={{
                    fontSize: "18px",
                    color: theme.palette.action.active,
                  }}
                  primary="Profile"
                />
              </Hidden>
            </ListItem>
          </NavLink>
          <NavLink
            to={`/research/${_id}`}
            style={{
              textDecoration: "none",
              color: "inherit",
              backgroundColor: "inherit",
            }}
          >
            <ListItem
              button
              sx={{
                borderRadius: "28px",
                margin: ".5rem 0",
              }}
            >
              <ListItemIcon>
                <ScienceIcon fontSize="medium" color="action" />
              </ListItemIcon>
              <Hidden lgDown>
                <ListItemText
                  primaryTypographyProps={{
                    fontSize: "18px",
                    color: theme.palette.action.active,
                  }}
                  primary="Research"
                />
              </Hidden>
            </ListItem>
          </NavLink>

          <NavLink
            to={`/bookmarks/${_id}`}
            style={{
              textDecoration: "none",
              color: "inherit",
              backgroundColor: "inherit",
            }}
          >
            <ListItem
              button
              sx={{
                borderRadius: "28px",
                margin: ".5rem 0",
              }}
            >
              <ListItemIcon>
                <BookmarkIcon fontSize="medium" color="action" />
              </ListItemIcon>
              <Hidden lgDown>
                <ListItemText
                  primaryTypographyProps={{
                    fontSize: "18px",
                    color: theme.palette.action.active,
                  }}
                  primary="Bookmarks"
                />
              </Hidden>
            </ListItem>
          </NavLink>

          <ListItem
            id="basic-button"
            button
            sx={{
              borderRadius: "28px",
              margin: ".5rem 0",
            }}
            onClick={() => {
              dispatch(logout());
            }}
          >
            <ListItemIcon>
              <LogoutIcon fontSize="medium" color="action" />
            </ListItemIcon>
            <Hidden lgDown>
              <ListItemText
                primaryTypographyProps={{
                  fontSize: "18px",
                  color: theme.palette.action.active,
                }}
                primary="Logout"
              />
            </Hidden>
          </ListItem>
        </List>
        <Hidden lgDown>
          <Button
            onClick={handleModalOpen}
            variant="contained"
            color="primary"
            fullWidth
            endIcon={<SendIcon />}
            style={{
              borderRadius: "28px",
              padding: "10px",
              textTransform: "capitalize",
              backgroundColor: "rgb(37, 150, 190)",
            }}
          >
            POST
          </Button>
        </Hidden>
        <Hidden lgUp>
          <IconButton
            onClick={handleModalOpen}
            variant="contained"
            color="primary"
            style={{
              borderRadius: "28px",
              padding: "0 15px",
              textTransform: "capitalize",
              textAlign: "center",
            }}
          >
            <AddCircleOutlineIcon />
          </IconButton>
        </Hidden>
      </Box>
      {openModal && (
        <Modal
          open={openModal}
          handleClose={handleModalClose}
          saveText={"Post"}
          len={postText.trimStart().length}
          handleSave={handleAddPost}
        >
          <Box>
            <Grid container>
              <Grid item>
                <img src="/logo.png" alt="logo" width="60px" />
              </Grid>
              <Grid item flexGrow="1">
                <Box padding=".5rem 0">
                  <Input
                    value={postText}
                    onChange={(e) => setPostText(e.target.value)}
                    multiline
                    rows="2"
                    disableUnderline
                    type="text"
                    placeholder="What's happening?"
                    sx={{ width: "100%" }}
                  />
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Modal>
      )}
    </>
  );
}
