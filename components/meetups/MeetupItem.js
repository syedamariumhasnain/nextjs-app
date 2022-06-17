import { useRouter } from "next/router";

import Card from '../ui/Card';
import classes from './MeetupItem.module.css';

function MeetupItem(props) {
  const router = useRouter();

  const showDetailsHandler = () => {
    // router.push() is equivalent of "Link" component
    // for navigating progtammatically
    router.push("/"+props.id);

  }

  return (
    <li className={classes.item}>
      <Card>
        <div className={classes.image}>
          <img src={props.image} alt={props.title} />
        </div>
        <div className={classes.content}>
          <h3>{props.title}</h3>
          <address>{props.address}</address>
        </div>
        <div className={classes.actions}>
          {/* here, Link would be a better option cuz it render an */}
          {/* anchor tag, using button just to show an alternative */}
          {/* Using Imperative (Programmatic) Navigation */}
          <button onClick={showDetailsHandler}>Show Details</button>
        </div>
      </Card>
    </li>
  );
}

export default MeetupItem;
