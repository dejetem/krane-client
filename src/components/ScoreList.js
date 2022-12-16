import React,{ useEffect, useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Typography from '@mui/material/Typography';
import axios from '../axios.js';
import Avatar from 'avataaars';
import { generateRandomAvatarOptions } from '../avatar';

export default function ScoreList() {
  const [userScore, setUserScore] = useState([])

  useEffect(() => {
    async function fetchPosts () {
      const response = await axios.get('/api/users/all')
      setUserScore(response?.data);
      console.log(response.data)
      return response;
    }
    fetchPosts();
  }, [])
  return (
   <div>
   {userScore.map((score) => (
    <List key={score.id} sx={{ width: '100%', maxWidth: '100%', bgcolor: 'background.paper' }}>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar 
            style={{ width: '40px', height: '40px' }}
            avatarStyle='Circle'
            {...generateRandomAvatarOptions()}
           />
        </ListItemAvatar>
        <ListItemText
          primary={score.name}
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                High Score: {score.highscore}
              </Typography>
            </React.Fragment>
          }
        />
      </ListItem>
    <Divider variant="inset" component="li" />
    </List>
    ))}
    </div>
  );
}