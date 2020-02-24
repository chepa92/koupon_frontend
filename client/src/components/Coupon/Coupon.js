import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import VisibilityIcon from '@material-ui/icons/Visibility';
import ShareIcon from '@material-ui/icons/Share';
import RateReviewIcon from '@material-ui/icons/RateReview';

import {
  Card,
  Container,
  CardActionArea,
  CardActions,
  Typography,
  IconButton,
  CardContent,
  CardMedia,
  CardHeader,
  Avatar,
} from '@material-ui/core';
import api from '../../api/api';

const useStyles = makeStyles(theme => ({
  root: {
    margin: '30px 25px 10px 0px',
    minWidth: 289,
    maxWidth: 289,
  },
  img: {
    width: '100%',
    objectFit: 'contain',
    paddingTop: 4,
  },

  lable: {
    color: '#bdbdbd',
  },
}));

export default function CouponCard(props) {
  const classes = useStyles();
  const { onDelete, priceHistory, children, index, coupon } = props;
  const [editing, setEditing] = useState(false);
  const [likesCount, setLikes] = useState(0);
  const [commentCount, setComments] = useState(0);
  const [viewsCount, setViews] = useState(0);
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      setLikes(coupon.like.length);
      setComments(coupon.comments.length);
      setViews(coupon.views.length);
      setEditing(false);
    }
    fetchData();
  }, [editing]);

  const addLike = () => {
    console.log(index);
    let newCount = likesCount + 1;
    api.likeCoupon(index);
    setLikes(newCount);
  };

  return (
    <Card className={classes.root}>
      <NavLink
        to={{
          pathname: '/coupon',
          search: '?id=' + index,
        }}
      >
        <CardHeader
          avatar={
            <Avatar
              aria-label="recipe"
              className={classes.avatar}
              src={coupon.publisherImg}
            >
              R
            </Avatar>
          }
          action={
            <IconButton aria-label="share">
              <ShareIcon />
            </IconButton>
          }
          title={coupon.title}
          subheader={'#' + coupon.brand}
        />
        <CardActionArea>
          <CardMedia
            className={classes.img}
            component="img"
            alt="Coupon"
            height="140"
            image={
              coupon.imgUrl
                ? coupon.imgUrl
                : 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTCWnEg-zPrA6JZIXqfN7vxCdSWgORuP3b3jycKv1_3oZYODAeF'
            }
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="h5">
              Discount: {coupon.discount}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {coupon.couponName}
            </Typography>
          </CardContent>
        </CardActionArea>
      </NavLink>

      <CardActions>
        <Typography variant="body2" color="textSecondary" component="p">
          {likesCount}
        </Typography>
        <IconButton className={classes.lable} size="small" onClick={addLike}>
          <ThumbUpAltIcon />
        </IconButton>

        <Typography variant="body2" color="textSecondary" component="p">
          {viewsCount}
        </Typography>
        <IconButton className={classes.lable} size="small">
          <VisibilityIcon />
        </IconButton>

        <Typography variant="body2" color="textSecondary" component="p">
          {commentCount}
        </Typography>
        <IconButton className={classes.lable} size="small">
          <RateReviewIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}

// const editCoupon = () => setEditing(true);
// const deleteCoupon = () => onDelete(index);
// const savePCoupon = event => {
//   event.preventDefault();
//   console.log(name, index);
//   onChange(name, index);
//   setEditing(false);
// };

// function Form(index) {
//   return (
//     <div>
//       <form>
//         <TextField
//           key={index}
//           className="textField"
//           variant="outlined"
//           size="small"
//           placeholder="Project Name"
//           margin="normal"
//           onChange={event => {
//             console.log(event.target.value);
//             event.preventDefault();
//             setName(event.target.value);
//             console.log(name);
//           }}
//           value={name}
//         />
//         <Button>
//           <CheckCircleIcon className="save" />
//         </Button>
//       </form>
//     </div>
//   );
// }

// function UI() {
//   return (
//     <div className="coupon">
//       <ListItem>
//         <ListItemText>
//           <div>{children}</div>
//         </ListItemText>
//         <ListItemSecondaryAction style={{ right: '-6%' }}>
//           <IconButton>
//             <EditIcon style={{ color: 'white' }} />
//           </IconButton>
//           <IconButton edge="end" aria-label="delete">
//             <DeleteIcon style={{ color: 'rgba(148,187,233,1)' }} />
//           </IconButton>
//         </ListItemSecondaryAction>
//       </ListItem>
//     </div>
//   );
// }

// return editing ? <Form /> : <UI />;
