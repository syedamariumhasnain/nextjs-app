import MeetupDetail from "../../components/meetups/MeetupDetail";

const MeetupDetails = props => {
  return (
    <MeetupDetail
      image="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg"
      title="First Meetup"
      address="Some Street 5, Some City"
      description="This is a first meetup"
    />
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
  return {
    fallback: false,
    paths: [
      {
        params: {
          meetupId: "m1"
        }
      },
      {
        params: {
          meetupId: "m2"
        }
      }
    ]
  };
}

export async function getStaticProps(context) {
  // fetch data for a single meetup
  const meetupId = context.params.meetupId;

  // This console will only be displayed on the development server 
  // not in the browser.
  console.log("meetupId: ", meetupId);

  return {
    props: {
      meetupData: {
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg",
        id: meetupId,
        title: "First Meetup",
        address: "Some Street 5, Some City",
        description: "This is a first meetup"
      }
    }
  };
}

export default MeetupDetails;
