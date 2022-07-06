import { Fragment } from "react";
import Head from "next/head";

import MeetupList from "../components/meetups/MeetupList";
import dbConnect from "../utils/dbConnect";

const HomePage = props => {
  return (
    <Fragment>
      {/* Adding Title and Description in meta is important, cuz it */}
      {/* helps in SEO (Search Engine Optimization) */}
      <Head>
        <title>React Meetups</title>
        <meta
          name="description"
          content="Browse a huge list of highly active react meetups"
        />
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  );
};

// ===>> Static Site Generation (SSG) <<===
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
  // In Next JS, we can also use fetch() on server side code snippets
  // as well. Normally, we can only use it in the browser.

  // fetch("/api/meetups");
  // Doing this makes the redundent code cuz we are calling our own api
  // & defining it somewhere else. Instead we can do it directly, here.
  // It will not be the part of client-side bundle.

  const { client, meetupsCollection } = await dbConnect();

  const meetups = await meetupsCollection.find().toArray();
  client.close();

  return {
    props: {
      meetups: meetups.map(meetup => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        description: meetup.description,
        id: meetup._id.toString()
      }))
    },
    revalidate: 10
  };
}

// ===>> Server-side Rendering (SSR) <<===
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
