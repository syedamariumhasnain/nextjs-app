import MeetupList from "../components/meetups/MeetupList";

const DUMMY_MEETUPS = [
  {
    id: "m1",
    title: "A First Meetup",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg",
    address: "Some address 5, 12345 Some City",
    description: "This is a first meetup!"
  },
  {
    id: "m2",
    title: "A Second Meetup",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg",
    address: "Some address 10, 12345 Some City",
    description: "This is a second meetup!"
  }
];

const HomePage = props => {
  return <MeetupList meetups={props.meetups} />;
};


// ===>> getStaticProps <<===

// can execute any code that would normallly only run on server using
// getStaticProps i.e. access file system, securely connect to database
// The code here will never execute on the client side (neither on the  
// server side), cuz it is executed during the build process

// since data is generated during the build process and changes after time. 
// So, we can add a property to the return object of getStaticProps that is
// revalidate property. Adding this property, will unlock "Incremental 
// Static Generation". it takes no. of seconds as value that Next JS will
// wait until it regenerates this page for an incoming request.

// This makes it to be regenerated (at least after that interval pass) on 
// the server if there are requests coming in for this page. i.e. 10 secs

export async function getStaticProps() {
  // fetch data from an API
  return {
    props: {
      meetups: DUMMY_MEETUPS
    },
    revalidate: 10
  }
}


// ===>> Alternative of getStaticProps (getServerSideProps) <<===

// this function will not run during the build process but instead always 
// on the server after deployment. revalidate in return {} not needed here.
// can run any server-side code i.e. working with authentication. 
// In parameter it provides req, res objects, similar to that we get in 
// Node-Express middleware. 

// getServerSideProps generates the page on every incoming request so, if 
// we don't need access to request object and the data doesn't change 
// frequently THEN getStaticProps is better cuz there you pre-generate an
// HTML file and that file then be stored and served by a CDN & that is 
// simply faster then regenerating and fetching that data for every 
// incoming request

// export async function getServerSideProps(context) {
//   const req = context.req;
//   const res = context.res;
  
//   return {
//     props: {
//       meetups: DUMMY_MEETUPS
//     }
//   }
// }

export default HomePage;
