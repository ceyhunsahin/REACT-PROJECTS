import React from 'react';
import { CardActions, Button } from '@mui/material';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import TikTokIcon from '@mui/icons-material/TikTok';

function DetailShareActions() {
  const handleShareTwitter = () => {
    // Twitter paylaşım işlemleri burada gerçekleştirilebilir
    console.log('Sharing on Twitter');
  };

  const handleShareInstagram = () => {
    // Instagram paylaşım işlemleri burada gerçekleştirilebilir
    console.log('Sharing on Instagram');
  };

  const handleShareTikTok = () => {
    // TikTok paylaşım işlemleri burada gerçekleştirilebilir
    console.log('Sharing on TikTok');
  };

  return (
    <CardActions sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}>
      <Button size="small" onClick={handleShareTwitter}>
        <TwitterIcon />
      </Button>
      <Button size="small" onClick={handleShareInstagram}>
        <InstagramIcon />
      </Button>
      <Button size="small" onClick={handleShareTikTok}>
        <TikTokIcon />
      </Button>
    </CardActions>
  );
}

export default DetailShareActions;