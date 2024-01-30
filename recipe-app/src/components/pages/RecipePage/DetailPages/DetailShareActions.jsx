import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import FaceBook from "../../../../assets/fb.png"
import Instagram from "../../../../assets/instagram.png"
import Twitter from "../../../../assets/twitter.png"





const DetailShareActions = ({id}) => {

        
        const [anchorEl, setAnchorEl] = useState(null);
      
        const handleClick = (event) => {
          setAnchorEl(event.currentTarget);
        };
      
        const handleClose = () => {
          setAnchorEl(null);
        };
      
        const socialMediaIcons = [
          { name: 'Facebook', icon: FaceBook },
          { name: 'Instagram', icon: Instagram },
          { name: 'Twitter', icon: Twitter },
          // Add more social media icons as needed
        ];
        const handleShare = () => {
            // Open the Facebook Share Dialog
            window.FB.ui({
              method: 'share',
              href: `https://42a0-2a01-e0a-80a-97b0-3534-9503-3844-26e5.ngrok-free.app/recipes/${id}`, // Share the current page URL
            }, function(response){});
          };
        // TODO Instagram and Twitter Link here, FB done
        return (
          <>
            <Button size="small" onClick={handleClick}>
              Share
            </Button>
            <Popover
              open={Boolean(anchorEl)}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
              
            > 
              <List sx={{ display: 'flex', flexDirection: 'row', gap: '1rem', padding: '1rem', cursor:'pointer' }}>
                {socialMediaIcons.map((socialMedia, index) => (
                  <ListItem key={index} onClick={() => handleSocialMediaClick(socialMedia.name)} sx={{ cursor: 'pointer' }} >

                    <Button> 
                        <img src={socialMedia.icon} 
                            onClick={handleShare}
                            style={{
                                width: '2rem',
                                height: '2rem',
                                cursor: 'pointer',
                                transition: 'transform 0.2s', // Add transition effect
                                '&:hover': {
                                    transform: 'scale(1.2)', // Add scale effect on hover
                                },
                                }} />
                    </Button>
                    
                  </ListItem>
                ))}
              </List>
            </Popover>
          </>
        );
      };
      
      const handleSocialMediaClick = (socialMediaName) => {
        // Handle click for the specific social media platform (e.g., Facebook, Instagram, Twitter)
        console.log(`Clicked on ${socialMediaName}`);
      };

export default DetailShareActions;
