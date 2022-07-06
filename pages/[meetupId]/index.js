import { ObjectId } from "mongodb";
import { Fragment } from "react";
import Head from "next/head";

import MeetupDetail from "../../components/meetups/MeetupDetail";
import dbConnect from "../../utils/dbConnect";

const MeetupDetails = props => {
  return (
    <Fragment>
      <Head>
        <title>
          {props.meetupData.title}
        </title>
        <meta title="description" content={props.meetupData.description} />
      </Head>
      <MeetupDetail
        image={props.meetupData.image}
        title={props.meetupData.title}
        address={props.meetupData.address}
        description={props.meetupData.description}
      />
    </Fragment>
  );
};

// getStaticPaths only works with getStaticProps,
// NOT with getServerSideProps, OR
// NOT when using neither getStaticProps nor getServerSideProps

// since getStaticProps pre-generate pages during the build process
// so here we need to pre-generate pages for all URLs user might be
// entering at the runtime.

// other than paths defination getStaticPaths also contains a 2nd
// property fallback,
// ==> fallback: false, is like you say that your paths contains
// all supported meetup ID values. If the user enters anything
// that's not supported, User will see a 404 error.
// ==> fallback: true, Next JS would try to generate a page for the
// meetup ID dynamically on the server for that incoming request.

export async function getStaticPaths() {
  const { client, meetupsCollection } = await dbConnect();

  // In mongodb query, find takes 1st arg. an empty object means -- no
  // filters (get all documents) and 2nd arg. takes fields to be fetched

  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();
  client.close();

  return {
    fallback: false,
    paths: meetups.map(meetup => ({
      params: { meetupId: meetup._id.toString() }
    }))
  };
}

export async function getStaticProps(context) {
  // fetch data for a single meetup
  const meetupId = context.params.meetupId;

  // This console will only be displayed on the development server
  // not in the browser.
  console.log("meetupId: ", meetupId);

  const { client, meetupsCollection } = await dbConnect();

  const selectedMeetup = await meetupsCollection.findOne({
    _id: ObjectId(meetupId)
  });
  client.close();

  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        address: selectedMeetup.address,
        image: selectedMeetup.image,
        description: selectedMeetup.description
      }
    }
  };
}

export default MeetupDetails;
